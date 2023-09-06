import { ISignUpParams, SignUpAddresses } from '../../../shared/types';

export interface IFormData extends ISignUpParams {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	sameBillShip: boolean;
	billSetDefault: boolean;
	shipSetDefault: boolean;
	addresses: SignUpAddresses;
}
