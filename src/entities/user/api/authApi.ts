import { rootAuthApi } from '../../../shared/api';
import { IAuthResponse, ILoginUserParams, TokenTypeHints } from '../../../shared/types';

interface ITokenRevokeParams {
	token: string;
	tokenTypeHint: TokenTypeHints;
}

export const authApi = rootAuthApi.injectEndpoints({
	endpoints: (build) => ({
		loginToken: build.mutation<IAuthResponse, ILoginUserParams>({
			query: ({ password, email, scope = import.meta.env.VITE_DEFAULT_CUSTOMER_SCOPE }) => ({
				url: `/oauth/${import.meta.env.VITE_PROJECT_KEY}/customers/token`,
				method: 'POST',
				params: {
					grant_type: 'password',
					username: email,
					password,
					scope,
				},
			}),
		}),

		anonymousSession: build.mutation<IAuthResponse, void>({
			query: () => ({
				url: `/oauth/${import.meta.env.VITE_PROJECT_KEY}/anonymous/token`,
				method: 'POST',
				params: {
					grant_type: 'client_credentials',
					scope: import.meta.env.VITE_DEFAULT_CUSTOMER_SCOPE,
				},
			}),
		}),

		revokeToken: build.mutation<null, ITokenRevokeParams>({
			query: ({ token, tokenTypeHint }) => ({
				url: `oauth/token/revoke`,
				method: 'POST',
				params: {
					token,
					token_type_hint: tokenTypeHint,
				},
			}),
		}),
	}),
});

export const { useLoginTokenMutation, useAnonymousSessionMutation, useRevokeTokenMutation } = authApi;
