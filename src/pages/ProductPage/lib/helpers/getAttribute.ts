import { ProductAttribute } from '../../../../entities/product';
import ProductAttributeNames from '../../../../entities/product/types/enums.ts';

/**
 * Returns the product attribute object with the specified name 'ingredients'.
 *
 * @param {ProductAttribute[]} attribute - An array of product attribute objects.
 * @param {string} name - An attributes name
 * @return {ProductAttribute['value']} - The product attribute object with name 'ingredients', or undefined if not found.
 */
function getAttribute(attribute: ProductAttribute[], name: ProductAttributeNames): ProductAttribute['value'] {
	return attribute.find((obj) => obj.name === name)?.value as ProductAttribute['value'];
}

export default getAttribute;
