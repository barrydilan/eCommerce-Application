import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { useGetPath } from '../lib/hooks';

interface ILoginRequiredProps {
  children: ReactNode;
}

const PRODUCT_PATH = 'categories/all';

function NavigateToCategories({ children }: ILoginRequiredProps) {
  const path = useGetPath();

  if (path !== PRODUCT_PATH) {
    return <Navigate to={PRODUCT_PATH} replace />;
  }

  return children;
}

export default NavigateToCategories;
