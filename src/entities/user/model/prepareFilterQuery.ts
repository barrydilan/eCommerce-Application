import { PROJECT_KEY } from '../../../shared/const';
import IGetProductListParams from '../../product/types/interfaces.ts';

function prepareFilterQuery(filter: IGetProductListParams['filter']) {
	const queries = Object.entries(filter)
		.map(([name, value]) => {
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

	const url = Object.values(filter).filter(Boolean).length
		? `/${PROJECT_KEY}/product-projections/search?filter=${queries}`
		: `/${PROJECT_KEY}/product-projections/search`;

	return url;
}

export default prepareFilterQuery;
