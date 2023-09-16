import { ProductSortingFields, ProductSortOrders } from './enums.ts';

export interface IGetProductAttributes {
	isVegan: boolean;
	isSpicy: boolean;
	isPromo: boolean;
	price: string;
	calories: string;
	weight: string;
	categoryId?: string;
}

export interface IGetProductListParams {
	limit: number;
	offset?: number;
	sort?: {
		field: ProductSortingFields;
		order: ProductSortOrders;
	};
	filters?: IGetProductAttributes;
	searchQuery?: string | null;
	withTotal?: boolean;
}
