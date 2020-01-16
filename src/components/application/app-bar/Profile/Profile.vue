<template>
    <v-dialog 
		eager
		:value="showForm"
		v-model="showForm"
		max-width="300px" 
		persistent
		>
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" text small color="warning">
                User Profile
            </v-btn>
        </template>
        <v-card color="grey lighten-3 pb-1">
            <v-card-title class="headline font-weight-regular blue-grey white--text">
                Profile
                <v-list-item-subtitle class="caption">
					Sign in type:
					<span class="pl-1 white--text">{{user.providerData[0].providerId}}</span>
				</v-list-item-subtitle>
            </v-card-title>
			<v-fade-transition mode="out-in">
				<component 
					@listenComponent="setComponent($event)"
					:is="currentComponent" 
					:user="user"
				></component>
			</v-fade-transition>
            <v-card-actions class="justify-end">
                <v-btn @click="closeForm()" x-small color="error">
                    close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { animate } from '../../../../utils.js'

import UserInfo from './profile-state/UserInfo.vue'

export default {
	props: ['user'],
	data: () => ({
		currentComponent: null,
		showForm: false,
		err: null,
		test: true,
	}),
	methods: {
		animate,
		setComponent(component) {
			this.currentComponent = Object.assign({}, component)
		},
		async closeForm() {
			this.showForm = false
		},

	},
	components: {
		UserInfo,
	},
	mounted() {
		this.currentComponent = UserInfo
	}
}
</script>

<style scoped>
    .update-success {
        animation-duration: 1s;
    }
    .password-animate {
        animation-duration: 2s;
    }
    .image {
        user-drag: none; 
        user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
    
</style>