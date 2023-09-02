export type ProductAttribute = Readonly<{
	name: string;
	value: string | number;
}>;

export type ProductPrice = Readonly<{
	value: {
		type: string;
		fractionDigits: number;
		centAmount: number;
		currencyCode: string;
	};
	id: string;
}>;

export type ProductImage = Readonly<{
	dimensions: {
		h: number;
		w: number;
	};
	url: string;
}>;

export type ProductResult = Readonly<{
	id: string;
	masterData: {
		current: {
			name: {
				de: string;
				en: string;
				uk: string;
			};
			masterVariant: {
				id: number;
				attributes: ProductAttribute[];
				images: ProductImage[];
				prices: ProductPrice[];
			};
		};
	};
}>;

export type ProductResponse = Readonly<{
	limit: number;
	count: number;
	total: number;
	results: ProductResult[];
}>;
