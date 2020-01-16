import * as type from './mutation-types'

export const form_profile = ({commit}, form_profile_state) => {
	commit(type.FORM_PROFILE, form_profile_state)
}
export const update_complete = ({commit}, update_state) => {
	commit(type.UPDATE_COMPLETE, update_state)
}
export const input_email = ({commit}, email_val) => {
	commit(type.INPUT_EMAIL, email_val)
}
export const password_state = ({commit}, state_val) => {
	commit(type.PASSWORD_STATE, state_val)
}
export const show_password = ({commit}, visibility) => {
	commit(type.SHOW_PASSWORD, visibility)
}
export const set_scale = ({commit}, scale_val) => {
	commit(type.SET_SCALE, scale_val)
}
export const set_canvas_dialog = ({commit}, dialog_state) => {
	commit(type.SET_CANVAS_DIALOG, dialog_state)
}
export const input_user_name = ({commit}, user_name) => {
	commit(type.INPUT_USER_NAME, user_name)
}
export const user_state = ({commit}, state_user) => {
	commit(type.USER_STATE, state_user)
}
export const avatar_state = ({commit}, state_avatar) => {
	commit(type.AVATAR_STATE, state_avatar)
}
export const set_canvas_blob = ({commit}, canvas_blob) => {
	commit(type.SET_CANVAS_BLOB, canvas_blob)
}
export const canvas_image = ({commit}, state) => {
	commit(type.CANVAS_IMAGE, state)
}
export const final_image = ({commit}, img) => {
	commit(type.FINAL_IMAGE, img)
}
export const set_title = ({commit}, title) => {
	commit(type.SET_TITLE, title)
}
export const set_border = ({commit}, border_value) => {
	commit(type.SET_BORDER, border_value)
}
export const set_secure_btn = ({commit}, btn_state) => {
	commit(type.SET_SECURE_BTN, btn_state)
}
export const set_user_info = ({commit}, user_info_st) => {
	commit(type.SET_USER_INFO, user_info_st)
}
export const set_user_edit = ({commit}, user_edit_state) => {
	commit(type.SET_USER_EDIT, user_edit_state)
}
export const set_secure_info = ({commit}, sec_info_state) => {
	commit(type.SET_SECURE_INFO, sec_info_state)
}
export const set_secure_edit = ({commit}, secure_edit_st) => {
	commit(type.SET_SECURE_EDIT, secure_edit_st)
}
export const set_update_success = ({commit}, st_upd_success) => {
	commit(type.SET_UPDATE_SUCCESS, st_upd_success)
}
export const input_password = ({commit}, password) => {
	commit(type.INPUT_PASSWORD, password)
}
export const set_err = ({commit}, err) => {
	commit(type.SET_ERR, err)
}
export const firebase_auth = ({commit}) => {
	commit(type.FIREBASE_AUTH)
}