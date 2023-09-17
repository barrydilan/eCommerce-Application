import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { PRODUCT_PATH } from '../const';
import { useGetPath } from '../lib/hooks';

interface ILoginRequiredProps {
  children: ReactNode;
}

function NavigateToCategories({ children }: ILoginRequiredProps) {
  const path = useGetPath();

  if (path !== PRODUCT_PATH) {
    return <Navigate to={PRODUCT_PATH} replace />;
  }

  return children;
}

export default NavigateToCategories;
