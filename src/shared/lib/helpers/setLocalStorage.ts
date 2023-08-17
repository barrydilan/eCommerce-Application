/**
 * Sets the value of an item in the browser's localStorage.
 *
 * @param {string} key - The key of the item.
 * @param {*} data - The data to be stored. It can be any type.
 * @return {void}
 */
function setLocalStorage<TData>(key: string, data: TData) {
	const saveData = typeof data === 'string' ? data : JSON.stringify(data);
	localStorage.setItem(key, saveData);
}

export default setLocalStorage;
