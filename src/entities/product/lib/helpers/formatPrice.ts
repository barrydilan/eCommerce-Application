/**
 * Formats a given number as currency using the specified currency and locale.
 *
 * @param {number} num - The number to be formatted as currency.
 * @param {string} currency - The currency code to be used for formatting.
 * @param {string} locale - The locale code to be used for formatting.
 * @returns {string} The formatted number as currency.
 */

const US_LOCALE = 'en-US';

const formatPrice = (num: number, currency: string, locale: string = US_LOCALE) => {
	const numFormatOptions = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
	});

	return numFormatOptions.format(num);
};

export default formatPrice;
