<template>
	<v-card class="change-state" :width="350">
		<v-card-actions class="pa-0">
			<v-spacer></v-spacer>
			<v-btn @click="closeDialog()" icon>
				<v-icon v-text="'mdi-close'"></v-icon>
			</v-btn>
		</v-card-actions>
		<v-card-title class="justify-center">
			<v-subheader class="title">
				{{title === null ? 'Drop or Click' : title}}
			</v-subheader>
		</v-card-title>
		<v-card-text class="container-width">
			<v-img>
				<VueAvatar
					:width="400"
					:height="400"
					align="center"
					:scale="scale"
					:borderRadius="borderRadius"
					:border="10"
					ref="vueavatar"
					@vue-avatar-editor:image-ready="onImageReady"
					accept="image/*"
					>
				</VueAvatar>
			</v-img>
			<v-slider
				dense
				:min="1"
				:max="5"
				:step="0.01"
				v-model="scale"
				prepend-icon="mdi-plus-circle"
				thumb-label
				/>
		</v-card-text>
		<v-card-actions class="justify-center pt-0">
			<v-btn 
				@click="getBlob()" 
				class="pt-0 pb-0" 
				color="primary" 
				small
				>
				Click
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import VueAvatar from './vue-avatar/VueAvatar.vue'

export default {
	props: ['user'],
	data: () => ({
		borderRadius: 25,
		scale: null,
		title: null,
	}),
	methods: {
		onImageReady() {
			this.title = 'Chosse desired area'
			this.borderRadius = 200
			this.scale = 1
		},
		closeDialog() {
			this.$emit('setAvatar')
		},
		getBlob() {
			try {
				let img = this.$refs.vueavatar.getImageScaled()
				let imgObj = {}
				imgObj['fileName'] = this.$refs.vueavatar.$refs.input.files[0].name
				imgObj['src'] = img
				imgObj['user'] = this.user
				this.$emit('listenAvatar', imgObj)
			} catch (err) {
				console.log(err)
			}
		},
	},
	components: {
		VueAvatar,
	},
}
</script>