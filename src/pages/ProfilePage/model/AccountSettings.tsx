import ChangePassword from './ChangePassword';
import ChangePersonalData from './ChangePersonalData';
import { IUser } from '../../../shared/types';

export default function AccountSettings(props: { userData: IUser }) {
  const { userData } = props;

  return (
    <div className="flex flex-col">
      <ChangePersonalData userData={userData} />
      <ChangePassword userData={userData} />
    </div>
  );
}
