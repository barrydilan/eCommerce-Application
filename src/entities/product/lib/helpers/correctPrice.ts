/**
 * Corrects the price by rounding it to 2 decimal places and replacing the decimal separator.
 *
 * @param {number} price - The price to be corrected.
 * @returns {string} The corrected price as a string.
 */
function correctPrice(price: number) {
	return (price / 100).toFixed(2).toString().replace('.', ',');
}

export default correctPrice;
