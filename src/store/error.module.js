import { ERROR, CLEAR_ERROR, LOGOUT } from './actions.type';
import { SET_ERROR } from './mutations.type';
import store from '@/store';
const state = {
	isOpen: false,
	errors: []
};

const getters = {
	getErrors() {
		return state.errors;
	},
	hasErrors() {
		return state.isOpen;
	}
};
const actions = {
	[CLEAR_ERROR](context) {
		context.commit(CLEAR_ERROR);
	},
	[ERROR](context, error) {
		switch (error.response.status) {
			case 422:
				context.commit(SET_ERROR, {
					title: 'Invalid Input',
					message: 'Please check your input'
				});
				break;
			case 403:
				context.commit(SET_ERROR, {
					title: 'Not allowed !!',
					message: "You're not allowed to perform this action"
				});
				break;
			case 410:
			case 401:
				context.dispatch(LOGOUT);
				context.commit(SET_ERROR, {
					title: "You've been logged out !",
					message: 'Session timed out'
				});
				break;
			case 500:
			default:
				context.commit(SET_ERROR, {
					title: 'Oops',
					message: error.message
				});
		}
	}
};

const mutations = {
	[SET_ERROR](state, error) {
		state.isOpen = true;
		state.errors.push({
			title: error.title,
			message: error.message
		});
	},
	[CLEAR_ERROR](state) {
		state.isOpen = false;
		state.errors = [];
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};
