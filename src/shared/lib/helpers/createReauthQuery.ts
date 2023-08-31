import { BaseQueryFn, FetchArgs, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { userSlice } from '../../../entities/user';
import authQuery from '../../api/authQuery.ts';
import { DEFAULT_CUSTOMER_SCOPE, PROJECT_KEY } from '../../const';
import { ErrorCodeStatus } from '../../types';

const authQueryArgs = {
	url: `/oauth/${PROJECT_KEY}/anonymous/token`,
	method: 'POST',
	params: {
		grant_type: 'client_credentials',
		scope: DEFAULT_CUSTOMER_SCOPE,
	},
};

function createReauthQuery(
	query: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, NonNullable<unknown>, FetchBaseQueryMeta>,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> {
	return async (args, api, extraOptions) => {
		const { loggedOut, updateAccessToken } = userSlice.actions;
		let result = await query(args, api, extraOptions);

		if (result.error && result.error.status === ErrorCodeStatus.UNAUTHORIZED) {
			const refreshResult = await authQuery(authQueryArgs, api, extraOptions);

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
				result = await query(args, api, extraOptions);
			} else {
				api.dispatch(loggedOut());
			}
		}

		return result;
	};
}

export default createReauthQuery;
