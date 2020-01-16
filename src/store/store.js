import Vue from 'vue'
import Vuex from 'vuex'
import { navigation } from './navigation/navigation-module'
import { profile } from './profile/profile-module'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		navigationModule: navigation,
		profileModule: profile,
	}
})