import { IGetProductListParams } from '../../product/types/interfaces.ts';

const IS_PROMO = 'isPromo';
const CATEGORY_ID = 'categoryId';
const PRICE = 'price';
const STRING = 'string';
const BOOLEAN = 'boolean';

function prepareFilterQuery(filters: IGetProductListParams['filters']) {
	if (!filters || !Object.values(filters).filter(Boolean).length)
		return `/${import.meta.env.VITE_PROJECT_KEY}/product-projections/search`;

	const queries = Object.entries(filters)
		.map(([name, value]) => {
			if (name === IS_PROMO) {
				return value ? `variants.prices.discounted:exists` : null;
			}

			if (name === CATEGORY_ID) {
				return value ? `categories.id:"${value}"` : null;
			}

			if (name === PRICE) {
				const pennyPrice = value * 100;
				return value ? `variants.price.centAmount:range (0 to ${pennyPrice})` : null;
			}

			if (typeof value === STRING) {
				return value ? `variants.attributes.${name}:range (0 to ${value})` : null;
			}

			if (typeof value === BOOLEAN) {
				return value ? `variants.attributes.${name}:"${value}"` : null;
			}

			return null;
		})
		.filter(Boolean)
		.join('&filter=');

	return `/${import.meta.env.VITE_PROJECT_KEY}/product-projections/search?filter=${queries}`;
}

export default prepareFilterQuery;
