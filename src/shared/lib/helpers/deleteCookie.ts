/**
 * Clears a specific cookie on the page.
 *
 * @param {string[]} names - The name of the cookie to be cleared. Can take multiple cookie names.
 * @returns {void}
 */
function deleteCookie(...names: string[]) {
	names.forEach((name) => {
		document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
	});
}

export default deleteCookie;
