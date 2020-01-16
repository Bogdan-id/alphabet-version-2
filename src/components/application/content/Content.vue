<template>
    <v-content class="content-wrap">
        <v-container>
			<Notify 
				v-if="notification"
				:state="notification"
				>
			</Notify>
			<Progress
				v-if="progress"
				>
			</Progress>
			<v-fade-transition mode="out-in">
                <component :is="currentComponent">				
				</component>
			</v-fade-transition>
        </v-container>
    </v-content>
</template>

<script>
import LearningArea from './learning-area/LearningArea.vue'
import About from './About.vue'
import Feedback from './Feedback.vue'
import Notify from './Notify.vue'
import Progress from '../../Progress.vue'

export default {
	props: ['component'],
	data: () => ({
		test: true,
		currentComponent: About,
	}),
	computed: {
		notification() {
			return this.$store.state.navigationModule.snackbar.notifications.length > 0
		},
		progress() {
			return this.$store.state.navigationModule['progress']['state']
		},
	},
	watch: {
		component(val) {
			this.currentComponent = Object.assign({}, val)
		},
	},
	components: {
		LearningArea,
		About,
		Feedback,
		Notify,
		Progress,
	},
}
</script>