import { createApi } from '@reduxjs/toolkit/dist/query/react';

import bearerBaseQuery from '../../../shared/api/bearerBaseQuery.ts';
import { PROJECT_KEY } from '../../../shared/const';

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

type ISignUpResponse = Readonly<{
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
}>;

export const signUpApi = createApi({
	reducerPath: 'productAPI',
	baseQuery: bearerBaseQuery,
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

export const { useSignUpMutation } = signUpApi;
