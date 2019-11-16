const regexNombreUsuario = new RegExp(/^[A-Za-z0-9.\-_*/|]{8,}$/);

const regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!*^?+-_@#$%&]{8,}$/);

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

module.exports = {
	regexNombreUsuario,
	regexPassword,
	saveSession,
	recoverSession,
	deleteSession
};