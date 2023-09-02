import { ProductSortingFields, ProductSortOrders } from './enums.ts';

interface IGetProductListParams {
	limit: number;
	sort: {
		field: ProductSortingFields;
		order: ProductSortOrders;
	};
}

export default IGetProductListParams;
