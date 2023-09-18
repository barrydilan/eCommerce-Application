import calcPriceDiscountPercentage from './lib/helpers/calcPriceDiscountPercentage.ts';
import formatPrice from './lib/helpers/formatPrice.ts';
import pennieToMoney from './lib/helpers/pennieToMoney.ts';

export type { ProductAttribute } from './types/types.ts';
export type { IGetProductAttributes } from './types/interfaces.ts';
export {
	productApi,
	useGetProductListQuery,
	useLazyGetProductListQuery,
	useGetProductQuery,
	useGetCategoriesQuery,
	useGetCategoryQuery,
} from './api/productApi.ts';
export { formatPrice, calcPriceDiscountPercentage, pennieToMoney };
export { ProductAttributeNames } from './types/enums.ts';
