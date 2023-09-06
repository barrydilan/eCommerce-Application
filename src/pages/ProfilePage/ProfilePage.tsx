import { useCallback, useEffect, useState } from 'react';

import AccountSettings from './model/AccountSettings';
import AddressesSettings from './model/AddressesSettings';
import BackBtn from './model/BackBtn';
import TabSelector from './model/TabSelector';
import UserImage from './model/UserImage';
import ProfileHeader from './ui/ProfileHeader';
import userImage from '../../assets/img/UserImg.jpg';
import { useLazyGetUserQuery } from '../../entities/user';
import { useAppSelector } from '../../shared/lib/hooks';
import LoadingAnimation from '../../shared/ui/LoadingAnimation.tsx';

export default function ProfilePage() {
  const [isAccTabActive, setIsAccTabActive] = useState(true);
  const { userId } = useAppSelector((state) => state.userReducer);
  const [getUser, { data }] = useLazyGetUserQuery();

  const memoizedGetUser = useCallback(
    (_id: string) => {
      getUser(_id);
    },
    [getUser],
  );

  useEffect(() => {
    memoizedGetUser(userId);
  }, [userId, memoizedGetUser]);

  if (!data)
    return (
      <div className="flex h-full items-center justify-center overflow-hidden">
        <LoadingAnimation />
      </div>
    );

  return (
    <div className="my-12 p-5 sm:mt-[5.6rem] xl:px-24">
      <BackBtn />
      <ProfileHeader />
      <UserImage pic={userImage} userData={data} />
      <TabSelector isAccTabActive={isAccTabActive} setIsAccTabActive={setIsAccTabActive} />
      {isAccTabActive ? (
        <AccountSettings userData={data} getUser={memoizedGetUser} />
      ) : (
        <AddressesSettings userData={data} getUser={memoizedGetUser} />
      )}
    </div>
  );
}
