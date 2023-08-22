import logOutIcon from '../../assets/icons/log-out.svg';
import { COOKIE_ACCESS_TOKEN, useAnonymousSessionMutation, userSlice } from '../../entities/user';
import { COOKIE_USER_ID } from '../../entities/user/consts/constants';
import deleteCookie from '../../shared/lib/helpers/deleteCookie';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';

export default function ProfilePage() {
  const { isLogged } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [getAnonToken, { isLoading }] = useAnonymousSessionMutation();
  const { loggedOut } = userSlice.actions;
  async function handleLogout() {
    const { access_token: accessToken } = await getAnonToken().unwrap();
    dispatch(loggedOut(accessToken));
    deleteCookie(COOKIE_ACCESS_TOKEN, COOKIE_USER_ID);
  }

  return (
    <div className="flex h-1/2 flex-col items-center justify-center">
      {isLogged && (
        <div className={`${isLoading ? 'animate-pulse' : ''}`}>
          <button disabled={isLoading} onClick={handleLogout} type="button" className="navMenuLink text-text-dark">
            <img src={logOutIcon} alt="" className="navMenuIcon md:inline-block" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
