import { ISignUpAddress } from './interfaces.ts';

export type CookieTuple = [string, string, number];
export type SignUpAddresses = [ISignUpAddress, ISignUpAddress] | [ISignUpAddress];
export type IAuthResponse = Readonly<{
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
}>;
export type CartResponse = Readonly<{
	type: 'Cart';
	id: string;
	version: number;
	createdBy: {
		anonymousId: string;
	};
	lineItems: {
		productId: string;
		lineItemId: string;
	}[];
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
