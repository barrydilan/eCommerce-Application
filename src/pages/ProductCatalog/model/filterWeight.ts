import { ProductAttributeNames } from '../../../entities/product';
import { ProductResponse } from '../../../entities/product/types/types.ts';
import getAttribute from '../../ProductPage/lib/helpers/getAttribute.ts';

/**
 * Filters the raw product list data based on the maximum weight.
 *
 * @param {ProductResponse} rawProductListData - The raw product list data to be filtered.
 * @param {number} maxWeight - The maximum weight to filter the products.
 * @return {ProductResponse[]} The filtered product list based on the maximum weight.
 */
function filterWeight(rawProductListData: ProductResponse, maxWeight: number) {
	return rawProductListData.results.filter(
		(product) => Number(getAttribute(product.masterVariant.attributes, ProductAttributeNames.WEIGHT)) < maxWeight,
	);
}

export default filterWeight;
