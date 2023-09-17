/**
 * Pads a number with a leading zero if it's a single digit number.
 *
 * @param {number} num - The number to pad with zero.
 * @return {string} - The padded number as a string.
 */
function padZero(num: number) {
	return num.toString().padStart(2, '0');
}

export default padZero;
