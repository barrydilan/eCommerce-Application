export interface ILoginUserParams {
	password: string;
	email: string;
	scope?: string;
}

export interface IUserAddress {
	id: string;
	streetName: string;
	city: string;
	country: string;
}

export interface IUser {
	id: string;
	version: number;
	versionModifiedAt: string;
	lastMessageSequenceNumber: number;
	createdAt: string;
	lastModifiedAt: string;
	lastModifiedBy: {
		isPlatformClient: true;
		user: {
			typeId: string;
			id: string;
		};
	};
	createdBy: {
		isPlatformClient: true;
		user: {
			typeId: string;
			id: string;
		};
	};
	email: string;
	firstName: string;
	lastName: string;
	middleName: string;
	title: string;
	salutation: string;
	dateOfBirth: string;
	password: string;
	addresses: IUserAddress[];
	defaultShippingAddressId: string;
	defaultBillingAddressId: string;
	shippingAddressIds: string;
	billingAddressIds: string;
	isEmailVerified: false;
	stores: [];
	authenticationMode: string;
}

export type ILoginUserDataResponse = Readonly<{
	customer: IUser;
}>;
