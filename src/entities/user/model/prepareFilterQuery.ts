import { PROJECT_KEY } from '../../../shared/const';
import { IGetProductListParams } from '../../product/types/interfaces.ts';

function prepareFilterQuery(filters: IGetProductListParams['filters']) {
	if (!Object.values(filters).filter(Boolean).length) return `/${PROJECT_KEY}/product-projections/search`;

	const queries = Object.entries(filters)
		.map(([name, value]) => {
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

	return `/${PROJECT_KEY}/product-projections/search?filter=${queries}`;
}

export default prepareFilterQuery;
