import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { useGetPath } from '../lib/hooks';

interface ILoginRequiredProps {
  children: ReactNode;
}

function NavigateToCategories({ children }: ILoginRequiredProps) {
  const path = useGetPath();

  if (path !== 'categories/all') {
    return <Navigate to="/categories/all" replace />;
  }

  return children;
}

export default NavigateToCategories;
