/**
 * Get full name by concatenating the first name and the last name.
 *
 * @param {string} firstName - The first name.
 * @param {string} lastName - The last name.
 * @return {string} The full name.
 */
function getFullName(firstName: string = '', lastName: string = '') {
	return `${firstName} ${lastName}`;
}

export default getFullName;
