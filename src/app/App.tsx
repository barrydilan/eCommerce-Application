import { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { COOKIE_ACCESS_TOKEN, useAnonymousSessionMutation, USER_LOGGED_IN_DATA_KEY, userSlice } from '../entities/user';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import NavBlock from '../pages/NavBlock/NavBlock';
import { getCookie, getLocalStorage } from '../shared/lib/helpers';
import { useAppDispatch } from '../shared/lib/hooks';
import { ILoginUserDataResponse } from '../shared/types';
import Header from '../widgets/Header/Header';

export function App() {
  const [getAnonToken] = useAnonymousSessionMutation();
  const dispatch = useAppDispatch();
  const { updateAccessToken, loggedIn } = userSlice.actions;

  useEffect(() => {
    async function fetchData() {
      const storedToken = getCookie(COOKIE_ACCESS_TOKEN);

      if (storedToken) {
        const userLoggedInData = getLocalStorage<ILoginUserDataResponse>(USER_LOGGED_IN_DATA_KEY);
        dispatch(loggedIn({ accessToken: storedToken, userLoggedInData }));
      }

      try {
        const { access_token: accessToken } = await getAnonToken().unwrap();

        dispatch(updateAccessToken(accessToken));
      } catch (e) {
        // console.error(`Error occurred while getting anonymous token! (${e.status})`);
      }
    }

    fetchData();
  }, [getAnonToken, dispatch, loggedIn, updateAccessToken]);

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
      <Header />
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
      <NavBlock />
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
