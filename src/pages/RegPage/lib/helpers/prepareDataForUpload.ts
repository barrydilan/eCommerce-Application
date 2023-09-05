import { ISignUpParams } from '../../../../shared/types';
import { IFormData } from '../../types';
import { FIRST_ADDRESS, SECOND_ADDRESS } from '../const';

/**
 * Prepares the data for upload.
 *
 * @param {IFormData} formData - The form data to be prepared for upload.
 * @return {ISignUpParams}
 */
function prepareDataForUpload({
	email,
	password,
	firstName,
	lastName,
	dateOfBirth,
	billSetDefault,
	shipSetDefault,
	addresses,
	sameBillShip,
}: IFormData): ISignUpParams {
	const defaultBillingAddress = billSetDefault ? FIRST_ADDRESS : undefined;
	let defaultShippingAddress = shipSetDefault ? FIRST_ADDRESS : undefined;

	const billingAddresses = [FIRST_ADDRESS];
	const shippingAddresses = sameBillShip ? [FIRST_ADDRESS] : [SECOND_ADDRESS];

	if (!sameBillShip && shipSetDefault) {
		defaultShippingAddress = SECOND_ADDRESS;
	}

	return {
		email,
		password,
		firstName,
		lastName,
		dateOfBirth,
		addresses: sameBillShip ? [addresses[FIRST_ADDRESS]] : addresses,
		billingAddresses,
		shippingAddresses,
		defaultBillingAddress,
		defaultShippingAddress,
	};
}

export default prepareDataForUpload;
