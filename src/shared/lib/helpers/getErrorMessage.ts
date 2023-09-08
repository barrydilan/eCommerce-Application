import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

/**
 * Returns the error message from the fetchBaseQueryError object, if available.
 *
 * @param {unknown} fetchBaseQueryError - The error object to extract the error message from.
 * @return {string} The error message.
 */
function getErrorMessage(fetchBaseQueryError: unknown) {
	const errData = (fetchBaseQueryError as FetchBaseQueryError)?.data;

	let errorMessage = '';

	if (errData instanceof Object && 'message' in errData) {
		errorMessage = errData.message as string;
	}

	return errorMessage;
}

export default getErrorMessage;
