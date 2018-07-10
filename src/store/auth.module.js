import JwtService from '@/common/jwt.service';
import { LOGIN, LOGOUT, CHECK_AUTH } from './actions.type';
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type';
import { AuthService } from '../common/api.service';
const state = {
	errors: null,
	user: {},
	isAuthenticated: !!JwtService.getToken()
};

const getters = {
	currentUser(state) {
		return state.user;
	},
	isAuthenticated(state) {
		return state.isAuthenticated;
	},
	getErrors() {
		return state.errors;
	}
};
const actions = {
	[LOGIN](context, credentials) {
		let { username, password } = credentials;
		return new Promise(resolve => {
			AuthService.login(credentials)
				.then(({ data }) => {
					context.commit(SET_AUTH, data);
					resolve();
				})
				.catch(({ response }) => {
					if (response) context.commit(SET_ERROR, response.data.errors);
				});
		});
	},
	[LOGOUT](context) {
		return new Promise(resolve => {
			AuthService.logout()
				.then(({ data }) => {
					context.commit(PURGE_AUTH);
					resolve();
				})
				.catch(({ response }) => {
					if (response) context.commit(SET_ERROR, response.data.errors);
				});
		});
	},
	[CHECK_AUTH](context) {
		// if (JwtService.getToken()) {
		//   ApiService.setHeader()
		//   ApiService
		//     .get('user')
		//     .then(({data}) => {
		//       context.commit(SET_AUTH, data.user)
		//     })
		//     .catch(({response}) => {
		//       context.commit(SET_ERROR, response.data.errors)
		//     })
		// } else {
		//   context.commit(PURGE_AUTH)
		// }
	}
};

const mutations = {
	[SET_ERROR](state, error) {
		state.errors = error;
	},
	[SET_AUTH](state, user) {
		state.isAuthenticated = true;
		state.user = user.username;
		state.errors = {};
		JwtService.saveToken(user.jwt);
	},
	[PURGE_AUTH](state) {
		state.isAuthenticated = false;
		state.user = {};
		state.errors = {};
		JwtService.destroyToken();
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};
