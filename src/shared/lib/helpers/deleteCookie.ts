/**
 * Clears a specific cookie on the page.
 *
 * @param {string} name - The name of the cookie to be cleared.
 * @returns {void}
 */
function deleteCookie(name: string) {
	document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export default deleteCookie;
