<template>
    <v-row class="wraper"> 
        <v-container id="container" class="text-center">
            <v-col class="col-md-12"> 
				<v-row justify="center">
					<v-card 
						style="background: rgb(110, 96, 69);" 
						justify="center" class="anim title-2 pt-1 pb-1 pl-2 pr-3 white--text"
						>
						<v-card-title class="pa-0 subtitle-1">
							<v-icon color="yellow darken-2" class="pr-1" v-text="'mdi-apple-safari'"></v-icon>
							{{
								$store.state.navigationModule.learningArea 
									? $store.state.navigationModule.learningArea 
									: 'Choose subject'
							}}
						</v-card-title>
					</v-card>
				</v-row>

				<v-row align="start">
					<Subjects :windowSize="windowSize"></Subjects>
				</v-row>
            </v-col>
        </v-container>
    </v-row>
</template>
<script>

import Subjects from './subjects/Subjects.vue'

export default {
	data: () => ({
		windowSize: null,
	}),
	methods: {
		onResizePage() {
			let scrollWidth = document.querySelector('body').scrollWidth
			let scrollHeight = document.querySelector('body').scrollHeight
			let windowSize = new Object()
			windowSize['height'] = this.$vuetify.breakpoint.height
			windowSize['width'] = this.$vuetify.breakpoint.width
			windowSize['scrollHeight'] = scrollHeight
			windowSize['scrollWidth'] = scrollWidth
			this.windowSize = windowSize
		},
	},
	mounted() {
		this.onResizePage()
		window.addEventListener('resize', this.onResizePage, { passive: true })
	},
        
	beforeDestroy(){
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', this.onResizePage, { passive: true })
		}
	},
	components: {
		Subjects,
	},
}
</script>

