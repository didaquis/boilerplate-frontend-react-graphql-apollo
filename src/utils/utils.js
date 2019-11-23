const regexEmail = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);

const regexUserName = new RegExp(/^[A-Za-z0-9.\-_*/|]{8,}$/);

const regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!*^?+-_@#$%&]{8,}$/);

/**
 * Validate the data of the register form
 * @param  {string} email
 * @param  {string} password
 * @param  {string} repeatPassword
 * @return {Boolean}                - True means data is valid
 */
const validateRegisterForm = (email, password, repeatPassword) => {
	let dataIsValid = true;

	if (!email || !password || !repeatPassword) {
		dataIsValid = false;
	}

	if (password !== repeatPassword) {
		dataIsValid = false;
	}

	if (!regexEmail.test(email)) {
		dataIsValid = false;
	}

	if (!regexPassword.test(password)) {
		dataIsValid = false;
	}
	return dataIsValid;
}

/**
 * Convert an Unix timestamp in to human readable datetime
 * @param  {String|Number} timestamp
 * @return {String}
 */
function parseUnixTimestamp(timestamp) {
	timestamp = parseInt(timestamp)
	const d = new Date(timestamp);

	let month = `${(d.getMonth() + 1)}`;
	let day = `${d.getDate()}`;
	const year = d.getFullYear();
	let hour = `${d.getHours()}`;
	let minute = `${d.getMinutes()}`;

	if (month.length < 2) month = `0${month}`;
	if (day.length < 2) day = `0${day}`;
	if (hour.length < 2) hour = `0${hour}`;
	if (minute.length < 2) minute = `0${minute}`;

	const date = [year, month, day].join('-');
	const time = [hour, minute].join(':');

	return `${date} ${time}`;
}

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
			return true
		}
		if (value === 'false') {
			return false
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
	regexEmail,
	regexUserName,
	regexPassword,
	validateRegisterForm,
	parseUnixTimestamp,
	saveSession,
	recoverSession,
	deleteSession,
	storeUserDataOnSessionStorage,
	recoverUserDataFromSessionStorage,
	deleteUserDataFromSessionStorage
};