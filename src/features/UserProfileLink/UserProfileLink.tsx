import { Link } from 'react-router-dom';

import getGreeting from './helpers/getGreeting';
import { getFullName, useGetUserQuery } from '../../entities/user';
import { useAppSelector } from '../../shared/lib/hooks';
import UserIcon from '../../shared/ui/UserIcon';

const headerLoggedClass = 'block lg:hidden';
const menuLoggedClass =
  'hidden w-full justify-center gap-3 text-text-grey lg:mt-28 lg:flex lg:flex-col lg:items-center xl:flex-row';

function UserProfileLink(props: { isHeader: boolean }) {
  const { isLogged, userId } = useAppSelector((state) => state.userReducer);
  const { data, isLoading } = useGetUserQuery(userId, { skip: !userId });

  const { isHeader } = props;
  const userFullName = getFullName(data?.firstName, data?.lastName);

  const hours = new Date().getHours();

  const greeting = getGreeting(hours);

  if (isLogged) {
    return (
      <Link
        to="/profile"
        className={`${isHeader ? headerLoggedClass : menuLoggedClass} ${isLoading ? 'animate-pulse' : ''}`}
      >
        <UserIcon isHeader={isHeader} />
        <div className={isHeader ? 'hidden' : ''}>
          <h5
            className="
                w-40 
                overflow-hidden 
                text-ellipsis 
                text-xl
                text-text-dark
                dark:text-primary 
                md:text-center 
                xl:w-full
                xl:text-start
            "
          >
            {userFullName}
          </h5>
          <h6
            className="
                md:text-center
                xl:text-start"
          >
            {greeting}
          </h6>
        </div>
      </Link>
    );
  }
  return (
    <>
      <Link
        className={`
        ${
          isHeader
            ? 'mr-2 flex h-9 items-center px-2 text-sm leading-8 lg:hidden'
            : 'mt-28 hidden h-10 w-3/5 lg:mt-28 lg:block'
        }
        rounded-md
        bg-accent-lightest
        text-center 
        leading-10 
        text-accent
        lg:ml-6
        xl:ml-14`}
        to="/login"
      >
        Log&nbsp;in
      </Link>
      <Link
        className={`
        ${isHeader ? 'mr-2 flex h-9 items-center px-2 text-sm leading-8 lg:hidden' : 'mt-3 hidden h-10 w-3/5 lg:block'}
        rounded-md
        bg-accent
        text-center
        leading-10 
        text-accent-lightest 
        lg:ml-6
        xl:ml-14`}
        to="/registration"
      >
        Sign&nbsp;Up
      </Link>
    </>
  );
}

export default UserProfileLink;
