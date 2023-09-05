import { useCallback, useEffect } from 'react';

// import ChangePassword from './ChangePassword';
import ChangePersonalData from './ChangePersonalData';
import { useLazyGetUserQuery } from '../../../entities/user';
import getCookieValue from '../../../entities/user/lib/helpers/getCookieValue';
import { useAppSelector } from '../../../shared/lib/hooks';

export default function AccountSettings() {
  const { userId } = useAppSelector((state) => state.userReducer);
  const [getUser, { data, isSuccess }] = useLazyGetUserQuery();
  const accessToken = getCookieValue('accessToken');

  const memoizedGetUser = useCallback(
    (_id: string) => {
      getUser(_id).unwrap();
    },
    [getUser],
  );

  useEffect(() => {
    memoizedGetUser(userId);
  }, [userId, memoizedGetUser]);

  if (!data) return null;

  return (
    <div className="flex flex-col">
      {isSuccess ? <ChangePersonalData userData={data} accessToken={accessToken} getUser={memoizedGetUser} /> : null}
      {/* <ChangePassword userData={data} accessToken={accessToken} getUser={memoizedGetUser} /> */}
    </div>
  );
}
