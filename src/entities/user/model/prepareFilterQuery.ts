import { IGetProductListParams } from '../../product/types/interfaces.ts';

function prepareFilterQuery(filters: IGetProductListParams['filters']) {
	if (!filters || !Object.values(filters).filter(Boolean).length)
		return `/${import.meta.env.VITE_PROJECT_KEY}/product-projections/search`;

	const queries = Object.entries(filters)
		.map(([name, value]) => {
			if (name === 'isPromo') {
				return value ? `variants.attributes.discountPrice:exists` : null;
			}

			if (name === 'categoryId') {
				return value ? `categories.id:"${value}"` : null;
			}

			if (name === 'price') {
				const dollarPrice = value * 100;
				return value ? `variants.price.centAmount:range (0 to ${dollarPrice})` : null;
			}

			if (typeof value === 'string') {
				return value ? `variants.attributes.${name}:range (0 to ${value})` : null;
			}

			if (typeof value === 'boolean') {
				return value ? `variants.attributes.${name}:"${value}"` : null;
			}

			return null;
		})
		.filter(Boolean)
		.join('&filter=');

	return `/${import.meta.env.VITE_PROJECT_KEY}/product-projections/search?filter=${queries}`;
}

export default prepareFilterQuery;
