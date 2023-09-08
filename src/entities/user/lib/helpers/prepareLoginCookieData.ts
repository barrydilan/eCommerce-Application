import { CookieTuple } from '../../../../shared/types';
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN, COOKIE_USER_ID } from '../../consts/constants.ts';

interface ICookieData {
	accessToken: string;
	expiresInToken: number;
	id: string;
	refreshToken: string;
}

/**
 * Prepares the login cookie data.
 *
 * @param {string} accessToken - The access token.
 * @param {string} expiresInToken - The expiration time of the access token.
 * @param {string} id - The user ID.
 * @param {string} refreshToken - Users refresh token
 * @param {string} expiresInId - The expiration time of the user ID.
 * @return {void}
 */
function prepareLoginCookieData(
	{ accessToken, expiresInToken, refreshToken, id }: ICookieData,
	expiresInId: number = expiresInToken,
): [CookieTuple, CookieTuple, CookieTuple] {
	const accessTokenCookie: CookieTuple = [accessToken, COOKIE_ACCESS_TOKEN, expiresInToken];
	const idCookie: CookieTuple = [id, COOKIE_USER_ID, expiresInId];
	const refreshTokenCookie: CookieTuple = [refreshToken, COOKIE_REFRESH_TOKEN, expiresInToken];

	return [accessTokenCookie, idCookie, refreshTokenCookie];
}

export default prepareLoginCookieData;
