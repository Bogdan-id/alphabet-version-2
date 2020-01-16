<template>
<div 
	class="parent" 
	:id="'number-' + value.id" v-if="value"
	>
	<v-hover v-slot:default="{ hover }">
		<v-card
			:id="'letter-' + value.id"
			open-delay="60"
			close-delay="80"
			:elevation="hover ? 12 : 2"
			class="animated bounceInDown letter-card ma-1"
			ref="letterCard"
			@click="cardColor(); playSound()"
			:color="setCardColor"
			>
			<v-card-title class="card-title display-3">
				<b class="marker">{{ value.id }}</b>
			</v-card-title>
		</v-card>
	</v-hover>
	<div v-if="error">
		{{ error.message }}
	</div>
</div>
</template>

<script>

export default {
	props: ["value", "windowSize"],
	data: () => ({
		item: null,
		itemObject: [],
		word: [],
		sound: null,
		error: null,
	}),
	computed: {
		setCardColor() {
			return this.$store.state.navigationModule.currentCard === this.value.id
				? "green"
				: "blue"
		}
	},
  	methods: {
		cardColor() {
			this.$store.dispatch("navigationModule/setCard", this.value.id)
		},
		async playSound() {
			let audio = new Audio()
			audio.src = this.audio
			audio.play()
		},
	},
	created() {
		this.audio = URL.createObjectURL(this.value.sound)
	},
}
</script>

<style scoped>
.word-title {
	position: relative;
	top: 20px;
	padding: 0 0 5px 0;
}
.parent {
	border-radius: 50px;
	margin: 15px;
}
.letter-card {
	width: auto;
	min-width: 103px;
	min-height: 90px;
}

.card-title {
	left: 0;
	right: 0;
	color: white;
	text-shadow: 2px 2px 12px black;
}
.card-title > b {
	margin-right: auto;
	margin-left: auto;
}
</style>
