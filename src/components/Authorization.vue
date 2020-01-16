<template>
    <v-app id="inspire">
        <v-container fluid>
            <v-row justify="center" align="center"  style="height: 400px">
                <v-card :width="400">
                    <v-card-title class="justify-center title">
                        Please Sign in
                    </v-card-title>
                    <v-card-text class="justify-center">
                        <div id="auth">
                        </div>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import {firebaseApp} from '../firebaseApp'

export default {
	data: () => ({
	}),
	methods: {
		authState() {
			firebaseApp.auth().onAuthStateChanged(user =>{
				if(user) return
				this.signIn()
			})
		},
		signIn() {
			// Enable chooser if you want https://www.accountchooser.com/learnmore.html
			new Promise(resolve => {
				let uiConfig = {
					signInFlow: 'popup',
					// credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
					credentialHelper: firebaseui.auth.CredentialHelper.NONE,
					signInSuccessUrl: 'https://distracted-bohr-49d2d7.netlify.com/',
					signInOptions: [
						{
							provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
							signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
						}
						,
						firebase.auth.PhoneAuthProvider.PROVIDER_ID,
						firebase.auth.GoogleAuthProvider.PROVIDER_ID,
						{
							provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
							scopes: [
								'public_profile',
								'email',
								'user_likes',
								'user_friends'
							],
							customParameters: {
								// Forces password re-entry.
								auth_type: 'reauthenticate'
							}
						},
						// firebase.auth.TwitterAuthProvider.PROVIDER_ID,
						// firebase.auth.GithubAuthProvider.PROVIDER_ID,
						// firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
					],
					tosUrl: '<your-tos-url>',
					privacyPolicyUrl: function() {
						window.location.assign('<your-privacy-policy-url>')
					}
				}
				/* 
				// use code below to sign in with email link
				{
					provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
					signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
				}
				*/
				resolve(uiConfig)
			})
				.then(uiConfData => {
					let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseApp.auth())
					if(ui.isPendingRedirect()){
						ui.start('#auth', uiConfData)
					} else {
						ui.start('#auth', uiConfData)
					}
				})
		},
	},
	mounted() {
		this.authState()
		let docEl = document.getElementById('inspire')
		docEl.classList.add('animated', 'fadeIn')
	},
}
</script>

<style scoped>
    #inspire {
        background-color: rgb(107, 40, 40);
    }
</style>