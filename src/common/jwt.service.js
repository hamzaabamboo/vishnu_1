const ID_TOKEN_KEY = 'token';
const ROLE = 'role';
const PERMISSION = 'permisisons';
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
	getRoles() {
		return (
			window.localStorage.getItem(ROLE) &&
			JSON.parse(window.localStorage.getItem(ROLE))
		);
	},
	destroyRoles() {
		window.localStorage.removeItem(ROLE);
	},

	savePermissions(permissions) {
		window.localStorage.setItem(PERMISSION, JSON.stringify(permissions));
	},
	getPermissions() {
		return (
			window.localStorage.getItem(PERMISSION) &&
			JSON.parse(window.localStorage.getItem(PERMISSION))
		);
	},
	destroyPermissions() {
		window.localStorage.removeItem(PERMISSION);
	}
};
