import JwtService from '@/common/jwt.service';
import { LOGIN, LOGOUT, CHECK_AUTH } from './actions.type';
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type';
import { AuthService } from '@/common/api.service';
import ApiService from '../common/api.service';
const state = {
	user: {},
	isAuthenticated: !!JwtService.getToken(),
	roles: JwtService.getRoles() || [],
	permissions: JwtService.getPermissions() || []
};

const getters = {
	currentUser(state) {
		return state.user;
	},
	getPermissions(state) {
		return state.permissions;
	},
	getRoles(state) {
		return state.roles;
	},
	isAuthenticated(state) {
		return state.isAuthenticated;
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
			AuthService.logout().then(({ data }) => {
				context.commit(PURGE_AUTH);
				resolve();
			});
		});
	}
};

const mutations = {
	[SET_AUTH](state, user) {
		state.isAuthenticated = true;
		state.user = user.username;
		state.roles = user.roles;
		state.permissions = user.permission;
		state.errors = {};
		JwtService.saveToken(user.jwt);
		JwtService.saveRoles(user.roles);
		JwtService.savePermissions(user.permission);
		ApiService.setHeader();
	},
	[PURGE_AUTH](state) {
		state.isAuthenticated = false;
		state.user = {};
		state.errors = {};
		state.permissions = [];
		state.roles = [];
		JwtService.destroyToken();
		JwtService.destroyRoles();
		JwtService.destroyPermissions();
		ApiService.removeHeader();
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};
