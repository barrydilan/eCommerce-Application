import { useRevokeTokenMutation } from '../../../../entities/user';
import { TokenTypeHints } from '../../../types';

/**
 * Revokes the access and refresh tokens by calling the `revokeToken` mutation.
 *
 * @returns {(accessToken: string, refreshToken: string) => void} - The function that perform toke revocation.
 */
function useRevokeAccessRefreshTokens() {
	const [revokeToken] = useRevokeTokenMutation();

	return (accessToken: string, refreshToken: string) => {
		revokeToken({ token: accessToken, tokenTypeHint: TokenTypeHints.ACCESS_TOKEN });
		revokeToken({ token: refreshToken, tokenTypeHint: TokenTypeHints.REFRESH_TOKEN });
	};
}

export default useRevokeAccessRefreshTokens;
