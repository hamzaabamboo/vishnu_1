import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { TokenStorage } from '@/common/jwt.service';
import { API_URL } from '@/common/config';
import { MealGroupStorage } from './jwt.service';

const ApiService = {
	init() {
		Vue.use(VueAxios, axios);
		Vue.axios.defaults.baseURL = API_URL;
		Vue.axios.defaults.headers.common['Cache-Control'] = 'no-cache';
		if (TokenStorage.get) this.setHeader();
	},

	setHeader() {
		Vue.axios.defaults.headers.common['jwt'] = `${TokenStorage.get}`;
	},

	removeHeader() {
		Vue.axios.defaults.headers.common['jwt'] = '';
	},

	patch(resource, params) {
		return Vue.axios.patch(resource, params);
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
		return ApiService.delete(`/jwts/${TokenStorage.get}`);
	},
	ping: () => {
		return ApiService.get('/jwts/ping');
	}
};
export const FreshyService = {
	getFreshies: () => {
		return new Promise(resolve =>
			ApiService.get('/freshmen').then(res => resolve(res.data))
		);
	},
	setFreshyStatus: (id, status) => {
		return ApiService.patch(`/freshmen/${id}/status`, status);
  },
  getAllFreshyStatus: () => {
		return ApiService.get('/freshmen/all/status');
  }
};

export const MessageService = {
	getMessages: () => {
		return new Promise(resolve =>
			ApiService.get('/messages').then(res => resolve(res.data.data))
		);
	},
	postMessage: message => ApiService.post('/messages', message)
};
export const StaffService = {
	setStaffMeals: data =>
		ApiService.put(`/staff/${MealGroupStorage.get}/meals`, data),
	getStaffMeals: () => {
		return new Promise(resolve =>
			ApiService.get(`/staff/${MealGroupStorage.get}/meals`).then(res =>
				resolve(res.data[MealGroupStorage.get])
			)
		);
	}
};

export const MealService = {
	getMeals: (n = 1) => ApiService.get(`/meals/${n}`),
	getAllStaffMeals: () => ApiService.get('/staff/all/meals')
};
