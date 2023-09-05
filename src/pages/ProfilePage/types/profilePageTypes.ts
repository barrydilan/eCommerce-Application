export type AddressObj = {
	country: string;
	city: string;
	street: string;
	postalCode: string;
};

export type UserData = {
	id: string | undefined;
	email: string | undefined;
	firstName: string | undefined;
	lastName: string | undefined;
	dateOfBirth: string | undefined;
	version: number | undefined;
};

export type EditedAddressObj = { address: AddressObj; index?: number };
