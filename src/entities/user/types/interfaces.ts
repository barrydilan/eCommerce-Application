import UserUpdateActions from './enums.ts';

export interface IUserAction {
	action: UserUpdateActions;
	addressId?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	dateOfBirth?: string;
}

export interface IUpdateUserDataParams {
	version: number;
	actions: IUserAction[];
}
