import pencilIcon from '../../../assets/icons/pencilIcon.svg';
import { getFullName } from '../../../entities/user';
import { IUser } from '../../../shared/types';
import UserIcon from '../../../shared/ui/UserIcon';

export default function UserImage(props: { userData: IUser }) {
  const { userData } = props;
  const { firstName, lastName, email } = userData;

  return (
    <div className="relative mt-7 flex items-center">
      <div className="w-[60px]">
        <UserIcon isHeader={false} />
      </div>
      <div className="ml-6">
        <h5 className="text-base font-medium dark:text-primary">{getFullName(firstName, lastName)}</h5>
        <p className="mt-1 text-sm text-text-grey">{email}</p>
      </div>
      <label
        className="absolute bottom-0 left-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-accent transition-all dark:border-1 sm:static sm:ml-auto sm:h-10 sm:w-40 sm:rounded-md sm:bg-accent-lightest sm:text-accent sm:hover:bg-separation-line"
        htmlFor="userImgInput"
      >
        <input className="hidden" id="userImgInput" type="file" accept=".jpg,.jpeg,.png" />
        <img className="w-auto sm:hidden" src={pencilIcon} alt="" />
        <span className="hidden w-full text-center text-base font-medium sm:inline">Change image</span>
      </label>
    </div>
  );
}
