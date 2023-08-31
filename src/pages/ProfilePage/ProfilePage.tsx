import logOutIcon from '../../assets/icons/log-out.svg';
import { COOKIE_ACCESS_TOKEN, useRevokeTokenMutation, userSlice } from '../../entities/user';
import { COOKIE_USER_ID } from '../../entities/user/consts/constants';
import deleteCookie from '../../shared/lib/helpers/deleteCookie';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { TokenTypeHints } from '../../shared/types';

export default function ProfilePage() {
  const { isLogged, accessToken: oldAccessToken } = useAppSelector((state) => state.userReducer);
  const [revokeToken] = useRevokeTokenMutation();
  const dispatch = useAppDispatch();
  const { loggedOut } = userSlice.actions;

  async function handleLogout() {
    dispatch(loggedOut());
    deleteCookie(COOKIE_ACCESS_TOKEN, COOKIE_USER_ID);
    revokeToken({ token: oldAccessToken, tokenTypeHint: TokenTypeHints.ACCESS_TOKEN });
  }

  return (
    <div className="flex h-1/2 flex-col items-center justify-center">
      {isLogged && (
        <div>
          <button disabled onClick={handleLogout} type="button" className="navMenuLink text-text-dark">
            <img src={logOutIcon} alt="" className="navMenuIcon md:inline-block" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
