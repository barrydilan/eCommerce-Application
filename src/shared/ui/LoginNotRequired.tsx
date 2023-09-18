import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../lib/hooks';

interface ILoginRequiredProps {
  children: ReactNode;
}

function LoginNotRequired({ children }: ILoginRequiredProps) {
  const { isLogged } = useAppSelector((state) => state.userReducer);

  if (!isLogged) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default LoginNotRequired;
