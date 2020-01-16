<template>
<v-col>
	<div v-if="!currentComponent" :class="`d-inline-flex flex-wrap justify-${toggleView}`">
		<v-hover
			v-for="(item, i) in subjectsJs"
			:key="'index-' + i"
			>
			<template v-slot:default="{ hover }">
				<v-card
					width="120"
					:color="hover ? 'green' : 'blue lighten-1'"
					class="title-card ma-5"
					:elevation="hover ? 2 : 9"
					:key="`${i}-${item.desc}`"
					@click="
						$store.dispatch('navigationModule/set_learning_area', item.aria);
						chooseSubject(item.subject)
					"
					>
					<v-tooltip bottom small color="teal darken-4">
						<template v-slot:activator="{ on }">
							<v-icon
								v-on="on" :size="hover ? 28 : 25"
								:color="hover
									? 'yellow lighten-4'
									: 'white'" class="icon-corner" v-text="'mdi-alert-decagram-outline'">
							</v-icon>
						</template>
						<span>{{ item.title }}</span>
					</v-tooltip>
					<v-icon
						class="mt-2"
						:color="hover
							? 'white'
							: 'grey lighten-4'" size="100" v-text="item.icon">
					</v-icon>
					<v-card-text class="title-card-text pa-1 white black--text">
						{{ item.desc }}
					</v-card-text>
				</v-card>
			</template>
		</v-hover>
	</div>
	<Progress v-if="overlay">
	</Progress>
	<component
		:is="currentComponent"
		:windowSize="windowSize"
		:temporaryObj="temporaryObj"
		>
	</component>
</v-col>
</template>

<script>
// 	
import firebase from 'firebase'
import { openDB } from 'idb'

import { containerCards } from './subjects.js'

import Progress from '../../../../Progress.vue'
import Alphabet from './alphabet/Alphabet.vue'
import Numbers from './numbers/Numbers.vue'
import Colors from './colors/Colors.vue'
import Figures from './figures/Figures.vue'
import Count from './count/Count.vue'
import { notify } from './notifications'
import { notification } from '../../../../../utils.js'
import { subjectsHandler } from './subjects-handler.js'

