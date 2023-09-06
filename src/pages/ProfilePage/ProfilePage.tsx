import { useCallback, useEffect, useState } from 'react';

import AccountSettings from './model/AccountSettings';
import AddressesSettings from './model/AddressesSettings';
import BackBtn from './model/BackBtn';
import TabSelector from './model/TabSelector';
import UserImage from './model/UserImage';
import ProfileHeader from './ui/ProfileHeader';
import userImage from '../../assets/img/UserImg.jpg';
import { useLazyGetUserQuery } from '../../entities/user';
import getCookieValue from '../../entities/user/lib/helpers/getCookieValue';
import { useAppSelector } from '../../shared/lib/hooks';

export default function ProfilePage() {
  const [isAccTabActive, setIsAccTabActive] = useState(true);
  const { userId } = useAppSelector((state) => state.userReducer);
  const [getUser, { data, isSuccess }] = useLazyGetUserQuery();
  const accessToken = getCookieValue('accessToken');

  const memoizedGetUser = useCallback(
    (_id: string) => {
      getUser(_id).unwrap();
    },
    [getUser],
  );

  useEffect(() => {
    memoizedGetUser(userId);
  }, [userId, memoizedGetUser]);

  if (!data) return null;

  const wrapper = () => {
    return (
      <div>
        <BackBtn />
        <ProfileHeader />
        <UserImage pic={userImage} userData={data} />
        <TabSelector isAccTabActive={isAccTabActive} setIsAccTabActive={setIsAccTabActive} />
        <div>
          {isAccTabActive ? (
            <AccountSettings userData={data} accessToken={accessToken} getUser={memoizedGetUser} />
          ) : (
            <AddressesSettings userData={data} accessToken={accessToken} getUser={memoizedGetUser} />
          )}
        </div>
      </div>
    );
  };

  return <div className="my-12 p-5 sm:mt-[5.6rem] xl:px-24">{isSuccess ? wrapper() : null}</div>;
}
