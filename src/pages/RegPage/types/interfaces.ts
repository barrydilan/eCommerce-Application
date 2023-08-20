import { ISignUpParams, SignUpAddresses } from '../../../shared/types';

export interface IFormData extends ISignUpParams {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	birthDate: string;
	sameBillShip: boolean;
	billSetDefault: boolean;
	shipSetDefault: boolean;
	addresses: SignUpAddresses;
}
