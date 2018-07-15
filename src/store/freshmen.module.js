import { FETCH_FRESHIES } from './actions.type';
import { FreshyService } from '@/common/api.service';
const state = {
	freshmen: []
};
const getters = {
	getFreshmen() {
		return state.freshmen;
	}
};
const actions = {
	[FETCH_FRESHIES]() {
		FreshyService.getFreshies();
	}
};
const mutations = {};

export default {
	state,
	actions,
	mutations,
	getters
};
