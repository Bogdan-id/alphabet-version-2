import store from './store/store.js'

export const animate = (el, eff, speed, callback) => {
	const node = document.querySelector(el)
	node.classList.add('animated', eff, speed)
	node.addEventListener('animationend', function removeAnim(){
		node.classList.remove('animated', eff, speed)
		node.removeEventListener('animationend', removeAnim)
		if(typeof callback === 'function') callback()
	})
}
export const fetchBlob = (val) => {
	return fetch(val, {method: 'GET'}).then(val => {
		return val.blob()
	})
}

export const notification = (message, detailMessage) => {
	let obj = new Object()
	obj['message'] = message
	obj['detailMessage'] = detailMessage
	store.dispatch('navigationModule/set_notification', obj)
}
export const progressUtils = {
	startProgress: (emulateState, spinnerState) => {
		let obj = new Object()
		obj['emulate'] = emulateState
		obj['spinner'] = spinnerState
		store.dispatch('navigationModule/start_progress', obj)
	},
	getProgress: () => {
		return store.state.navigationModule['progress']
	},
	setProgress: (progress) => {
		store.dispatch('navigationModule/set_progress', progress)
	},
	finishProgress: () => {
		store.dispatch('navigationModule/finish_progress')
	}
}