import { setCookie } from '../../../../shared/lib/helpers';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/hooks';
import { prepareLoginCookieData, useLoginTokenMutation, userSlice } from '../../index.ts';

/**
 * Logs in user and stores the access token in cookies.
 * @typedef {string} email - The email of the user
 * @typedef {string} password - The password of the user
 * @typedef {string} id - The id of the user
 * @typedef {(email, password, id) => Promise<void>} loginUser - Function to login user
 * @typedef {{isLoading}} paramsObj - Object of params
 * @typedef {[loginUser, paramsObj]} ParamsTuple
 * @returns {ParamsTuple} The tuple of loginUser function and object of parameters such as isLoading.
 */
function useLoginUser() {
	const [getLoginToken, params] = useLoginTokenMutation();
	const dispatch = useAppDispatch();
	const { loggedIn } = userSlice.actions;
	const { cartId } = useAppSelector((state) => state.userReducer);

	/**
	 * Logs in a user using the provided email, password, and id.
	 *
	 * @param {string} email - The email of the user.
	 * @param {string} password - The password of the user.
	 * @param {string} id - The ID of the user.
	 * @returns {Promise<void>} - A promise that resolves when the user is logged in successfully.
	 * @throws {Error} - If an error occurs while logging in the user.
	 */
	async function loginUser(email: string, password: string, id: string) {
		try {
			const {
				access_token: accessToken,
				expires_in: expiresIn,
				refresh_token: refreshToken,
			} = await getLoginToken({ email, password }).unwrap();

			dispatch(loggedIn({ accessToken, userId: id, refreshToken, cartId: '' }));

			const [accessTokenCookie, idCookie, refreshTokenCookie, cardIdCookie] = prepareLoginCookieData({
				accessToken,
				id,
				refreshToken,
				expiresInToken: expiresIn,
				cartId,
			});
			setCookie(accessTokenCookie, idCookie, refreshTokenCookie, cardIdCookie);
		} catch (e) {
			if (e && typeof e === 'object' && 'status' in e) {
				throw new Error(`Error occurred while logged in user ${e.status}`);
			}
		}
	}

	return [loginUser, params] as [typeof loginUser, typeof params];
}

export default useLoginUser;
