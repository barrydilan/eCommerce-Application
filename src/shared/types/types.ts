import { ISignUpAddress } from './interfaces.ts';
import { ProductAttribute, ProductImage, ProductPrice } from '../../entities/product/types/types.ts';

export type CookieTuple = [string, string, number];
export type SignUpAddresses = [ISignUpAddress, ISignUpAddress] | [ISignUpAddress];

export type ProductResult = Readonly<{
	id: string;
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
}>;

export type IAuthResponse = Readonly<{
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
}>;

export type LineItem = Readonly<{
	id: string;
	productId: string;
	name: {
		en: string;
	};
	price: ProductPrice;
	quantity: number;
}>;

export type CartResponse = Readonly<{
	type: 'Cart';
	id: string;
	customerId: string;
	version: number;
	createdBy: {
		anonymousId: string;
	};
	lineItems: LineItem[];
	cartState: 'Active';
	totalPrice: {
		type: string;
		currencyCode: string;
		centAmount: number;
	};
	shippingMode: string;
	shipping: [];
	customLineItems: [];
	discountCodes: [];
	directDiscounts: [];
}>;

export type CreateCartResponse = Readonly<{
	data: CartResponse;
}>;
