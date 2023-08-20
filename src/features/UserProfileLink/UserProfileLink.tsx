import { Link } from 'react-router-dom';

import userPic from '../../assets/img/UserImg.jpg';
import { getFullName, useGetUserQuery } from '../../entities/user';
import { useAppSelector } from '../../shared/lib/hooks';

const headerLoggedClass = 'block md:hidden';
const menuLoggedClass =
  'hidden w-full justify-center gap-3 text-text-grey md:mt-6 md:flex md:flex-col md:items-center lg:mt-12 lg:flex-row';

function UserProfileLink(props: { isHeader: boolean }) {
  const { isLogged, userId } = useAppSelector((state) => state.userReducer);
  const { data, isLoading } = useGetUserQuery(userId, { skip: !userId });

  const { isHeader } = props;
  const userFullName = getFullName(data?.firstName, data?.lastName);

  if (isLogged) {
    return (
      <Link
        to="/profile"
        className={`${isHeader ? headerLoggedClass : menuLoggedClass} ${isLoading ? 'animate-pulse' : ''}`}
      >
        <img src={userPic} alt="user avatar" className={isHeader ? 'mr-2 w-8 rounded-full' : 'w-12 rounded-xl'} />
        <div className={isHeader ? 'hidden' : ''}>
          <h5
            className="
                w-40 
                overflow-hidden 
                text-ellipsis 
                text-xl 
                font-light 
                text-text-dark
                md:text-center 
                lg:w-full 
                lg:text-start"
          >
            {userFullName}
          </h5>
          <h6
            className="
                text-lg 
                font-light 
                md:text-center 
                lg:text-start"
          >
            Good morning!
          </h6>
        </div>
      </Link>
    );
  }
  return (
    <Link
      className={`
        ${isHeader ? 'mr-2 h-8 pl-1 pr-1 text-sm leading-8 md:hidden' : 'mt-12 hidden h-10 w-3/5 md:block lg:w-2/5'}
        rounded-md
        bg-accent
        text-center
        leading-10 
        text-primary 
        md:ml-6
        lg:ml-16`}
      to="/login"
    >
      Log&nbsp;in
    </Link>
  );
}

export default UserProfileLink;
