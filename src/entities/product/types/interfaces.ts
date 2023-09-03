import { ProductSortingFields, ProductSortOrders } from './enums.ts';

export interface IGetProductAttributes {
	isVegan: boolean;
	isSpicy: boolean;
	isPromo: boolean;
	price: string;
	calories: string;
	weight: string;
}

interface IGetProductListParams {
	limit: number;
	sort: {
		field: ProductSortingFields;
		order: ProductSortOrders;
	};
	filter: IGetProductAttributes;
}

export default IGetProductListParams;
