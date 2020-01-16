import * as type from './mutation-types'

export const mutations = {
	[type.FORM_PROFILE](state, profile_state){
		state.formProfile = profile_state
	},
	[type.UPDATE_COMPLETE](state, complete_state){
		state.updateComplete = complete_state
	},
	[type.PASSWORD_STATE](state, pass_state){
		state.passwordState = pass_state
	},
	[type.SHOW_PASSWORD](state, visibility){
		state.showPassword = visibility
	},
	[type.SET_SCALE](state, scale_value){
		state.scale = scale_value
	},
	[type.SET_CANVAS_DIALOG](state, canv_dialog_state){
		state.canvasDialog = canv_dialog_state
	},
	[type.INPUT_USER_NAME](state, user_name_value){
		state.userName = user_name_value
	},
	[type.USER_STATE](state, state_user){
		state.userState = state_user
	},
	[type.AVATAR_STATE](state, avatar_state){
		state.avatar = avatar_state
	},
	[type.SET_CANVAS_BLOB](state, blob_from_canvas){
		state.canvasBlob = blob_from_canvas
	},
	[type.CANVAS_IMAGE](state, canvas_img){
		state.canvasImg = canvas_img
	},
	[type.FINAL_IMAGE](state, img){
		state.finalImg = img
	},
	[type.SET_TITLE](state, title_value){
		state.title = title_value
	},
	[type.SET_BORDER](state, border_value){
		state.border = border_value
	},
	[type.SET_SECURE_BTN](state, btn_state){
		state.secureBtn = btn_state
	},
	[type.SET_USER_INFO](state, user_info_state){
		state.userInfo = user_info_state
	},
	[type.SET_USER_EDIT](state, user_edit_state){
		state.userEdit = user_edit_state
	},
	[type.SET_SECURE_INFO](state, info_state){
		state.securInfo = info_state
	},
	[type.SET_SECURE_EDIT](state, edit_state){
		state.securEdit = edit_state
	},
	[type.SET_UPDATE_SUCCESS](state, success_state){
		state.updateSuccess = success_state
	},
	[type.INPUT_PASSWORD](state, password_val){
		state.password = password_val
	},
	[type.SET_ERR](state, err_val){
		state.err = err_val
	},
}