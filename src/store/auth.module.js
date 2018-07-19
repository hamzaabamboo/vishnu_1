import {
	TokenStorage,
	RoleStorage,
	PermissionStorage,
	UsernameStorage
} from '@/common/jwt.service';
import { LOGIN, LOGOUT, ERROR } from './actions.type';
import { SET_AUTH, PURGE_AUTH } from './mutations.type';
import { AuthService } from '@/common/api.service';
import ApiService from '../common/api.service';

const state = {
	user: UsernameStorage.get || '',
	isAuthenticated: !!TokenStorage.get,
	roles: RoleStorage.get || [],
	permissions: PermissionStorage.get || []
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
				.catch(error => {
					error && context.dispatch(ERROR, error);
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
		TokenStorage.save(user.jwt);
		RoleStorage.save(user.roles);
		PermissionStorage.save(user.permission);
		UsernameStorage.save(user.username);
		ApiService.setHeader();
	},
	[PURGE_AUTH](state) {
		state.isAuthenticated = false;
		state.user = {};
		state.errors = {};
		state.permissions = [];
		state.roles = [];
		TokenStorage.destroy();
		RoleStorage.destroy();
		PermissionStorage.destroy();
		UsernameStorage.destroy();
		ApiService.removeHeader();
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};
