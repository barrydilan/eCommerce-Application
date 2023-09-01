import { ISignUpAddress } from './interfaces.ts';

export type CookieTuple = [string, string, number];
export type SignUpAddresses = [ISignUpAddress, ISignUpAddress] | [ISignUpAddress];
export type RecursivePartial<TObj> = {
	[TKey in keyof TObj]?: RecursivePartial<TObj[TKey]>;
};
