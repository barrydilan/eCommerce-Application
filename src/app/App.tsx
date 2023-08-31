import { useEffect } from 'react';

import { BrowserRouter } from 'react-router-dom';

import LocationProvider from './utils/LocationProvider.tsx';
import RoutesWithAnimation from './utils/RoutesWithAnimation.tsx';
import { COOKIE_ACCESS_TOKEN, userSlice } from '../entities/user';
import { COOKIE_USER_ID } from '../entities/user/consts/constants.ts';
import NavBlock from '../pages/NavBlock/NavBlock';
import { getCookie } from '../shared/lib/helpers';
import { useAppDispatch } from '../shared/lib/hooks';
import Header from '../widgets/Header/Header';

export function App() {
  const dispatch = useAppDispatch();
  const { loggedIn } = userSlice.actions;

  useEffect(() => {
    const [token, userId] = getCookie(COOKIE_ACCESS_TOKEN, COOKIE_USER_ID);

    if (token && userId) {
      dispatch(loggedIn({ accessToken: token, userId }));
    }
  }, [dispatch, loggedIn]);

  return (
    <main
      className="
          mx-auto
          grid
          min-h-[100dvh]
          grid-cols-1
          grid-rows-mobGridRows
          font-poppins
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
    </main>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter basename="/eCommerce-Application">
      <App />
    </BrowserRouter>
  );
}
