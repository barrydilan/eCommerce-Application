import { AddDiscountCodeRequestBody, AddLineItemRequestBody, RemoveLineItemRequestBody } from './types.ts';

export interface ICreateCartParams {
	currency: 'USD' | 'UAH' | 'EUR';
}

export interface IUpdateCartParams {
	cartId: string;
	body: AddLineItemRequestBody | RemoveLineItemRequestBody | AddDiscountCodeRequestBody;
}

export interface IDeleteCartParams {
	cartId: string;
	version: number;
}
