<template>
    <v-app-bar 
		absolute 
		dark 
		app 
		dense 
		short 
		tile>
        <v-app-bar-nav-icon @click.stop="drawerState = !drawerState"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
		<Messages
			v-if="messages.state"
			:items="messages"
			:user="computedUser"
			>
		</Messages>
        <v-menu  offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on }">
                <v-btn small dense outlined v-on="on">Profile</v-btn>
            </template>
            <v-card class="mt-1">
                <v-list>
                    <v-list-item>
                        <v-list-item-avatar v-show="computedUser.photoURL">
                            <img :src="computedUser.photoURL">
                        </v-list-item-avatar>
                        <v-list-item-icon v-show="!computedUser.photoURL">
                            <v-icon>fas fa-user-check</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{computedUser.displayName}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-btn @click="toSignOut()" text color="warning" small>Log Out</v-btn>
                        <v-spacer></v-spacer>
                        <Profile eager :user="computedUser"></Profile>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>      
    </v-app-bar>
</template>

<script>
import firebase from 'firebase'
import Profile from './Profile/Profile.vue'
import Messages from './Messages.vue'

export default {
	props: ['drawer'],
	data: () => ({
		drawerState: null,
		messages: {
			state: false,
			object: null,
			notReaded: null,
		},
	}),
	methods: {
		toSignOut() {
			firebase.auth().signOut()
				.catch(err => console.log(err))     
		},
		getMessages() {
			firebase.database().ref('notifications')
				.on('value', (snap) => {
					this.messages['object'] = snap.val()[this.computedUser['uid']]
					this.messages['state'] = true
					const temp = snap.val()[this.computedUser['uid']]
					if(temp === undefined) return
					const length = Object.keys(temp)
						.filter(f => temp[f]['wasRead'] === false)
					this.messages['notReaded'] = Object.keys(length).length
				})
		}
	},
	computed: {
		computedUser() {
			return this.$store.state.navigationModule.user
		},
	},
	watch: {
		drawer() {
			this.drawerState = this.drawer
		},
		drawerState(val) {
			this.$emit('listenDrawer', val)
		}
	},
	mounted() {
		this.getMessages()
		this.drawerState = this.drawer
	},
	components: {
		Profile,
		Messages,
	}
}
</script>