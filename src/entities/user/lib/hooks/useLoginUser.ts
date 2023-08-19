import { useNavigate } from 'react-router-dom';

import { setCookie } from '../../../../shared/lib/helpers';
import { useAppDispatch } from '../../../../shared/lib/hooks';
import { ILoginUserParams } from '../../../../shared/types';
import { prepareLoginCookieData, useLoginTokenMutation, userSlice } from '../../index.ts';

interface IUseLoginUserParams extends ILoginUserParams {
	id: string;
}

function useLoginUser() {
	const [getLoginToken] = useLoginTokenMutation();
	const dispatch = useAppDispatch();
	const { loggedIn } = userSlice.actions;
	const navigate = useNavigate();

	async function loginUser({ email, password, id }: IUseLoginUserParams) {
		try {
			const { access_token: accessToken, expires_in: expiresIn } = await getLoginToken({ email, password }).unwrap();

			dispatch(loggedIn({ accessToken, userId: id }));
			navigate('/');

			const [accessTokenCookie, idCookie] = prepareLoginCookieData(accessToken, expiresIn, id);
			setCookie(accessTokenCookie, idCookie);
		} catch (e) {
			if (e && typeof e === 'object' && 'status' in e) {
				throw new Error(`Error occurred while logged in user ${e.status}`);
			}
		}
	}

	return loginUser;
}

export default useLoginUser;
