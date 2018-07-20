import {
	TokenStorage,
	RoleStorage,
	PermissionStorage,
	NameStorage
} from '@/common/jwt.service';
import { LOGIN, LOGOUT, ERROR } from './actions.type';
import { SET_AUTH, PURGE_AUTH } from './mutations.type';
import { AuthService } from '@/common/api.service';
import ApiService from '../common/api.service';
import { MealGroupStorage } from '../common/jwt.service';

const state = {
	user: NameStorage.get || '',
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
	[SET_AUTH](state, data) {
		const { name, roles, permission, meal_group, jwt } = data;
		state = {
			...state,
			isAuthenticated: true,
			user: name,
			roles,
			permissions: permission,
			meal_group,
			errors: {}
		};
		TokenStorage.save(jwt);
		RoleStorage.save(roles);
		PermissionStorage.save(permission);
		MealGroupStorage.save(meal_group);
		NameStorage.save(name);
		ApiService.setHeader();
	},
	[PURGE_AUTH](state) {
		state = {
			user: '',
			isAuthenticated: false,
			errors: {},
			permissions: [],
			roles: [],
			meal_group: []
		};
		const storages = [
			TokenStorage,
			RoleStorage,
			PermissionStorage,
			NameStorage
		];
		storages.forEach(storage => {
			storage.destroy();
		});
		ApiService.removeHeader();
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};
