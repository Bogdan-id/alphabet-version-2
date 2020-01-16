<template>
    <div 
		id="parent" 
		v-if="objectsURL"
		>
		<v-menu
			attach="#parent"
			:value="showMenu ? true : false"
			offset-y
			:nudge-bottom="bottomImgCardPos ? 6 : 0"
			bottom
			:nudge-left="leftIndent ? 0 : 40"
			:nudge-right="rightIndent ? -40 : 0"
			:close-on-content-click="false"
			>
			<template #activator="{ on: menu }">
				<v-hover
					v-slot:default="{ hover }"
					>
					<v-card 
						:id="'letter-' + value.id"
						ref="letterCard"
						v-on="{ ...menu }"
						@click="getRandom(); getRect(); animateEl(value.id, 'rubberBand'); playLetter(); setDetailCard(value.id);"
						class="letter-card ma-3 white--text"
						:elevation="hover ? 0 : reduceHover ? 0 : reduceHover && hover ? 0 : 6"
						outlined
						:style="`text-shadow: 2px 2px 12px black; ${setCardColor}`"
						>
						<v-card-title class="card-title display-3 ">
							<b>
								{{
									$store.state.navigationModule.upperCase 
										? value.id.toUpperCase() 
										: value.id
								}}
							</b>
						</v-card-title>
					</v-card>
				</v-hover>
			</template>
			<v-card 
				width="160"
				>
				<v-card-title class="headline pa-1 justify-center d-flex-inline">
					<span 
						style="text-transform: capitalize" 
						class="body-1 align-self-center"
						>
						{{ 
							objectsURL['wordsObj'] && Object.keys(objectsURL['wordsObj']).length !== 0 
								? objectsURL['wordsObj'][randomIndex]['word'] 
								: 'Empty' 
						}}
					</span>
					<v-btn
						small
						@click="playWord()"
						v-show="objectsURL['wordsObj'] && Object.keys(objectsURL['wordsObj']).length !== 0" 
						style="position: absolute; left: 0px" 
						icon
						>
						<v-icon color="blue" v-text="wordIsPlaying ? 'mdi-pause' : 'mdi-play'"></v-icon>	
					</v-btn>
					<v-btn
						@click="showMenuOn()"
						style="position: absolute; right: 0px;"
						icon
						small
						>
						<v-icon v-text="'mdi-close'">
						</v-icon>
					</v-btn>
				</v-card-title>
				<v-hover #default="{ hover }">
					<div>
						<v-img
							:src="Object.keys(objectsURL['wordsObj']).length > 0 
								? objectsURL['wordsObj'][randomIndex]['image'] 
								: ''"
							class="align-center"
							>
						</v-img>
						<v-card-actions  class="align-center justify-center pa-0 ma-0">
							<v-btn 
								v-show="Object.keys(objectsURL['wordsObj']).length > 0" icon
								@click="RClickImg()" 
								>
								<v-icon 
									:color="hover ? 'grey darken-2' : 'grey'"
									v-text="'mdi-arrow-left-bold'"
									>
								</v-icon>
							</v-btn>
							<v-spacer></v-spacer>
							<v-btn 
								v-show="Object.keys(objectsURL['wordsObj']).length > 0" icon
								@click="LClickImg()"
								>
								<v-icon 
									:color="hover ? 'grey darken-2' : 'grey'"
									v-text="'mdi-arrow-right-bold'"
									>
								</v-icon>
							</v-btn>
						</v-card-actions>
					</div>
				</v-hover>
			</v-card>
		</v-menu>
    </div>
</template>

