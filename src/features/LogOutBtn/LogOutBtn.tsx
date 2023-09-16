import { useNavigate } from 'react-router-dom';

import logOutIcon from '../../assets/icons/log-out.svg';
import { COOKIE_ACCESS_TOKEN, userSlice } from '../../entities/user';
import { COOKIE_REFRESH_TOKEN, COOKIE_USER_ID } from '../../entities/user/consts/constants.ts';
import { deleteCookie } from '../../shared/lib/helpers';
import { useAppDispatch, useAppSelector, useRevokeAccessRefreshTokens } from '../../shared/lib/hooks';

export default function LogOutBtn(props: { isHeader: boolean }) {
  const { isHeader } = props;
  const {
    isLogged,
    accessToken: oldAccessToken,
    refreshToken: oldRefreshToken,
  } = useAppSelector((state) => state.userReducer);
  const revokeTokens = useRevokeAccessRefreshTokens();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loggedOut } = userSlice.actions;

  async function handleLogout() {
    dispatch(loggedOut());
    navigate('/');
    deleteCookie(COOKIE_ACCESS_TOKEN, COOKIE_USER_ID, COOKIE_REFRESH_TOKEN);
    revokeTokens(oldAccessToken, oldRefreshToken);
  }

  return isLogged ? (
    <div
      className={`navMenuItem ${
        isHeader
          ? 'static mr-5 w-auto rounded-md border-2 border-text-grey/50 dark:border-separation-line/40 lg:hidden'
          : 'hidden lg:absolute'
      } lg:bottom-6 lg:block xl:pl-14`}
    >
      <button
        onClick={handleLogout}
        type="button"
        className={`navMenuLink ${
          isHeader ? 'text-text-grey' : 'text-text-dark'
        } cursor-pointer transition-all duration-300 hover:text-text-grey dark:text-primary hover:dark:text-text-grey`}
      >
        <img src={logOutIcon} alt="" className={`navMenuIcon ${isHeader ? 'hidden' : 'lg:inline-block'}`} />
        Log out
      </button>
    </div>
  ) : null;
}
