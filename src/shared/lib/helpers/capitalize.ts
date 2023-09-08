/**
 * Converts the first character of a string to uppercase.
 * @param {string} str - The input string.
 * @return {string} The input string with the first character capitalized.
 */
function capitalize(str: string) {
	return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export default capitalize;
