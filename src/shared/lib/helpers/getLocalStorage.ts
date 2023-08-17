/**
 * Get the value from local storage for the given key.
 *
 * @param {string} key - The key to retrieve the value from local storage.
 * @return {*} - The parsed value from the local storage for the given key.
 */
function getLocalStorage<TReturnValue>(key: string): TReturnValue | never {
	const data = localStorage.getItem(key);

	if (data) return JSON.parse(data);

	throw new Error('Local storage item does not exist!');
}

export default getLocalStorage;
