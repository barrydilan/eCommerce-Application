import { Route, Routes, useLocation } from 'react-router-dom';

import AboutUs from '../../pages/AboutUs/AboutUs.tsx';
import Cart from '../../pages/Cart/Cart.tsx';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import ProductCatalogue from '../../pages/ProductCatalog/ProductCatalogue.tsx';
import ProductPage from '../../pages/ProductPage/ProductPage.tsx';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import RegPage from '../../pages/RegPage/RegPage';
import { LoginNotRequired, LoginRequired, NavigateToCategories } from '../../shared/ui';

export default function RoutesWithAnimation() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.key}>
      <Route
        index
        element={
          <NavigateToCategories>
            <ProductCatalogue />
          </NavigateToCategories>
        }
      />

      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/categories/*" element={<ProductCatalogue />} />
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
      <Route
        path="profile"
        element={
          <LoginNotRequired>
            <ProfilePage />
          </LoginNotRequired>
        }
      />
      <Route path="cart" element={<Cart />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
