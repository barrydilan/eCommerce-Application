import { CookieTuple } from '../../types';

/**
 * Saving the data in the cookies
 *
 * @param {CookieTuple[]} cookies - array of tuples
 * @return {void} - This method does not return a value
 *
 * [value, name, expires] - accepted tuple
 */
function setCookie(...cookies: CookieTuple[]) {
	const expireDate = new Date();

	cookies.forEach(([value, name, expires]) => {
		const expiresMilliseconds = expires * 1000;
		expireDate.setTime(expireDate.getTime() + expiresMilliseconds);

		document.cookie = `${name}=${value}; expires=${expireDate}; path=/; secure`;
	});
}

export default setCookie;
