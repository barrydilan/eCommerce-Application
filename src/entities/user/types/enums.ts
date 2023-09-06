enum UserUpdateActions {
	CHANGE_EMAIL = 'changeEmail',
	SET_FIRST_NAME = 'setFirstName',
	SET_LAST_NAME = 'setLastName',
	SET_BIRTH_DATE = 'setDateOfBirth',
	SET_DEFAULT_SHIPPING_ADDRESS = 'setDefaultShippingAddress',
	SET_DEFAULT_BILLING_ADDRESS = 'setDefaultBillingAddress',
	REMOVE_ADDRESS = 'removeAddress',
	CHANGE_ADDRESS = 'changeAddress',
	ADD_ADDRESS = 'addAddress',
}

export default UserUpdateActions;
