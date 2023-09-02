// import logOutIcon from '../../assets/icons/log-out.svg';
// import { COOKIE_ACCESS_TOKEN, useAnonymousSessionMutation, userSlice } from '../../entities/user';
// import { COOKIE_USER_ID } from '../../entities/user/consts/constants';
// import deleteCookie from '../../shared/lib/helpers/deleteCookie';
// import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { useState } from 'react';

import AccountSettings from './model/AccountSettings';
import AddressesSettings from './model/AddressesSettings';
import BackBtn from './model/BackBtn';
import TabSelector from './model/TabSelector';
import UserImage from './model/UserImage';
import ProfileHeader from './ui/ProfileHeader';
import userImage from '../../assets/img/UserImg.jpg';

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
  const [isAccTabActive, setIsAccTabActive] = useState(true);
  return (
    <div className="mt-12 p-5 sm:mt-16">
      <BackBtn />
      <ProfileHeader />
      <UserImage pic={userImage} fullName="Oleksii Drohachov" email="asdrogachev@gmail.com" />
      <TabSelector isAccTabActive={isAccTabActive} setIsAccTabActive={setIsAccTabActive} />
      <div>{isAccTabActive ? <AccountSettings /> : <AddressesSettings />}</div>
    </div>
  );
}
