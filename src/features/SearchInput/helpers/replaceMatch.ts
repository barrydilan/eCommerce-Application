/**
 * Replaces all occurrences of the searchValue in the given string with an empty string.
 *
 * @param {string} str - The string to perform the replacement on.
 * @param {string} searchValue - The value to search for and replace.
 * @return {string} The modified string with all occurrences of searchValue removed.
 */
function replaceMatch(str: string, searchValue: string): string {
	return str.toLowerCase().replace(searchValue.toLowerCase(), '');
}

export default replaceMatch;
