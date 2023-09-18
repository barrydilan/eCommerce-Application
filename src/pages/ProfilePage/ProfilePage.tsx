import { useCallback, useEffect, useState } from 'react';

import AccountSettings from './model/AccountSettings';
import AddressesSettings from './model/AddressesSettings';
import TabSelector from './model/TabSelector';
import ThemeSelector from './model/ThemeSelector.tsx';
import UserImage from './model/UserImage';
import ProfileHeader from './ui/ProfileHeader';
import { useLazyGetUserQuery } from '../../entities/user';
import PageBackBtn from '../../features/PageBackBtn/PageBackBtn.tsx';
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
    <div className="">
      <div className="mx-auto my-12 p-5 sm:mt-[5.6rem] xl:px-24 ">
        <PageBackBtn title="Account" />
        <ProfileHeader />
        <UserImage userData={data} />
        <ThemeSelector />
        <TabSelector isAccTabActive={isAccTabActive} setIsAccTabActive={setIsAccTabActive} />
        {isAccTabActive ? <AccountSettings userData={data} /> : <AddressesSettings userData={data} />}
      </div>
    </div>
  );
}
