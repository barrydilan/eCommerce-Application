import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { type FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import authQuery from './authQuery.ts';
import baseQuery from './baseQuery.ts';
import { ErrorCodeStatus } from '../types';

const mutex = new Mutex();
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions,
) => {
	await mutex.waitForUnlock();

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
					api.dispatch({
						type: 'user/updateAccessToken',
						payload: {
							accessToken: refreshResultAnonToken.data.access_token as string,
							refreshToken: refreshResultAnonToken.data.refresh_token as string,
						},
					});
					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch({ type: 'user/loggedOut' });
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
