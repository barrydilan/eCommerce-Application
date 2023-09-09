/**
 * Calculates the percentage discount between two prices.
 *
 * @param {number} oldPrice - The original price.
 * @param {number} newPrice - The new price.
 * @return {number} The percentage discount between the two prices.
 */
function calcPriceDiscountPercentage(oldPrice: number, newPrice: number) {
	return 100 - Math.floor((newPrice / oldPrice) * 100);
}

export default calcPriceDiscountPercentage;
