import { rootApi } from '../../../shared/api';
import { ILoginUserDataResponse, ILoginUserParams, IUser } from '../../../shared/types';
import { IUpdateUserAddressParams, IUpdateUserDataParams, IUpdateUserPassword } from '../types/interfaces.ts';

export const userDataApi = rootApi.injectEndpoints({
	endpoints: (build) => ({
		loginUserData: build.mutation<ILoginUserDataResponse, ILoginUserParams>({
			query: (loginData) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/login`,
				method: 'POST',
				body: JSON.stringify(loginData),
			}),
		}),

		getUser: build.query<IUser, string>({
			query: (id) => ({
				url: `${import.meta.env.VITE_PROJECT_KEY}/customers/${id}`,
			}),
		}),

		deleteUserData: build.mutation<void, IUpdateUserDataParams>({
			query: (body) => ({
				url: `${import.meta.env.VITE_PROJECT_KEY}/me`,
				method: 'POST',
				body: JSON.stringify(body),
			}),
		}),

		updateUserData: build.mutation<void, IUpdateUserDataParams>({
			query: (body) => ({
				url: `${import.meta.env.VITE_PROJECT_KEY}/me`,
				method: 'POST',
				body: JSON.stringify(body),
			}),
		}),

		updateUserAddress: build.mutation<void, IUpdateUserAddressParams>({
			query: ({ body, id }) => ({
				url: `${import.meta.env.VITE_PROJECT_KEY}/customers/${id}`,
				method: 'POST',
				body: JSON.stringify(body),
			}),
		}),

		updateUserPassword: build.mutation<void, IUpdateUserPassword>({
			query: (body) => ({
				url: `${import.meta.env.VITE_PROJECT_KEY}/me/password`,
				method: 'POST',
				body: JSON.stringify(body),
			}),
		}),
	}),
});

export const {
	useLoginUserDataMutation,
	useGetUserQuery,
	useLazyGetUserQuery,
	useDeleteUserDataMutation,
	useUpdateUserDataMutation,
	useUpdateUserAddressMutation,
	useUpdateUserPasswordMutation,
} = userDataApi;
