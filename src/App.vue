<template>
<!-- 
	!IMPORTANT
	In this test App, i use indexedDB to save file from firebase not because it is 
	right way, it is rather opportunity to improve my skills in work with data (firebase).
	Of course i understand that right way is rather to use Servise Worker to precache file from local hosting... 
-->
  <v-app>
        <component 
			v-if="currentComponent" 
			:is="currentComponent"
			:propsData="switchProps"
			>
		</component>
  </v-app>
</template>
<script>
import Progress from './components/Progress.vue'
import Application from './components/Application.vue'
import Authorization from './components/Authorization.vue'
import AccessDenied from './components/AccessDenied.vue'
import firebase from 'firebase'
import { progressUtils } from './utils'

export default {
	data: () => ({
		user: null,
		currentComponent: null,
		progress: progressUtils,
	}),
	name: 'App',
	methods: {
		setComponent(component) {
			this.currentComponent = Object.assign({}, component)
		}
	},
	computed: {
		switchProps() {
			return this.currentComponent.__file === Progress.__file 
				? this.progress.getProgress()
				: false
		}
	},
	created() {
		firebase.auth().onAuthStateChanged(async user => {
			if(user) {
				try {
					this.progress.startProgress(true, false)
					this.setComponent(Progress)
					let token = await firebase.auth().currentUser.getIdToken(true)
					let postToken = await fetch('https://now-node-admin.user332145.now.sh/set-start-user-claims', {
						method: 'POST',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({token}),
					})
					await postToken.json()
					await firebase.auth().currentUser.reload()
					await firebase.auth().currentUser.getIdToken(true)
					let userData = firebase.auth().currentUser
					userData.getIdTokenResult().then(userResult => {
						if(userResult.claims.access) {
							this.user = userData
							this.$store.dispatch('navigationModule/set_user', userData)
							this.progress.setProgress(100)
							setTimeout(() => {
								this.setComponent(Application)
							}, 200)
                            
						} else if(!userResult.claims.access) {
							this.progress.setProgress(100)
							setTimeout(() => {
								this.setComponent(AccessDenied)
							}, 200);
							this.setComponent(AccessDenied)
						}
					})
				}
				catch(err) {
					console.log(err)
					// Add Error Component 
					// Add common component for denied and error with defferent Props
				}
			} else {
				this.setComponent(Authorization)
			}
		})
	},
	components: {
		Application,
		Progress,
		Authorization,
		AccessDenied,
	}
}
</script>
