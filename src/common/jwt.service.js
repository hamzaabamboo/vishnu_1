const ID_TOKEN_KEY = 'token';
const ROLE = 'role';

export default {
	getToken() {
		return window.localStorage.getItem(ID_TOKEN_KEY);
	},

	saveToken(token) {
		window.localStorage.setItem(ID_TOKEN_KEY, token);
	},
	destroyToken() {
		window.localStorage.removeItem(ID_TOKEN_KEY);
	},
	hasToken() {
		return !!window.localStorage.getItem(ID_TOKEN_KEY);
	},
	saveRoles(roles) {
		window.localStorage.setItem(ROLE, JSON.stringify(roles));
	},
	getRoles(roles) {
		return (
			window.localStorage.getItem(ROLE) &&
			JSON.parse(window.localStorage.getItem(ROLE))
		);
	},
	destroyRoles() {
		window.localStorage.removeItem(ROLE);
	}
};
