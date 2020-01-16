import * as actions from './store-management/actions'
import { mutations } from './store-management/mutations'
import { state } from './store-management/state'
import { getters } from './store-management/getters'

export const navigation = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