<script>
export default {
	props: [
		'value',
		'windowSize',
		'currentCard'
	],
	data: () => ({
		reduceHover: false,
		bottomImgCardPos: true,
		objectsURL: null,
		randomIndex: 0,
		wordIsPlaying: false,
		showMenu: false,
		leftIndent: false,
		rightIndent: false,
	}),
	computed: {
		setCardColor() {
			return this.currentCard === this.value.id
				// If you wish you can use transition: background 0.7s ease-in-out  - instead 
				? 'background: rgb(253, 154, 25); transition: all 0.7s ease-in-out' 
				: 'background: rgb(69, 182, 83); transition: all 0.7s ease-in-out'
		},
	},
	methods: {
		showMenuOn() {
			this.showMenu = true
			setTimeout(() => {
				this.showMenu = false
			}, 15)
		},
		getRandom() {
			console.log('getRandom()')
			if(Object.keys(this.objectsURL['wordsObj']).length > 0 ){
				this.randomIndex < Object.keys(this.objectsURL['wordsObj']).length - 1 
					? this.randomIndex ++ 
					: this.randomIndex = 0
			}
		},
		getRect() {
			console.log('getRect')
			let LCRect = this.$refs.letterCard.$el.getBoundingClientRect()
			if (LCRect.bottom > (this.windowSize['height'] - LCRect.height)){
				window.scrollBy({top: LCRect.height * 2.5, behavior: 'smooth'})
			}
			if (LCRect.top < 0) {
				window.scrollBy({top: -LCRect.height, behavior: 'smooth'}) 
			}
			if((LCRect.right + LCRect.width) > this.windowSize['width']) {
				this.rightIndent = true
			}
			if((LCRect.left - LCRect.width) < 0) {
				this.leftIndent = true
			}
		},

		playLetter() {
			console.log('playLetter()')
			if(!this.$store.state.navigationModule.audioStream) {
				this.$store.dispatch('navigationModule/set_audio_stream', true)
				let audio = new Audio()
				audio.src = this.objectsURL['sound']
				this.listenAudio(audio, this.playWord)
			} else return
		},

		listenAudio(audio, callback) {
			console.log('listenAudio()')
			audio.play()
			new Promise(resolve => {
				audio.addEventListener('ended', function deleteAudioListener() {
					audio.removeEventListener('ended', deleteAudioListener)
					resolve()
				})
			}).then(() => {
				typeof callback === 'function' ? callback() : false
			}).catch(err => {
				console.log(err)
				this.$store.dispatch('navigationModule/set_error', err)
			})
		},

		playWord() {
			console.log('playWord()')
			if(Object.keys(this.objectsURL['wordsObj']).length > 0){
				if(!this.wordIsPlaying){
					this.wordIsPlaying = true
					let audio = new Audio()
					audio.src = this.objectsURL['wordsObj'][this.randomIndex]['detailSound']
					let callback = () => {
						this.$store.dispatch('navigationModule/set_audio_stream', false)
						this.wordIsPlaying = false
					}
					this.listenAudio(audio, callback)
				} else return
			} else {
				this.$store.dispatch('navigationModule/set_audio_stream', false)
				return
			}
		},
		RClickImg() {
			console.log('RClickImg()')
			if (Object.keys(this.objectsURL['wordsObj']).length > 0){
				this.randomIndex < Object.keys(this.objectsURL['wordsObj']).length - 1
					? this.randomIndex ++
					: this.randomIndex = 0
				this.playWord()
			} else return
		},

		LClickImg() {
			console.log('LClickImg()')
			if (Object.keys(this.objectsURL['wordsObj']).length > 0){
				this.randomIndex > 0 
					? this.randomIndex --
					: this.randomIndex = Object.keys(this.objectsURL['wordsObj']).length - 1
				this.playWord()
			} else return
		},

		setDetailCard(value) {
			this.$emit('setCurrentCard', value)
		},

		animateEl(el, eff) {
			console.log('animageEl()')
			this.reduceHover = true
			let animElem = this.$refs.letterCard.$el
			animElem.classList.add('animated', eff)
			new Promise(resolve => {
				animElem.addEventListener('animationend', function deleteAnimate() {
					animElem.classList.remove('animated', eff)
					animElem.removeEventListener('animationend', deleteAnimate)
					resolve()
				}, {passive: true})
			}).then(() => {
				this.reduceHover = false
			}).catch(err => {
				console.log(err)
				this.$store.dispatch('navigationModule/set_error', err)
			})
			
		},
		async cacheURLfromBlob() {
			let value = {}
			let id = this.value['id']
			let sound = await URL.createObjectURL(this.value['sound'])
			value['id'] = id
			value['sound'] = sound
			value['wordsObj'] = []
			if (this.value['wordsObj'] && Object.keys(this.value['wordsObj']).length !== 0) {
				for(let i in Object.keys(this.value['wordsObj'])) {
					let detailSound = await URL.createObjectURL(this.value['wordsObj'][i]['detailSound'])
					let image = await URL.createObjectURL(this.value['wordsObj'][i]['image'])
					let word = this.value['wordsObj'][i]['word']
					value['wordsObj'].push({'detailSound': detailSound, 'image': image, 'word': word})
				}
			}
			this.objectsURL = value
		},
	},
	created() {
		this.cacheURLfromBlob()
	},
}
</script>
