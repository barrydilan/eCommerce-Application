import { useEffect } from 'react';

import { HashRouter, useLocation } from 'react-router-dom';

import RoutesWithAnimation from './utils/RoutesWithAnimation.tsx';
import { COOKIE_ACCESS_TOKEN, userSlice } from '../entities/user';
import { COOKIE_REFRESH_TOKEN, COOKIE_USER_ID } from '../entities/user/consts/constants.ts';
import Cart from '../pages/Cart/Cart.tsx';
import NavBlock from '../pages/NavBlock/NavBlock';
import { getCookie } from '../shared/lib/helpers';
import { useAppDispatch } from '../shared/lib/hooks';
import Header from '../widgets/Header/Header';
import LocationProvider from './utils/LocationProvider.tsx';

export function App() {
  const dispatch = useAppDispatch();
  const { loggedIn } = userSlice.actions;
  const location = useLocation();

  useEffect(() => {
    const [token, userId, refreshToken] = getCookie(COOKIE_ACCESS_TOKEN, COOKIE_USER_ID, COOKIE_REFRESH_TOKEN);

    if (token && userId && refreshToken) {
      dispatch(loggedIn({ accessToken: token, userId, refreshToken }));
    }
  }, [dispatch, loggedIn]);

  return (
    <main>
      <div
        className="
          font-base
          mx-auto
          grid
          min-h-[100dvh]
          grid-cols-1
          grid-rows-mobGridRows
          font-poppins
          text-base
          text-text-dark
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
          <LocationProvider>
            <RoutesWithAnimation />
          </LocationProvider>
        </div>
        <NavBlock />
        {location.pathname !== '/cart' ? (
          <div
            className="
         hidden
         md:col-start-3
      md:row-start-2
          md:block
      md:min-w-[11rem]
      md:border-2
    md:border-accent"
          >
            <Cart />
          </div>
        ) : null}
      </div>
    </main>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
