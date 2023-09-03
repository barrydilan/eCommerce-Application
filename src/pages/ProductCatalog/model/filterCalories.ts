import { ProductAttributeNames } from '../../../entities/product';
import { ProductResponse } from '../../../entities/product/types/types.ts';
import getAttribute from '../../ProductPage/lib/helpers/getAttribute.ts';

/**
 * Filters the product list based on maximum calories.
 *
 * @param {ProductResponse} rawProductListData - The raw product list data.
 * @param {number} maxCalories - The maximum number of calories.
 * @returns {ProductResponse[]} - The filtered product list.
 */
function filterCalories(rawProductListData: ProductResponse, maxCalories: number) {
	return rawProductListData.results.filter(
		(product) => Number(getAttribute(product.masterVariant.attributes, ProductAttributeNames.CALORIES)) < maxCalories,
	);
}

export default filterCalories;
