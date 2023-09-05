export type AddressObj = {
	id?: string;
	country: string;
	city: string;
	streetName: string;
	postalCode: string;
};

export type UserData = {
	id: string | undefined;
	email: string | undefined;
	firstName: string | undefined;
	lastName: string | undefined;
	dateOfBirth: string | undefined;
	version: number | undefined;
	addresses: AddressObj[] | undefined;
	defaultBillingAddressId: string | undefined;
	defaultShippingAddressId: string | undefined;
};
