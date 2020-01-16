import * as type from './mutation-types'

export const set_notification = ({commit}, obj) => {
	setTimeout(() => {
		commit(type.SET_NOTIFICATION, obj)
	}, 600)
}
export const start_progress = ({commit}, obj) => {
	commit(type.START_PROGRESS, obj)
}
export const set_progress = ({commit}, progress) => {
	commit(type.SET_PROGRESS, progress)
}
export const finish_progress = ({commit}) => {
	commit(type.FINISH_PROGRESS)
}
export const close_notification = ({commit}) => {
	commit(type.CLOSE_NOTIFICATION)
}
export const set_learning_area = ({commit}, area) => {
	commit(type.SET_LEARNING_AREA, area)
}
export const set_user = ({commit}, userData) => {
	commit(type.SET_USER, userData)
}
export const sign_out = ({commit}) => {
	commit(type.SIGN_OUT)
}
export const set_drawer = ({commit}) => {
	commit(type.SET_DRAWER)
}
export const set_vnode_tag = ({commit}, tag) => {
	commit(type.SET_VNODE_TAG, tag)
}
export const set_component = ({commit}, value) => {
	commit(type.SET_COMPONENT, value)
}

export const setCard = ({commit}, user_payload) => {
	commit('SET_CARD', user_payload)
}
export const clearCard = ({commit}) => {
	commit('CLEAR_CARD')
}
export const enable_loading = ({commit}) => {
	commit('ENABLE_LOADING')
}
export const disable_loading = ({commit}) => {
	commit('DISABLE_LOADING')
}
export const set_offset = ({commit}, user_payload) => {
	commit('SET_OFFSET', user_payload)
}
export const set_mouse_position = ({commit}, user_payload) => {
	commit('SET_MOUSE_POSITION', user_payload)
}
export const set_is_down = ({commit}, user_payload) => {
	commit('SET_IS_DOWN', user_payload)
}
export const set_upper_case = ({commit}, user_payload) => {
	commit('SET_UPPER_CASE', user_payload)
}
export const set_db = ({commit}, user_payload) => {
	commit('SET_DB', user_payload)
}
export const set_audio_stream = ({commit}, user_payload) => {
	commit('SET_AUDIO_STREAM', user_payload)
}
export const set_word_is_playing = ({commit}, user_payload) => {
	commit('SET_WORD_PLAYING', user_payload)
}
export const set_form_profile = ({commit}, user_payload) => {
	commit('SET_FORM_PROFILE', user_payload)
}
export const set_color_card = ({commit}, value) => {
	commit('SET_COLOR_CARD', value)
}
export const set_current_learn_obj = ({commit}, value) => {
	commit('SET_CURRENT_LEARN_OBJ', value)
}