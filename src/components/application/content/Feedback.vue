<template>
    <v-row class="justify-center">
        <v-col :md="msgCard? 5 : 4">
            <v-card class="mb-1" color="green">
                <v-card-title class="white--text title">
                    {{ msgCard? 'Your message' : 'Thank you'}}
                </v-card-title>
            </v-card>
            <v-card v-show="msgCard">
                <v-card-text>
                    <v-list class="pb-0">
                        <v-list-item>
                            {{user.displayName}}
                        </v-list-item>
                    </v-list>
                    <v-select
                        :items="themeItems"
                        label="Choose theme"
                        v-model="inputTheme"
                        dense
                        prepend-icon="mdi-comment-processing"
                        >
                    </v-select>
                    <v-textarea
                        v-model="inputComment"
                        class="pb-0"
                        color="green"
                        auto-grow
                        outlined
                        name="input-7-1"
                        :label="userName"
                        >
                    </v-textarea>
                    <v-card-actions class="pa-0 justify-end">
                        <v-btn @click="sendMsg()" small color="primary">Send &nbsp;
                            <v-icon medium color="white" v-text="'mdi-send-circle'">
                            </v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
            <v-card v-show="!msgCard">
                <v-card-title class="justify-center">
                    <svg width="130" height="130" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path style="fill:rgb(131, 145, 135)" d="M896 816q-104-196-160-278-139-202-347-318-34-19-70-36-89-40-94-32t34 38l39 31q62 43 112.5 93.5t94.5 116.5 70.5 113 70.5 131q9 17 13 25 44 84 84 153t98 154 115.5 150 131 123.5 148.5 90.5q153 66 154 60 1-3-49-37-53-36-81-57-77-58-179-211t-185-310zm-347 543q-76-60-132.5-125t-98-143.5-71-154.5-58.5-186-52-209-60.5-252-76.5-289q273 0 497.5 36t379 92 271 144.5 185.5 172.5 110 198.5 56 199.5 12.5 198.5-9.5 173-20 143.5-13 107l323 327h-104l-281-285q-22 2-91.5 14t-121.5 19-138 6-160.5-17-167.5-59-179-111z"/></svg>
                </v-card-title>
                <v-card-title class="body-1 justify-center" v-show="!msgCard" :height="300">
                    {{ !err? 'We got your letter and answer you in near time' : 'Something was wrong' }}
                    <v-alert>
                        {{err}}
                    </v-alert>
                </v-card-title>
                <v-card-actions class="justify-center">
                    <v-btn @click="clearBack()" icon :height="55" :width="55">
                        <v-icon size="50" color="primary" v-text="'mdi-check-decagram'">
                        </v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data: () => ({
		err: null,
		msgCard: true,
		themeItems: [
			'My wishes',
			'Find some error',
			'I have a question',
			'Other...'
		],
		inpLabel: 'write you message ',
		inputTheme: null,
		inputComment: null,
	}),
	methods: {
		test() {
		},
		clearBack() {
			this.err = null
			this.inputTheme = null
			this.inputComment = null
			this.msgCard = true
		},
		async sendMsg() {
			// let link = `messages/${this.user.uid}/`
			const userMsg = {
				user: this.user.displayName,
				email: this.user.email,
				uid: this.user.uid,
				theme: this.inputTheme,
				message: this.inputComment,
			}
			// let newPostData = firebase.database().ref(link).push().key
			// To get hours from new Date() use get.Hours() on date instance
			let postMessage = await fetch('http://localhost:5000/send-message', {
				method: 'POST',
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(userMsg)
			})
			let getResponse = await postMessage.json()
			console.log(getResponse)
			console.log(userMsg)
			/*
            firebase.database().ref(link + `${new Date()}/`).update(userMsg)
                .then(this.msgCard = false)
                .catch(err => {
                    this.msgCard = true
                    this.err = err
                }) 
            */
		},
	},
	computed: {
		...mapState('navigationModule', ['user']),
		userName() {
			return this.inpLabel + this.user.displayName.split(' ')[0]
		}
	},
}
</script>