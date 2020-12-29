/**
 * Regular expression for email
 * @type {RegExp}
 * @default
 */
const regexEmail = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);

/**
 * Regular expression for password
 * @type {RegExp}
 * @default
 */
const regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!*^?+-_@#$%&]{8,}$/);

/**
 * Validate the login form data. This is useful for reduce traffic to backend
 * @param  {string} email
 * @param  {string} password
 * @return {Boolean}                - True means data is valid
 */
const validateLoginForm = (email, password) => {
	let dataIsValid = true;

	if (!email || !password) {
		dataIsValid = false;
	}

	if (!regexEmail.test(email)) {
		dataIsValid = false;
	}

	if (!regexPassword.test(password)) {
		dataIsValid = false;
	}
	return dataIsValid;
};

/**
 * Validate the registration form data
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
};

module.exports = {
	regexEmail,
	regexPassword,
	validateLoginForm,
	validateRegisterForm
};