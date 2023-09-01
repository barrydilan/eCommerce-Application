// import logOutIcon from '../../assets/icons/log-out.svg';
// import { COOKIE_ACCESS_TOKEN, useAnonymousSessionMutation, userSlice } from '../../entities/user';
// import { COOKIE_USER_ID } from '../../entities/user/consts/constants';
// import deleteCookie from '../../shared/lib/helpers/deleteCookie';
// import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';

import BackBtn from './model/BackBtn';
import ProfileHeader from './ui/ProfileHeader';

export default function ProfilePage() {
  //   const { isLogged } = useAppSelector((state) => state.userReducer);
  //   const dispatch = useAppDispatch();
  //   const [getAnonToken, { isLoading }] = useAnonymousSessionMutation();
  //   const { loggedOut } = userSlice.actions;
  //   async function handleLogout() {
  //     const { access_token: accessToken } = await getAnonToken().unwrap();
  //     dispatch(loggedOut(accessToken));
  //     deleteCookie(COOKIE_ACCESS_TOKEN, COOKIE_USER_ID);
  //   }

  return (
    <div className="p-5">
      <BackBtn />
      <ProfileHeader />
    </div>
  );
}
