/**
 * Finds the first occurrence of the search value in the given string and returns it.
 * If no match is found, an empty string is returned.
 * The search is case-insensitive.
 *
 * @param {string} str - The string to search in.
 * @param {string} searchValue - The value to search for in the string.
 * @return {string} The first occurrence of the search value in the string, or an empty string if no match is found.
 */
function findMatch(str: string, searchValue: string): string {
	return str.toLowerCase().match(searchValue.toLowerCase())?.[0] ?? '';
}

export default findMatch;
