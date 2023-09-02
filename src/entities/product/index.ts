import calcPriceDiscountPercentage from './lib/helpers/calcPriceDiscountPercentage.ts';
import correctPrice from './lib/helpers/correctPrice.ts';

export type { ProductAttribute } from './types/types.ts';
export { productApi, useGetProductListQuery, useGetProductQuery } from './api/productApi.ts';
export { correctPrice, calcPriceDiscountPercentage };
export { ProductAttributeNames } from './types/enums.ts';
