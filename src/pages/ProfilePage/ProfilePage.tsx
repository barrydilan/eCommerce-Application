import { useState } from 'react';

import AccountSettings from './model/AccountSettings';
import AddressesSettings from './model/AddressesSettings';
import BackBtn from './model/BackBtn';
import TabSelector from './model/TabSelector';
import UserImage from './model/UserImage';
import ProfileHeader from './ui/ProfileHeader';
import userImage from '../../assets/img/UserImg.jpg';

export default function ProfilePage() {
  const [isAccTabActive, setIsAccTabActive] = useState(true);
  return (
    <div className="my-12 p-5 sm:mt-[5.6rem] xl:px-24">
      <BackBtn />
      <ProfileHeader />
      <UserImage pic={userImage} fullName="Oleksii Drohachov" email="asdrogachev@gmail.com" />
      <TabSelector isAccTabActive={isAccTabActive} setIsAccTabActive={setIsAccTabActive} />
      <div>{isAccTabActive ? <AccountSettings /> : <AddressesSettings />}</div>
    </div>
  );
}
