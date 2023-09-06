import ChangePassword from './ChangePassword';
import ChangePersonalData from './ChangePersonalData';
import { IUser } from '../../../shared/types';

export default function AccountSettings(props: { userData: IUser; getUser: (_id: string) => void }) {
  const { userData, getUser } = props;

  return (
    <div className="flex flex-col">
      <ChangePersonalData userData={userData} getUser={getUser} />
      <ChangePassword userData={userData} getUser={getUser} />
    </div>
  );
}
