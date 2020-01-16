<template>
<v-card class="user-info-edit ma-2">
    <v-card-title>
        User Info
    </v-card-title>
    <v-subheader class="justify-center">
        <v-avatar v-if="computedUser.photoURL" size="75px" class="pt-3">
            <img :src="computedUser.photoURL">
        </v-avatar>
        <v-icon 
			v-if="!computedUser.photoURL" 
			size="75px" 
			class="pt-3" 
			v-text="'mdi-account-circle'">
        </v-icon>
    </v-subheader>
    <v-card-text>
        <v-text-field
			class="pb-0"
            v-model="firstName"
            hint="first name"
            :placeholder="splitFullName[0]"
            prepend-icon="mdi-alpha-f-box"
            >
        </v-text-field>
		<v-text-field
			class="pt-0"
			v-model="lastName"
			hint="last name"
			:placeholder="splitFullName[1]"
			prepend-icon="mdi-alpha-l-box"
			>
		</v-text-field>

		<v-card-actions>
            <v-dialog 
				:width="350" 
				v-model="canvasDialog"
				>
                <template v-slot:activator="{ on }">
                    <v-btn 
						v-on="on"
						@click="setAvatar()"
						x-small 
						outlined
						color="primary"
						>
						Change avatar
					</v-btn>
                </template>
				<component 
					:is="currentComponent"
					:imgProp="imgProp !== null ? imgProp : false"
					:user="user"
					@listenAvatarUpdates="saveAvatar($event)"
					@listenAvatar="setConfirmChanges($event)"
					@setAvatar="setAvatar()"
					>
				</component>
            </v-dialog>
        </v-card-actions>

        <v-card-actions>
            <v-btn 
				@click="setUserInfo()" 
				x-small 
				color="grey darken-3" 
				class="white--text"
				>
                <v-icon 
					class="pr-1" 
					small 
					v-text="'mdi-arrow-left-bold'">
				</v-icon>
				back
            </v-btn>
			<v-spacer>
			</v-spacer>
				<v-slide-x-reverse-transition>
                    <v-btn 
						v-if="checkLength"
						class="white--text"
						color="success"
						@click="updateUserProfile()"
						x-small
						>
						save
                    </v-btn>
                </v-slide-x-reverse-transition>
        </v-card-actions>
    </v-card-text>
</v-card>
</template>

<script>
import firebase from 'firebase'
import { animate } from '../../../../../../utils.js'
import ChangeAvatar from './ChangeAvatar.vue'
import ConfirmChanges from './ConfirmChanges.vue'

import UserInfo from '../UserInfo.vue'

export default {
	props: ['user'],
	data: () => ({
		currentComponent: null,
		firstName: null,
		lastName: '',
		canvasDialog: false,
		title: null,
		err: null,
		imgProp: null,
	}),
	methods: {
		animate,
		checkFullName() {
			if(this.firstName.trim().length > 1) {
				return true
			} else {
				return false
			}
		},
		saveAvatar(imgFile) {
			this.canvasDialog = false
			this.storeUInfo(imgFile)

		},
		setUserInfo() {
			this.$emit('listenComponent', UserInfo)
		},
		setConfirmChanges(imgURL) {
			this.imgProp = imgURL
			this.currentComponent = Object.assign({}, ConfirmChanges)
		},
		setAvatar() {
			this.currentComponent = Object.assign({}, ChangeAvatar)
			this.canvasDialog = false
		},
		storeUInfo(imgFile) {
			console.log('storeUInfo')
			console.log(this.imgProp)
			let uid = this.imgProp['user']['providerData'][0].uid
			firebase.storage().ref(`userData/${uid}/${imgFile.name}`).put(imgFile)
				.then(response => {
					response.ref.getDownloadURL().then((downloadURL) => {
						this.canvasDialog = false
						this.updateUserProfile(downloadURL)
						this.setAvatar()
					})
				})
				.catch(err => {
					this.err =  err
				})
		},
		updateUserProfile(downloadURL) {
			console.log('updateUserProfile')
			const user = this.$store.state.navigationModule.user
			user.updateProfile({
				displayName: this.firstName !== null && this.checkFullName ? this.fullName : this.user['providerData'][0]['displayName'],
				photoURL: downloadURL ? downloadURL : this.user.photoURL
			})	
				.then(() => {
					let user = firebase.auth().currentUser
					this.$delete(this.user)
					this.$store.dispatch('navigationModule/set_user', user)
				})
				.catch(err => {
					this.err = err
				})
		},
	},
	computed: {
		checkLength() {
			return this.firstName !== '' 
				&& this.firstName !== null 
				&& this.firstName.length > 3 
				&& this.firstName !== this.user.displayName 
				? true 
				: false
		},
		splitFullName() {
			return this.$store.getters['navigationModule/computedUser']['displayName'].split(' ')
		},
		fullName() {
			console.log(this.firstName)
			return this.firstName + ' ' + this.lastName
		},
		computedUser() {
			// if you wish use this.$store.state.navigationModule.user. 
			// Below just example how to use getters
			return this.$store.getters['navigationModule/computedUser']
		},
	},
	components: {
		// eslint-disable-next-line
		UserInfo,
		ChangeAvatar,
		ConfirmChanges,
	}
}

</script>