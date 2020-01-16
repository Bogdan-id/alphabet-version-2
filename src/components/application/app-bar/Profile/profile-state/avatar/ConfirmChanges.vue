<template>
	<v-card
		:width="400"
		:height="400"
		align="center"
		>
		<v-card-title class="justify-center">
			<v-subheader class="headline">
				Good enough?
			</v-subheader>
		</v-card-title>
		<v-card-text align="center">
			<v-avatar size="230">
				<img class="image" ref="image">
			</v-avatar>
		</v-card-text>
		<v-card-actions>
			<v-btn
				class="ml-8 green lighten-1 white--text" :width="35" :height="35" 
				@click="resizeImage()"  
				text 
				icon
				>
				<v-icon size="30">mdi-check</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn 
				class="mr-8 white--text red lighten-1" :width="35" :height="35" 
				icon
				@click="setAvatar"
				>
				<v-icon size="32">mdi-close</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>

export default {
	props: ['imgProp'],
	data: () => ({
		imageToResize: null,
	}),
	methods: {
		setAvatar() {
			this.$emit('setAvatar')
		},
		resizeImage() {
			console.log('resize image')
			let scale = 150
			let img = new Image()
			img.src = this.$refs.image.src
			img.onload = () => {
				let fileName = this.imgProp['fileName']
				let width = scale
				let height = img.height * (scale / img.width)
				let canvasEl = document.createElement('canvas')
				canvasEl.width = width
				canvasEl.height = height
				let ctx = canvasEl.getContext('2d')
				ctx.drawImage(img, 0, 0, width, height)
				new Promise(resolve => {
					ctx.canvas.toBlob(blob => {
						resolve(blob)
					}, 'image/jpeg', 0.4)
				})
					.then(value => {
						return new File([value], fileName)
					})
					.then(file => {
						this.$emit('listenAvatarUpdates', file)
					})
			}
		},
	},
	mounted() {
		let img = this.imgProp['src'].toDataURL()
		this.$refs.image.src = img
	}
}

</script>