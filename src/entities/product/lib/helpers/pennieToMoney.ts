/**
 * Converts the given amount of pennies to currency.
 *
 * @param {number} num - The amount of pennies to be converted.
 * @return {number} - The equivalent amount in currency.
 */
function pennieToMoney(num: number) {
	return Number((num / 100).toFixed(2));
}

export default pennieToMoney;
