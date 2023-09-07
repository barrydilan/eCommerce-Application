import { createApi } from '@reduxjs/toolkit/dist/query/react';

import baseQueryWithReauth from '../../../shared/api/baseQueryWithReauth.ts';
import { PROJECT_KEY } from '../../../shared/const';
import { ILoginUserDataResponse, ILoginUserParams, IUser } from '../../../shared/types';
import { IUpdateUserAddressParams, IUpdateUserDataParams, IUpdateUserPassword } from '../types/interfaces.ts';

export const userDataApi = createApi({
	reducerPath: 'userDataApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		loginUserData: build.mutation<ILoginUserDataResponse, ILoginUserParams>({
			query: (loginData) => ({
				url: `/${PROJECT_KEY}/login`,
				method: 'POST',
				body: JSON.stringify(loginData),
			}),
		}),

		getUser: build.query<IUser, string>({
			query: (id) => ({
				url: `${PROJECT_KEY}/customers/${id}`,
			}),
		}),

		deleteUserData: build.mutation<void, IUpdateUserDataParams>({
			query: (body) => ({
				url: `${PROJECT_KEY}/me`,
				method: 'POST',
				body: JSON.stringify(body),
			}),
		}),

		updateUserData: build.mutation<void, IUpdateUserDataParams>({
			query: (body) => ({
				url: `${PROJECT_KEY}/me`,
				method: 'POST',
				body: JSON.stringify(body),
			}),
		}),

		updateUserAddress: build.mutation<void, IUpdateUserAddressParams>({
			query: ({ body, id }) => ({
				url: `${PROJECT_KEY}/customers/${id}`,
				method: 'POST',
				body: JSON.stringify(body),
			}),
		}),

		updateUserPassword: build.mutation<void, IUpdateUserPassword>({
			query: (body) => ({
				url: `${PROJECT_KEY}/me/password`,
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
