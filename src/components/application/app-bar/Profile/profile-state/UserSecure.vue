<template>
<v-card class="ma-2 user-security-edit">
	<v-card-title class="justify-center">
		{{ 'Change password' }}
	</v-card-title>
	<v-subheader class="justify-center">
		<v-avatar 
			v-if="computedUser.photoURL" 
			size="75px" 
			class="pt-3">
			<img :src="computedUser.photoURL">
		</v-avatar>
		<v-icon 
			v-if="!computedUser.photoURL" 
			size="75px" 
			v-text="'fas fa-user-circle'" 
			class="pt-3">
		</v-icon>
	</v-subheader>
	<v-card-text>
		<v-alert 
			class="pt-2 pb-2 ma-2 security-anim" 
			type="warning" 
			color="blue lighten-1" 
			v-show="err" 
			elevation="8"
			>
			{{err}}
		</v-alert>
		<v-text-field
			v-model="email"
			single-line
			readonly
			value
			:label="computedUser.email"
			>
			<template v-slot:prepend>
				<v-icon v-text="'mdi-email'" class="pt-2">
				</v-icon>
			</template>
		</v-text-field>
		<v-text-field
			class="password-animate"
			v-model="password"
			:placeholder="!passwordState 
				? 'Your old password' 
				: 'Your new password'"
			:type="showPassword 
				? 'text' 
				: 'password'"
			:disabled="user['providerData'][0]['providerId'] === 'password' 
				? false 
				: true"
			>
			<template v-slot:prepend>
				<v-icon v-text="'mdi-lock'" class="pt-2">
				</v-icon>
			</template>
			<template v-slot:append>
				<v-icon @click="showPassword = !showPassword">
					{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
				</v-icon>
			</template>
			<template v-slot:append-outer>
				<v-slide-x-reverse-transition
					mode="out-in"
					>
					<v-btn
						v-show="passwordLength > 5"
						small 
						icon 
						class="primary white--text"
						@click="passwordState 
							? updateSecurity() 
							: getSecurity()" 
						x-small 
						:loading="secureBtn"
						>
						<v-icon v-text="'mdi-check'">
						</v-icon>
					</v-btn>
				</v-slide-x-reverse-transition>
			</template>
		</v-text-field>
		<v-fade-transition mode="out-in">
			<v-alert
				v-show="successAlert"
				color="green"
				class="white--text"
				type="warning"
				>
				Password successfully changed
			</v-alert>
		</v-fade-transition>
		<v-card-actions>
			<v-btn 
				@click="setUserInfo()" 
				class="white--text" 
				color="grey darken-3" 
				x-small
				>
				<v-icon class="pr-1" small v-text="'mdi-arrow-left-bold'"></v-icon>
				back
			</v-btn>
		</v-card-actions>
	</v-card-text>
</v-card>
</template>

<script>
import firebase from 'firebase'
import UserInfo from './UserInfo.vue'

export default {
	props: ['user'],
	data: () => ({
		test: 'some string',
		email: null,
		password: null,
		passwordState: false,
		secureBtn: false,
		err: null,
		showPassword: false,
		successAlert: false,
	}),
	methods: {
		setUserInfo() {
			this.$emit('listenComponent', UserInfo)
		},
		getSecurity() {
			const user = firebase.auth().currentUser
			if(user.email)
				firebase.auth().fetchSignInMethodsForEmail(user.email).then(
					result => {
						Object.values(result).forEach(provider => {
							switch(provider){
							/* eslint-disable */
								case 'password': this.reAuthenticate(user); break
								case 'google.com': console.log(provider); break
								case 'facebook.com': console.log(provider); break
								default: console.log('Add new Provider!')
							/* eslint-disable */
							}
						})
					})
					.catch(err => {
						this.err = err
						this.secureBtn = false
					})
			else console.log('Not email')
		},
		updateSecurity(){
			this.secureBtn = true
			const user = firebase.auth().currentUser
			if(this.password){
				user.updatePassword(this.password)
					.then(() => {
						this.secureBtn = false
						this.password = null
						this.successAlert = true
					})
					.catch(err => {
						this.secureBtn = false
						this.err = err.code
					})
			}
			return
		},
		reAuthenticate(user) {
			this.email = user.email
			let credential = firebase.auth.EmailAuthProvider.credential(this.email, this.password)
			this.secureBtn = true
			user.reauthenticateWithCredential(credential).then(result => {
				this.secureBtn = false
				this.passwordState = true
				this.password = null
			})
				.catch(err => {
					this.err = err
					this.secureBtn = false
				})
		},
	},
	computed: {
		computedUser() {
			return this.$store.getters['navigationModule/computedUser']
		},
		passwordLength() {
			return this.password !== null 
					? this.password.length
					: 0
		},
	},
	watch: {
		err(val) {
			setTimeout(() => {
				this.err = null
			}, 7000)
		},
		successAlert(val, oldValue) {
			setTimeout(() => {
				this.successAlert = false
			}, 3000)
		}
	},
	components: {
		// eslint-disable-next-line
		UserInfo,
	},
}
</script>