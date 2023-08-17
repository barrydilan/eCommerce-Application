import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ErrorPage from '../pages/ErrorPage/ErrorPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import NavBlock from '../pages/NavBlock/NavBlock';
import Header from '../widgets/Header/Header';

const isLogged = false;

export function App() {
  return (
    <main
      className="
          mx-auto
          grid
          min-h-screen
          grid-cols-1
          grid-rows-mobGridRows
          2xl:container
          md:grid-cols-tabGridCols
          md:grid-rows-tabGridRows
          lg:grid-cols-deskGridCols
          "
    >
      <Header isLogged={isLogged} />
      <div
        className="
            md:col-start-2
            md:col-end-3
            md:row-start-2
            md:row-end-3
            "
      >
        <Routes>
          <Route index element={<p>Here will be main content</p>} />
          <Route path="registration" element={<p>Registration</p>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<p>User profile</p>} />
          <Route path="cart" element={<p>Shopping cart</p>} />
          <Route path="delivery" element={<p>Delivery</p>} />
          <Route path="payment" element={<p>Payment</p>} />
          <Route path="about" element={<p>About us</p>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <NavBlock isLogged={isLogged} />
    </main>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}