import { ISignUpAddress } from './interfaces.ts';

export type CookieTuple = [string, string, number];
export type SignUpAddresses = [ISignUpAddress, ISignUpAddress] | [ISignUpAddress];
