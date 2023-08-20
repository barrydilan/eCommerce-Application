import { CookieTuple } from '../../../../shared/types';
import { COOKIE_ACCESS_TOKEN, COOKIE_USER_ID } from '../../consts/constants.ts';

/**
 * Prepares the login cookie data.
 *
 * @param {string} accessToken - The access token.
 * @param {string} expiresInToken - The expiration time of the access token.
 * @param {string} id - The user ID.
 * @param {string} expiresInId - The expiration time of the user ID.
 * @return {void}
 */
function prepareLoginCookieData(
	accessToken: string,
	expiresInToken: number,
	id: string,
	expiresInId: number = expiresInToken,
): [CookieTuple, CookieTuple] {
	const accessTokenCookie: CookieTuple = [accessToken, COOKIE_ACCESS_TOKEN, expiresInToken];
	const idCookie: CookieTuple = [id, COOKIE_USER_ID, expiresInId];

	return [accessTokenCookie, idCookie];
}

export default prepareLoginCookieData;
