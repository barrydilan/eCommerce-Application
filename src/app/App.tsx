import { useEffect } from 'react';

import { HashRouter, useLocation } from 'react-router-dom';

import LocationProvider from './utils/LocationProvider.tsx';
import RoutesWithAnimation from './utils/RoutesWithAnimation.tsx';
import { useCreateCartMutation } from '../entities/cart';
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
} else {
  document.documentElement.classList.remove('dark');
}

export function App() {
  const dispatch = useAppDispatch();
  const { loggedIn } = userSlice.actions;
  const location = useLocation();
  const isCartToRender = location.pathname.includes('/categories') || location.pathname.includes('/product');
  const [createCart, { data }] = useCreateCartMutation();

  useEffect(() => {
    const [token, userId, refreshToken] = getCookie(COOKIE_ACCESS_TOKEN, COOKIE_USER_ID, COOKIE_REFRESH_TOKEN);

    if (token && userId && refreshToken) {
      dispatch(loggedIn({ accessToken: token, userId, refreshToken }));
    }
  }, [dispatch, loggedIn]);

  console.log(data);

  useEffect(() => {
    createCart({ currency: 'USD' });
  }, []);

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
          ${isCartToRender ? 'md:grid-cols-deskGridCols' : 'md:grid-cols-noCartGrid'}
          ${isCartToRender ? 'lg:grid-cols-deskGridCols' : 'lg:grid-cols-noCartGrid'}
          `}
      >
        <Header />
        <div
          className="
            md:col-start-2
            md:col-end-3
            md:row-start-2
            md:row-end-3
            md:max-w-[400px]
            md:justify-self-center
            lg:max-w-[600px]
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
         hidden
         border-1
         md:col-start-3
         md:row-start-2
         md:block
         md:min-w-[11rem]
       md:border-separation-line
         lg:px-2"
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
