/**
 * Retrieves the cookie from the storage.
 *
 * @param {...string} names - The names of the cookies to retrieve.
 * @returns {(string | undefined)[]} The array of cookie value, or undefined if not found.
 */
function getCookie(...names: string[]) {
	const { cookie } = document;

	return names.map((name) => {
		return cookie
			.split('; ')
			.find((row) => row.startsWith(name))
			?.split('=')
			.at(1);
	});
}

export default getCookie;
