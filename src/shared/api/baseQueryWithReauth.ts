import { BaseQueryFn, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import authQuery from './authQuery.ts';
import baseQuery from './baseQuery.ts';
import { userSlice } from '../../entities/user';
import { CartResponse, ErrorCodeStatus, IAuthResponse } from '../types';

const mutex = new Mutex();
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions,
) => {
	await mutex.waitForUnlock();

	const { loggedOut, updateAccessToken } = userSlice.actions;
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === ErrorCodeStatus.UNAUTHORIZED) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResultAnonToken = await authQuery(
					{
						url: `/oauth/${import.meta.env.VITE_PROJECT_KEY}/anonymous/token`,
						method: 'POST',
						params: {
							grant_type: 'client_credentials',
							scope: import.meta.env.VITE_DEFAULT_CUSTOMER_SCOPE,
						},
					},
					api,
					extraOptions,
				);

				if (
					refreshResultAnonToken.data &&
					typeof refreshResultAnonToken.data === 'object' &&
					'access_token' in refreshResultAnonToken.data &&
					'refresh_token' in refreshResultAnonToken.data
				) {
					const refreshResultCart = await fetchBaseQuery({
						baseUrl: import.meta.env.VITE_API_HOST_URL,
						prepareHeaders: (headers) => {
							headers.set('Authorization', `Bearer ${(refreshResultAnonToken.data as IAuthResponse).access_token}`);
						},
					})(
						{
							url: `/${import.meta.env.VITE_PROJECT_KEY}/carts`,
							method: 'POST',
							body: {
								currency: 'USD',
							},
						},
						api,
						extraOptions,
					);

					if (!refreshResultCart || !refreshResultCart.data) throw new Error('Cart cannot created!');

					api.dispatch(
						updateAccessToken({
							accessToken: refreshResultAnonToken.data.access_token as string,
							refreshToken: refreshResultAnonToken.data.refresh_token as string,
							cartId: (refreshResultCart.data as CartResponse).id as string,
						}),
					);
					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(loggedOut());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}

	return result;
};

export default baseQueryWithReauth;
