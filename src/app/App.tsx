import { useEffect } from 'react';

import { HashRouter, useLocation } from 'react-router-dom';

import LocationProvider from './utils/LocationProvider.tsx';
import RoutesWithAnimation from './utils/RoutesWithAnimation.tsx';
import { COOKIE_ACCESS_TOKEN, userSlice } from '../entities/user';
import { COOKIE_REFRESH_TOKEN, COOKIE_USER_ID } from '../entities/user/consts/constants.ts';
import Cart from '../pages/Cart/Cart.tsx';
import NavBlock from '../pages/NavBlock/NavBlock';
import { getCookie } from '../shared/lib/helpers';
import { useAppDispatch } from '../shared/lib/hooks';
import Header from '../widgets/Header/Header';

if (!localStorage.sushiDefThemeUsage) {
  localStorage.sushiDefThemeUsage = 'true';
}
if (
  localStorage.sushiTheme === 'dark' ||
  (!('sushiTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
  document.body.classList.add('dark:bg-dark-bg-primary');
} else {
  document.documentElement.classList.remove('dark');
}

export function App() {
  const dispatch = useAppDispatch();
  const { loggedIn } = userSlice.actions;
  const location = useLocation();
  const isCartToRender = location.pathname.includes('/categories') || location.pathname.includes('/product');

  useEffect(() => {
    const [token, userId, refreshToken] = getCookie(COOKIE_ACCESS_TOKEN, COOKIE_USER_ID, COOKIE_REFRESH_TOKEN);

    if (token && userId && refreshToken) {
      dispatch(loggedIn({ accessToken: token, userId, refreshToken, cartId: '' }));
    }
  }, [dispatch, loggedIn]);

  return (
    <main>
      <div
        className={`
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
          lg:grid-rows-tabGridRows
          ${isCartToRender ? 'lg:grid-cols-lgGridCols' : 'lg:grid-cols-lgNoCartGrid'}
          ${isCartToRender ? 'xl:grid-cols-xlGridCols' : 'xl:grid-cols-xlNoCartGrid'}
          `}
      >
        <Header />
        <div
          className="
            w-full
            lg:col-start-2
            lg:col-end-3
            lg:row-start-2
            lg:row-end-3
            lg:justify-self-center
            "
        >
          <LocationProvider>
            <RoutesWithAnimation />
          </LocationProvider>
        </div>
        <NavBlock />
        {isCartToRender ? (
          <div
            className="
              box-border
              hidden
              border-l-2
              dark:border-dark-separation-line
              dark:bg-dark-separation-line
              lg:col-start-3
              lg:col-end-4
              lg:row-start-2
              lg:block
              lg:border-separation-line
              lg:bg-separation-line
            "
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
