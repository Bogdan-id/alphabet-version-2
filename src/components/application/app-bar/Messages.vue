<template>
<v-menu 
	offset-y 
	max-width="350" 
	max-height="400"
	:close-on-content-click="false"
	>
	<template v-slot:activator="{ on }">
	<v-badge
		v-if="notReaded"
		class="mr-3"
		overlap
		bottom
		color="error"
		>
		<template v-slot:badge>{{ items.notReaded }}</template>
		<v-btn width="35" height="35" v-on="on" icon depressed>
			<v-icon>mdi-email-outline</v-icon>
		</v-btn>
	</v-badge>
	</template>
	<v-card>
		<v-list dense>
			<v-dialog v-model="dialog" dense width="500">
				<template v-slot:activator="{ on }">
				<v-subheader class="subtitle-1 pt-4">
					<v-btn 
						v-on="on"
						@click="setAllMessage()"
						text
						>MESSAGES</v-btn>
				</v-subheader>
				
					<v-list flat class="pt-0 mt-0">
						<v-list-item-group dense>
							<v-list-item 
								flat
								v-for="(item, i) in items.object"
								:class="`${item.wasRead ? 'white' : 'blue lighten-5'}`"
								v-on="on"
								@click="setIndexAndRead(i)"
								:key="i"
								dense
								two-line
								>
								<v-list-item-content>
									<v-list-item-title>
										{{ item.title }}
									</v-list-item-title>
									<v-list-item-subtitle>
										{{ item.message }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</template>
				<component
					v-if="currentComponent"
					:is="currentComponent"
					@listenToClose="closeDialog()"
					@listenReadMessage="setReadMessage"
					@listenAllMessage="setAllMessage()"
					:items="items"
					:index="index"
					>
				</component>
			</v-dialog>
		</v-list>
	</v-card>
</v-menu>
</template>

<script>
import firebase from 'firebase'
import ReadMessage from './ReadMessage.vue'
import AllMessage from './AllMessage.vue'
export default {
	props: ['items', 'user'],
	data: () => ({
		dialog: false,
		index: null,
		currentComponent: null,
	}),
	methods: {
		setReadMessage(index) {
			this.index = index
			this.currentComponent = Object.assign({}, ReadMessage)
		},
		setAllMessage() {
			this.currentComponent = Object.assign({}, AllMessage)
		},
		closeDialog() {
			this.dialog = false
		},
		setIndexAndRead(index) {
			this.setReadMessage()
			this.index = index
			firebase.database().ref('notifications')
				.child(`${this.user['uid']}/${index}/`).update({wasRead: true})
		}
	},
	computed: {
		notReaded() {
			return this.items['notReaded'] > 0
		}
	},
	components: {
		ReadMessage,
		AllMessage,
	}
}
</script>