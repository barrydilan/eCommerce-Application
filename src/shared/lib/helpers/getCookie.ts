/**
 * Retrieves the cookie from the storage.
 *
 * @returns {string | null} The cookie value, or null if not found.
 */
function getCookie(name: string) {
	const { cookie } = document;

	return cookie
		.split('; ')
		.find((row) => row.startsWith(name))
		?.split('=')
		.at(1);
}

export default getCookie;
