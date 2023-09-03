export type AddressObj = {
	country: string;
	city: string;
	street: string;
	postalCode: string;
};

export type EditedAddressObj = { address: AddressObj; index?: number };
