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
	createdBy: {
		anonymousId: string;
	};
	lineItems: [];
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
