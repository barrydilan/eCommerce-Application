import UserUpdateActions from './enums.ts';

interface IAddress {
	country: string;
	city: string;
	streetName: string;
	postalCode: string;
}

export interface IAction {
	action: UserUpdateActions;
	addressId?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	dateOfBirth?: string;
	address?: IAddress | IAddress[];
}

export interface IUpdateUserDataParams {
	version: number;
	actions: IAction[];
}

export interface IUpdateUserPassword extends Pick<IUpdateUserDataParams, 'version'> {
	currentPassword: string;
	newPassword: string;
}

export interface IUpdateUserAddressParams {
	body: IUpdateUserDataParams;
	id: string;
}
