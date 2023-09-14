import rootApi from '../../../shared/api/rootApi.ts';
import { ISignUpParams } from '../../../shared/types';

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

export const signUpApi = rootApi.injectEndpoints({
	endpoints: (build) => ({
		signUp: build.mutation<ISignUpResponse, ISignUpParams>({
			query: (signUpData) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/me/signup`,
				method: 'POST',
				body: JSON.stringify(signUpData),
			}),
		}),
	}),
});

export const { useSignUpMutation } = signUpApi;
