/**
 * Convert an Unix timestamp in to human readable datetime (local time zone)
 * @param  {string|number} timestamp
 * @return {string}
 */
const parseUnixTimestamp = (timestamp) => {
	timestamp = parseInt(timestamp);
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
};

module.exports = {
	parseUnixTimestamp
};