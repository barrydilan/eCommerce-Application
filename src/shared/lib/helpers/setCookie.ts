/**
 * Saving the data in the cookies
 *
 * @param {string} value - The data that is needed to be saved in the cookies
 * @param {string} name - The key that is used to access the data in the future
 * @param {number} expires - The expiration date/time for the cookie (in seconds)
 * @return {void} - This method does not return a value
 */
function setCookie(value: string, name: string, expires: number) {
	const expireDate = new Date();
	const expiresMilliseconds = expires * 1000;

	expireDate.setTime(expireDate.getTime() + expiresMilliseconds);

	document.cookie = `${name}=${value}; expires=${expireDate}; path=/; Secure`;
}

export default setCookie;
