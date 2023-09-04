import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/dist/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import authQuery from './authQuery.ts';
import { userSlice } from '../../entities/user';
import { DEFAULT_CUSTOMER_SCOPE, PROJECT_KEY } from '../const';
import { ErrorCodeStatus } from '../types';

const mutex = new Mutex();
const authQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions,
) => {
	await mutex.waitForUnlock();

	const { loggedOut, updateAccessToken } = userSlice.actions;
	let result = await authQuery(args, api, extraOptions);

	if (result.error && result.error.status === ErrorCodeStatus.UNAUTHORIZED) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await authQuery(
					{
						url: `/oauth/${PROJECT_KEY}/anonymous/token`,
						method: 'POST',
						params: {
							grant_type: 'client_credentials',
							scope: DEFAULT_CUSTOMER_SCOPE,
						},
					},
					api,
					extraOptions,
				);

				if (
					refreshResult.data &&
					typeof refreshResult.data === 'object' &&
					'access_token' in refreshResult.data &&
					'refresh_token' in refreshResult.data
				) {
					api.dispatch(
						updateAccessToken({
							accessToken: refreshResult.data.access_token as string,
							refreshToken: refreshResult.data.refresh_token as string,
						}),
					);
					result = await authQuery(args, api, extraOptions);
				} else {
					api.dispatch(loggedOut());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await authQuery(args, api, extraOptions);
		}
	}

	return result;
};

export default authQueryWithReauth;
