import Vue from 'vue'
import * as type from './mutation-types'

export const mutations = {
	[type.CLOSE_NOTIFICATION](state) {
		state.snackbar['notifications'].splice(0, 1)
	},
	[type.SET_NOTIFICATION](state, notifyObj) {
		state.snackbar['notifications'].push(notifyObj)
	},
	[type.START_PROGRESS](state, obj) {
		state.progress['state'] = true
		state.progress['emulate'] = obj['emulate']
		state.progress['spinner'] = obj['spinner']
	},
	[type.SET_PROGRESS](state, value) {
		state.progress['currentProgress'] = value
	},
	[type.FINISH_PROGRESS](state) {
		let progress = new Object()
		progress['state'] = false
		progress['currentProgress'] = 0
		progress['emulate'] = false
		progress['spinner'] = false
		state.progress = progress
	},
	[type.SET_LEARNING_AREA](state, area) {
		state.learningArea = area
	},
	[type.SET_USER](state, userData) {
		Vue.set(state.user = userData)
	},
	[type.SET_DRAWER](state) {
		state.drawer = !state.drawer
	},
	[type.SET_VNODE_TAG](state, tag) {
		state.vnodeTag = tag
	},
	[type.SET_COMPONENT](state, value) {
		state.component = value
	},

	[type.SET_FORM_PROFILE](state, user_payload) {
		state.formProfile = user_payload
	},
	[type.SET_CARD](state, user_payload) {
		state.currentCard = user_payload
	},
	[type.CLEAR_CARD](state) {
		state.currentCard = ''
	},
	[type.ENABLE_LOADING](state) {
		state.loading = true
	},
	[type.DISABLE_LOADING](state) {
		state.loading = false
	},
	[type.SET_OFFSET](state, user_payload) {
		state.offset = user_payload
	},
	[type.SET_MOUSE_POSITION](state, user_payload) {
		state.mousePosition = user_payload
	},
	[type.SET_IS_DOWN](state, user_payload) {
		state.isDown = user_payload
	},
	[type.SET_UPPER_CASE](state, user_payload) {
		state.upperCase = user_payload
	},
	[type.SET_DB](state, user_payload) {
		state.IDB = user_payload
	},
	[type.SET_AUDIO_STREAM](state, user_payload) {
		state.audioStream = user_payload
	},
	[type.SET_WORD_PLAYING](state, user_payload) {
		state.wordIsPlaying = user_payload
	},
	[type.SET_COLOR_CARD](state, value) {
		state.colorCard = value
	},
	[type.SET_CURRENT_LEARN_OBJ](state, value) {
		state.currentLearnObj = value
	}
}