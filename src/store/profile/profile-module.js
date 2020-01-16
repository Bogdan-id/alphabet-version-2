import { mutations } from './store-management/mutations'
import * as actions from './store-management/actions'
import { getters } from './store-management/getters'
import { state } from './store-management/state'


export const profile = {
	namespaced: true,
	actions,
	mutations,
	getters,
	state,
}