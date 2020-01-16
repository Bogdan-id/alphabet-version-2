import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store/store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
// import Authorization from './components/Authorization.vue'
// import Progress from './components/Progress.vue'

Vue.config.productionTip = true

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App) // in your template (not in this case) Vue always not exlpisity call render function
})
	.$mount('#app') // the same result you have if pass el: '#app' in new Vue({})
