<template>
<v-app id="inspire">
	<Content :component="component"/>
	<NavigationDrawer 
		:drawer="drawer"
		@listenDrawer="drawer = $event"
		@listenComponent="setComponent($event)"
		/>
	<AppBar 
		:drawer="drawer"
		@listenDrawer="drawer = $event"
		/>
</v-app>
</template>

<script>
import Content from './application/content/Content.vue'
import AppBar from './application/app-bar/AppBar.vue'
import NavigationDrawer from './application/navigation-drawer/NavigationDrawer.vue'

export default {
	data: () => ({
		drawer: true,
		component: null,
	}),
	methods: {
		setComponent(component) {
			this.component = Object.assign({}, component)
		},
	},
	mounted () {        
		const app = document.getElementById('inspire')
		app.classList.add('animated', 'fadeIn')
	},
	components: {
		Content,
		AppBar,
		NavigationDrawer,
	}
}
</script>
<style scoped>
    .content-wrap {
        background: #e6f7bf;
    }
    .content-wrap * {
        user-drag: none; 
        user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
    .sign-enter {
        opacity: 0;
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .sign-leave-active {
        opacity: 0;
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>