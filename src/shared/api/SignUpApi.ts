import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { API_HOST_URL, PROJECT_KEY } from '../model';
import { BEARER } from '../model/constants.ts';

interface ISignUpAddress {
	streetName: string;
	city: string;
	postalCode: string;
	country: string;
}

interface ISignUpParams {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	addresses: ISignUpAddress[];
	billingAddresses: number[];
	shippingAddresses: number[];
	defaultShippingAddress?: number;
	defaultBillingAddress?: number;
}

interface ISignUpResponse {
	customer: {
		addresses: string[];
		email: string;
		firstName: string;
		id: string;
		isEmailVerified: boolean;
		lastName: string;
		password: string;
		version: number;
		createdAt: string;
		lastModifiedAt: string;
		authenticationMode: string;
	};
}

export const authApi = createApi({
	reducerPath: 'productAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: API_HOST_URL,
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Bearer ${BEARER}`);
		},
	}),
	endpoints: (build) => ({
		signUp: build.mutation<ISignUpResponse, ISignUpParams>({
			query: (signUpData) => ({
				url: `/${PROJECT_KEY}/me/signup`,
				method: 'POST',
				body: JSON.stringify(signUpData),
			}),
		}),
	}),
});

export const { useSignUpMutation } = authApi;
