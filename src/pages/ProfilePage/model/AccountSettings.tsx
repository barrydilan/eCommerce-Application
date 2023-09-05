import ChangePassword from './ChangePassword';
import ChangePersonalData from './ChangePersonalData';
import { IUser } from '../../../shared/types';

export default function AccountSettings(props: {
  userData: IUser;
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
