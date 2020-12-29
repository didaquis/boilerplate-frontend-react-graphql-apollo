/**
 * Save data in Session Storage
 * @param {string} name - key for data
 * @param {string} data - data to store
 */
function saveSession(name, data) {
	sessionStorage.setItem(name, data);
}

/**
 * Recover data from Session Storage
 * @param {string} name - key for data to recover
 */
function recoverSession(name) {
	return sessionStorage.getItem(name);
}

/**
 * Delete all data in Session Storage
 */
function deleteSession() {
	sessionStorage.clear();
}

/**
 * Serialize and save user data in Session Storage
 * @param {string|number|Array|Object} data - data to store
 */
function storeUserDataOnSessionStorage(data) {
	const replacer = (key, value) => {
		if (typeof value === 'boolean' || typeof value === 'number') {
			return String(value);
		}
		return value;
	};
	sessionStorage.setItem('userData', JSON.stringify(data, replacer));
}

/**
 * Recover and unserialize user data from Session Storage
 * @return {Object}
 */
function recoverUserDataFromSessionStorage() {
	const reviver = (key, value) => {
		if (value === 'true') {
			return true;
		}
		if (value === 'false') {
			return false;
		}
		return value;
	};
	return JSON.parse(sessionStorage.getItem('userData'), reviver) || {};
}

/**
 * Delete user data in Session Storage
 */
function deleteUserDataFromSessionStorage() {
	sessionStorage.removeItem('userData');
}

module.exports = {
	saveSession,
	recoverSession,
	deleteSession,
	storeUserDataOnSessionStorage,
	recoverUserDataFromSessionStorage,
	deleteUserDataFromSessionStorage
};