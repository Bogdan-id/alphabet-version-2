<template>
<div>
	<v-card class="ma-2 user-info">
		<v-card-title>
			User info
		</v-card-title>
		<v-card-text v-show="user.displayName">
			<v-text-field
				class="pb-0"
				hint="name"
				readonly
				single-line
				:label="user.displayName"
				>
				<template v-slot:prepend>
					<v-icon 
						class="pt-0" 
						v-show="!user.photoURL" 
						v-text="'fas fa-user-circle'"
						>
					</v-icon>
					<v-avatar 
						class="pt-0" 
						size="40px" 
						v-show="user.photoURL"
						>
						<img :src="user.photoURL">
					</v-avatar>
				</template>
			</v-text-field>
		</v-card-text>
		<v-card-actions class="justify-end">
			<v-btn 
				@click="setAvatar()" 
				color="primary" 
				x-small>
				<v-icon class="pr-1" small v-text="'mdi-account-circle'">
				</v-icon>
				change user info
			</v-btn>
		</v-card-actions>
	</v-card>
	<v-card 
		class="ma-2 user-security"
		:disabled="user['providerData'][0]['providerId'] === 'password' 
			? false 
			: true"
		>
		<v-card-title class="subtitle-2 font-weight-light">
			change password
		</v-card-title>
		<v-card-text class="pt-0 pb-0">
			<v-text-field
				class="pa-0 body-2"
				v-if="user['providerData'][0]['providerId']"
				:disabled="user.email ? false : true"
				v-model="user.email"
				readonly
				>
				<template v-slot:prepend>
					<v-icon v-text="'mdi-email'" class="pt-2">
					</v-icon>
				</template>
			</v-text-field>
			<v-text-field
				class="pa-0 body-2"
				placeholder="password.."
				readonly
				:disabled="user['providerData'][0]['providerId'] === 'password' 
					? false 
					: true"
				single-line
				>
				<template v-slot:prepend>
					<v-icon v-text="'mdi-lock'" class="pt-2">
					</v-icon>
				</template>
			</v-text-field>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn @click="setUserSecure()" color="primary" x-small>
				<v-icon class="pr-1" x-small v-text="'mdi-lock-alert'">
				</v-icon>
				change
			</v-btn>
		</v-card-actions>
	</v-card>
</div>
</template>

<script>
import UserSecure from './UserSecure.vue'
import Avatar from './avatar/Avatar.vue'

export default {
	props: ['user'],
	data: () => ({
	}),
	methods: {
		setUserSecure() {
			this.$emit('listenComponent', UserSecure)
		},
		setAvatar() {
			this.$emit('listenComponent', Avatar)
		}
	},
	components: {
		/*eslint-disable */
		UserSecure,
		Avatar,
	}
}
</script>