export default {
	props: [
		'windowSize',
	],
	data: () => ({
		subjectsJs: containerCards,
		currentComponent: null,
		objectItems: [],
		subject: null,
		temporaryObj: null,
		overlay: false,
		stage: null,
		handler: subjectsHandler
	}),
	computed: {
		/*eslint-disable */
		toggleView() {
			switch (this.$vuetify.breakpoint.name) {
				case 'xs': return 'center'
				case 'sm': return 'center'
				case 'md': return 'start'
				case 'lg': return 'start'
				case 'xl': return 'start'
			}
		},
		successMessage() {
			return 'Application: ' + this.subject.split('_')[0] + ' now is cached'
		},
		failureMessage() {
			return 'Application: ' + this.subject.split('_')[0] + ' - not cached'
		}
		/*eslint-enable */
	},
	methods: {
		notification,
		chooseComponent(value) {
			console.log('chooseComponent()')
			/*eslint-disable */
			switch(value) {
				case 'alphabet_rus': return this.currentComponent = Alphabet
				case 'numbers_rus': return this.currentComponent = Numbers
				case 'colors_rus': return this.currentComponent = Colors
				case 'figures_rus': return this.currentComponent = Figures
				case 'count_rus': return this.currentComponent = Count
			}
			/*eslint-disable */
		},
		chooseSubject(subject){
			let callback = async() => {
				this.subject = subject
				this.chooseComponent(subject)
				this.temporaryObj = null
				await this.getIDB()
			}
			this.handleWithCatch(callback)
		},

		switchHandler() {
			console.log('switchHandler()')
			switch(this.subject) {
				case 'alphabet_rus': return this.awaitStore(this.handler['fetchAlphabet'](this.objectItems))
				case 'numbers_rus': return this.awaitStore(this.handler['fetchNumbers'](this.objectItems))
				case 'colors_rus': return this.awaitStore(this.handler['fetchColors'](this.objectItems))
				case 'figures_rus': return this.awaitStore(this.handler['fetchFigures'](this.objectItems))
				case 'count_rus': return this.awaitStore(this.handler['fetchCount'](this.objectItems))
			}
		},

		async objectFromFB () {
			console.log('objectFromFB()')
			this.$store.dispatch('navigationModule/enable_loading')
			await firebase.database().ref(`${this.subject}/`).once('value').then(snap => {
				return this.objectItems = snap.val()
			})
		},

		async storeIDB() {
			try{
				console.log('storeIDB()')
				const IDB = await this.createIDB()
				const tx = IDB.transaction(this.subject, 'readwrite')
				await this.temporaryObj
				this.temporaryObj.forEach(obj => {
					tx.store.add({id: obj.id, value: obj})
				})
				await tx.done
				this.notification(this.successMessage, notify['successCache'])
				this.overlay = false
			} catch(err) {
				console.log(err)
				this.notification(this.failureMessage, err)
				this.overlay = false
			}
		},

		async getIDB() {
			try {
				console.log('getIDB()')
				this.overlay = true
				if(!('indexedDB' in window)){
					this.switchSource('indexedDB is not Suported')
				}
				const IDB = await this.createIDB()
				let data = await IDB.getAll(this.subject)
				if(Object.keys(data).length === 0) {
					this.switchSource('no data')
					return
				}
				let obj = await data.map(val => {
					return val.value
				})
				Promise.all(obj).then(async val => {
					typeof(val[0].id) === 'string'
						? await this.sortAlphabetical(val)
						: typeof(val[0].id) === 'number'
						? await this.sortNumeric(val)
						: console.log('Something wrong. May be you need add type to sort Data')
					this.$store.dispatch('navigationModule/disable_loading')
					this.overlay = false
				})
			} catch(err) {
				this.overlay = false
				this.notification(this.failureMessage, err)
				this.switchSource(err)
			}
		},

		sortAlphabetical(object) {
			console.log('sortAlphabetical()')
			let collator = new Intl.Collator('rus')
			// you also may use new Intl.Collator('rus') instead collator
			object.sort((a, b) => {
				return collator.compare(a.id, b.id)
			})
			this.temporaryObj = object
		},
		sortNumeric(object) {
			console.log('sortNumeric()')
			object.sort((a, b) => {
				return a.id - b.id
			})
			this.temporaryObj = object
		},
		async switchSource(error) {
			console.log('switchSource()')
			await this.objectFromFB()
			this.switchHandler()
		},

		handleWithCatch(callback) {
			try{
				typeof callback === 'function'
					? callback()
					: console.log('callback argument must be a fucntion')
			}
			catch(err) {
				console.log(err)
				this.notification(this.failureMessage, err)
			}
		},

		async awaitStore(val) {
			new Promise(resolve => {
				resolve(val)
			}).then(async obj => {
				let type = typeof(obj[0].id)
				type === 'string'
					? await this.sortAlphabetical(obj)
					: type === 'number'
					? await this.sortNumeric(obj)
					: console.log('Something wrong. May be you need add type to sort Data')
				this.handleWithCatch(this.storeIDB)
			})	
		},

		async createIDB () {
			const IDB = await openDB('LearnDB', 1, {
				upgrade(IDB) {
					console.log('create IDB')
					IDB.createObjectStore('numbers_rus', {keyPath: 'id', autoIncrement: false})
					IDB.createObjectStore('alphabet_rus', {keyPath: 'id', autoIncrement: true})
					IDB.createObjectStore('colors_rus', {keyPath: 'id', autoIncrement: true})
					IDB.createObjectStore('figures_rus', {keyPath: 'id', autoIncrement: true})
					IDB.createObjectStore('count_rus', {keyPath: 'id', autoIncrement: true})
					// Add new store if you need
				},
			})
			this.$store.dispatch('navigationModule/set_db', IDB)
			return IDB
		},
	},
	components: {
		Progress,
		Alphabet,
		Numbers,
		Colors,
		Figures,
		Count,
	}
}
</script>

<style scoped>
	.icon-corner {
		position: absolute;
		top: 20px;
		right: 5px;
		opacity: 0;
		transition: .3s ease-out;
		transition-delay: .2s;
	}
	.title-card {
		transition: .4s ease-out;
	}
	.title-card:hover > .icon-corner {
		position: absolute;
		top: 2px;
		right: 5px;
		transition: .3s ease-out;
		transition-delay: .2s;
		opacity: 1;
	}
	.title-card-text {
		transition: .4s ease-out;
	}
	.title-card:hover > .title-card-text {
		transition: .4s ease-out;
	}
	.title-card:hover{
		transition: .3s ease-out;
	}
</style>