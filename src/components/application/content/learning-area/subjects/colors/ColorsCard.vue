<template>
	<v-card
		v-show="showCard"
		:style="checkIfMounted ? cardColor : false"
		:id="value.id + '-card'"
		@click="setColorCard(); cardAudio()"
		v-ripple="false"
		class="ma-5 add-shadow" 
		:width="100" 
		:height="110"
		:color="value.id"
		>
		<v-icon color="yellow darken-2" v-show="cardIcon" v-text="'mdi-star-face'"></v-icon>
		<v-card-text
			:id="`text-animate-${value.id}`"
			:class="`subtitle-1 text-animate ${textColor}--text pt-0 pl-1 pr-1`"
			>
			{{ cardText }}
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	props: ['value', 'iterValue'],
	data: () => ({
		showCard: false,
		checkIfMounted: false,
		showIcon: false,
		audio: null,
	}),
	computed: {
		/*eslint-disable*/
		cardText() {
			switch(this.value.id){
				case 'black': return 'черный'
				case 'blue': return 'голубой'
				case 'brown': return 'коричневый'
				case 'green': return 'зелёный'
				case 'grey': return 'серый'
				case 'indigo': return 'синий'
				case 'orange': return 'оранжевый'
				case 'pink': return 'розовый'
				case 'purple': return 'фиолетовый'
				case 'red': return 'красный'
				case 'white': return 'белый'
				case 'yellow': return 'желтый'
				
			}
		},
		cardIcon() {
			return this.$store.state.navigationModule.colorCard === this.value.id
				? true
				: false
		},
		cardColor() {
			let el = document.querySelector(`#${this.value.id}-card`)
			return this.$store.state.navigationModule.colorCard === this.value.id
				? el.classList.add('add-show-is-active')
				: el.classList.contains('add-show-is-active') ? el.classList.remove('add-show-is-active')
				: false
		},
		textColor() {
			return this.value.id === 'white' ? 'black' : this.value.id === 'yellow' ? 'black': 'white'
		}
	},
	methods: {
		async setColorCard() {
			try {
				this.$store.dispatch('navigationModule/set_color_card', this.value.id)
				const el = document.querySelector(`#text-animate-${this.value.id}`)
				el.classList.add('text-animate-active', 'animated', 'lightSpeedIn')
				new Promise(
					resolve => {el.addEventListener('animationend', function addNewAnimation() {
						setTimeout(() => {
							el.classList.remove('lightSpeedIn')
							// You need remove listener in all stages 'onanimationend' and add new one
							el.removeEventListener('animationend', addNewAnimation)
							resolve()
						}, 1000)
					})}
				).then(() => {
					el.classList.add('fadeOutDown')
					el.addEventListener('animationend', function deleteListener() {
						el.removeEventListener('animationend', deleteListener)
						el.classList.remove('text-animate-active', 'animated', 'fadeOutDown')
					})
				})
			} catch(err) {
				console.log(err)
				this.$store.dispatch('navigationModule/set_error', err)
			}
			
		},
		colorCardInterval() {
			setTimeout(() => {
				let el = document.querySelector(`#${this.value.id}-card`)
				this.showCard = true
				el.classList.add('animated', 'zoomInDown')
				el.addEventListener('animationend', function addNewAnimate() {
					el.classList.remove('animated', 'zoomInDown', 'animated')
				})
			}, this.iterValue * 320)
		},
		cardAudio() {
			let audio = new Audio()
			audio.src = this.audio
			console.log(audio)
			audio.play()
		},
	},
	async created() {
		this.audio = await URL.createObjectURL(this.value.sound)
		console.log(this.audio)
		console.log(this.value.sound)
	},
	mounted() {
		this.colorCardInterval()
		this.checkIfMounted = true
	},
}
</script>

<style scoped>
	.text-animate {
		opacity: 0;
	}
	.text-animate-active {
		opacity: 1;
	}
	.add-shadow {
		box-shadow: 0px 0px 0px 1px black;
	}
	.add-show-is-active {
		box-shadow: 0px 0px 2px 2px black;
	}
	.add-shadow:hover {
		box-shadow: 0px 0px 2px 2px black;
	}
</style>