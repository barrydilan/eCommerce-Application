import { Route, Routes, useLocation } from 'react-router-dom';

import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
<<<<<<< HEAD
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ProductCatalog from '../../pages/ProductCatalog/ProductCatalog';
import ProductPage from '../../pages/ProductPage/ui/ProductPage';
=======
import ProductCatalogue from '../../pages/ProductCatalog/ProductCatalogue.tsx';
import ProductPage from '../../pages/ProductPage/ProductPage.tsx';
>>>>>>> 5575ee22d8d0d8eca8e0c1681a142adb8df21616
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import RegPage from '../../pages/RegPage/RegPage';
import { LoginRequired } from '../../shared/ui';

export default function RoutesWithAnimation() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.key}>
      <Route index element={<ProductCatalogue />} />
      <Route path="/:productId" element={<ProductPage />} />
      <Route
        path="registration"
        element={
          <LoginRequired>
            <RegPage />
          </LoginRequired>
        }
      />
      <Route
        path="login"
        element={
          <LoginRequired>
            <LoginPage />
          </LoginRequired>
        }
      />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="cart" element={<p>Shopping cart</p>} />
      <Route path="delivery" element={<p>Delivery</p>} />
      <Route path="payment" element={<p>Payment</p>} />
      <Route path="about" element={<p>About us</p>} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
