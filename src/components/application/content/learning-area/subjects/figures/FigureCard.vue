<template>
	<v-card
		:id="`card-figure-${value.id}`"
		v-show="showCard"
		elevation="12"
		class="ma-5"
		dark
		>
		<v-card-actions class="justify-center">
			<v-icon
				class="test"
				@click="setAnim(); audioPlay()" 
				:id="`figures-${value.id}`" 
				:color="iconColor" 
				size="160" 
				v-text="setIcon"
				>
			</v-icon>
		</v-card-actions>
		<v-card-title class="white black--text justify-center subtitle-1">
			{{ iconTitle }}
		</v-card-title>
	</v-card>
</template>

<script>	
export default {
	props: ['value', 'interval'],
	data: () => ({
		showCard: false,
		figureObj: null,
		audio: null,
	}),
	methods: {
		setAnim() {
			let el = document.querySelector(`#figures-${this.value.id}`)
			el.classList.add('animated', 'flip')
			new Promise(
				resolve => {
					el.addEventListener('animationend', function animationOne() {
						el.classList.remove('flip')
						el.removeEventListener('animationend', animationOne)
						resolve()
					}) 
				})
				.then(() => {
					el.classList.add('tada')
					el.addEventListener('animationend', function animationTwo() {
						el.classList.remove('tada', 'animated')
						el.removeEventListener('animationend', animationTwo)
					})
				})
				.catch(err => {
					console.log(err)
					this.$store.dispatch('navigationModule/set_error', err)
				})
		},
		audioPlay() {
			console.log('audioPlay()')
			let audio = new Audio()
			audio.src = this.audio
			audio.play()
		},
	},
	computed: {
		/* eslint-disable */
		iconTitle() {
			switch(this.value.id) {
				case 'rectangle': return 'Квадрат'
				case 'circle': return 'Круг'
				case 'triangle': return 'Треугольник'
			}
		},
		setIcon() {
			switch(this.value.id) {
				case 'rectangle': return 'mdi-rectangle'
				case 'circle': return 'mdi-circle'
				case 'triangle': return 'mdi-triangle'
			}
		},
		iconColor() {
			switch(this.value.id) {
				case 'rectangle': return 'green lighten-1'
				case 'circle': return 'blue lighten-1'
				case 'triangle': return 'orange lighten-1'
			}
		},
	},
	/* eslint-enable */
	created() {
		this.audio = URL.createObjectURL(this.value.value)
	},
	mounted() {
		setTimeout(() => {
			let el = document.querySelector(`#card-figure-${this.value.id}`)
			this.showCard = true
			el.classList.add('animated', 'fadeInRight')
			el.addEventListener('animationend', function dellAnim() {
				el.classList.remove('animated', 'fadeInRight')
				el.removeEventListener('animationend', dellAnim)
			})
		}, this.interval * 250);
	}
}
</script>

<style scoped>
	.test {
		box-shadow: 2px solid black;
	}
</style>