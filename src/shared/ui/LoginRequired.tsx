import { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../lib/hooks';

interface ILoginRequiredProps {
  children: ReactNode;
}

function LoginRequired({ children }: ILoginRequiredProps) {
  const { isLogged } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

  if (isLogged) {
    navigate('/');
  }

  return children;
}

export default LoginRequired;
