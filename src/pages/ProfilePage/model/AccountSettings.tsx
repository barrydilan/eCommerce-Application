import ChangePassword from './ChangePassword';
import ChangePersonalData from './ChangePersonalData';
import { UserData } from '../types/profilePageTypes';

export default function AccountSettings(props: {
  userData: UserData;
  accessToken: string | undefined;
  getUser: (_id: string) => void;
}) {
  const { userData, accessToken, getUser } = props;

  return (
    <div className="flex flex-col">
      <ChangePersonalData userData={userData} accessToken={accessToken} getUser={getUser} />
      <ChangePassword userData={userData} accessToken={accessToken} getUser={getUser} />
    </div>
  );
}
