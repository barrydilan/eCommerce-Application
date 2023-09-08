import calcPriceDiscountPercentage from './lib/helpers/calcPriceDiscountPercentage.ts';
import correctPrice from './lib/helpers/correctPrice.ts';

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
export { correctPrice, calcPriceDiscountPercentage };
export { ProductAttributeNames } from './types/enums.ts';
