const ID_TOKEN_KEY = 'token';
const ROLES = 'roles';
const PERMISSION = 'permisisons';
const NAME = 'username';
const COLUMNS = 'columns';
const MEAL_GROUP = 'mealGroup';
class LocalStorageService {
	constructor(object, json = true) {
		this.object = object;
		this.json = json;
	}
	get get() {
		return this.json
			? window.localStorage.getItem(this.object) &&
					JSON.parse(window.localStorage.getItem(this.object))
			: window.localStorage.getItem(this.object);
	}

	save(value) {
		window.localStorage.setItem(
			this.object,
			this.json ? JSON.stringify(value) : value
		);
	}

	destroy() {
		window.localStorage.removeItem(this.object);
	}
}

export const TokenStorage = new LocalStorageService(ID_TOKEN_KEY, false);
export const PermissionStorage = new LocalStorageService(PERMISSION);
export const NameStorage = new LocalStorageService(NAME, false);
export const RoleStorage = new LocalStorageService(ROLES);
export const MealGroupStorage = new LocalStorageService(MEAL_GROUP, false);
export const ColumnsStorage = new LocalStorageService(COLUMNS);
