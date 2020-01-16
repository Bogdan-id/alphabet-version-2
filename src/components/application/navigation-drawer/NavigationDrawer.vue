<template>
    <v-navigation-drawer
        v-model="drawerState"
        app
        dark
        expand-on-hover
        :width="195"
        hide-overlay
        >
        <div style="position: absolute;">
            <v-list-item class="ma-3">
                <v-list-item-icon>
                    <v-icon>mdi-chart-timeline-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    ALPHABET
                </v-list-item-title>
            </v-list-item>
            <v-divider class="ma-3 grey darken-1"></v-divider>
            <v-list-item-group>
                <v-list nav dense>
                    <v-list-item
                        v-for="(item, i) in listLink"
                        :key="i"
                        @click="changeComponent(item.component)"
                        >
                        <v-list-item-icon class="ma-3">
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-list-item-group>
        </div>
    </v-navigation-drawer>
</template>

<script>
import About from './../content/About.vue'
import LearningArea from './../content/learning-area/LearningArea.vue'
import Feedback from './../content/Feedback.vue'

export default {
	props:['drawer'],
	data: () => ({
		drawerState: true,
		listLink: [
			{ text: 'Home', icon: 'mdi-view-dashboard', component: About },
			{ text: 'Learning', icon: 'mdi-image', component: LearningArea},
			{ text: 'Email us', icon: 'mdi-email-variant', component: Feedback}
		],
	}),
	watch: {
		drawerState(val) {
			this.$emit('listenDrawer', val)
			console.log(val)
		},
		drawer() {
			this.drawerState = this.drawer
		}
	},
	methods: {
		changeComponent(component){
			this.$emit('listenComponent', component)
		},
	}
}
</script>