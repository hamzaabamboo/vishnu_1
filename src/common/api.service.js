import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/common/jwt.service';
import store from '@/store';
import { API_URL } from '@/common/config';
import { ERROR } from '../store/actions.type';

const ApiService = {
	init() {
		Vue.use(VueAxios, axios);
		Vue.axios.defaults.baseURL = API_URL;
		Vue.axios.defaults.headers.common['Cache-Control'] = 'no-cache';
		if (JwtService.hasToken()) this.setHeader();
	},

	setHeader() {
		Vue.axios.defaults.headers.common['jwt'] = `${JwtService.getToken()}`;
	},

	query(resource, params) {
		return Vue.axios.get(resource, params);
	},

	get(resource, slug = '') {
		return Vue.axios.get(`${resource}/${slug}`);
	},

	post(resource, params) {
		return Vue.axios.post(`${resource}`, params);
	},

	update(resource, slug, params) {
		return Vue.axios.put(`${resource}/${slug}`, params);
	},

	put(resource, params) {
		return Vue.axios.put(`${resource}`, params);
	},

	delete(resource) {
		return Vue.axios.delete(resource);
	}
};

export default ApiService;

export const AuthService = {
	login: credentials => {
		return ApiService.post('/jwts', credentials);
	},
	logout: () => {
		return ApiService.delete(`/jwts/${JwtService.getToken()}`);
	},
	ping: () => {
		return ApiService.get('/jwts/ping');
	}
};
export const FreshyService = {
	getFreshies: () => {
		return ApiService.get('/freshmen');
	},
	setFreshyStatus: (id, status) => {
		return ApiService.patch(`/freshmen/${id}`, status);
	},
	query: id => {
		return require('../other/freshy_information.json')[id];
	},
	getInfo: () => {
		return require('../other/freshy_information.json');
	},

	getStatus: () => {
		return require('../other/status.json');
	}
};

export const MessageService = {
	getMessages: () => {
		return new Promise(resolve =>
			ApiService.get('/messages').then(res => resolve(res.data.data))
		);
	},
	postMessage: message => {
		return ApiService.post('/messages', message);
	}
};
export const StaffService = {
	getStaff: () => {
		return require('../other/status.json').staff;
	},
	setStaffCount: ({ male, female }) => {},
	setSpecialMealCount: count => {}
};
