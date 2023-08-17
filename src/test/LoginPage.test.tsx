import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, it, vi } from 'vitest';

import { App } from '../app/App.tsx';
import { setupStore } from '../app/store';
import { userSlice } from '../entities/user';
import LoginPage from '../pages/LoginPage/LoginPage.tsx';
import * as helpers from '../shared/lib/helpers';

let store = setupStore();

const loggedInSpy = vi.spyOn(userSlice.actions, 'loggedIn');
const setCookieSpy = vi.spyOn(helpers, 'setCookie');
const setLocalStorageSpy = vi.spyOn(helpers, 'setLocalStorage');
const updateAccessTokenSpy = vi.spyOn(userSlice.actions, 'updateAccessToken');

const testAccountEmail = 'MyEmail@gmail.com';
const testAccountPassword = '5i3wryMh@';

describe('LoginPage', () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
    store = setupStore();
  });

  it('Renders the form', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('Hides the password', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByRole('checkbox')).not.toBeChecked();

    fireEvent.input(screen.getByPlaceholderText('Password'), {
      target: { value: '123' },
    });

    fireEvent.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByPlaceholderText('Password')).toHaveValue('123');
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'text');

    fireEvent.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByPlaceholderText('Password')).toHaveValue('123');
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
  });

  it('Show error on wrong Email input', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByPlaceholderText('Email'));
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Email')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Email is required')).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Email')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Email must follow email@example.com pattern')).toBeInTheDocument();
  });

  it('Show error on wrong Password input', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByPlaceholderText('Password'));
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Password')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Password required')).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Password'), 'test');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Password')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Minimum 8 symbols required')).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Password'), 'testtesttest');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Password')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Password must have A, a, 1, ! symbols')).toBeInTheDocument();
  });

  it('Show errors on wrong submit', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));

    expect(screen.getByPlaceholderText('Email')).toHaveClass('border-shop-cart-red');
    expect(screen.getByPlaceholderText('Password')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Password required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();

    expect(Object.keys(store.getState().authApi.mutations)).toHaveLength(0);
    expect(store.getState().userReducer.isLogged).toBeFalsy();
    expect(store.getState().userReducer.accessToken).toHaveLength(0);
  });

  it('Success submit', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(updateAccessTokenSpy).toBeCalled();
    });

    await userEvent.type(screen.getByPlaceholderText('Email'), testAccountEmail);
    await userEvent.type(screen.getByPlaceholderText('Password'), testAccountPassword);

    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));

    expect(screen.getByPlaceholderText('Email')).not.toHaveClass('border-shop-cart-red');
    expect(screen.getByPlaceholderText('Password')).not.toHaveClass('border-shop-cart-red');
    expect(screen.queryByText('Password required')).toBeNull();
    expect(screen.queryByText('Email is required')).toBeNull();

    expect(Object.keys(store.getState().authApi.mutations)).toHaveLength(2);

    await waitFor(() => {
      expect(loggedInSpy).toBeCalledTimes(1);
      expect(setCookieSpy).toBeCalledTimes(1);
      expect(setLocalStorageSpy).toBeCalledTimes(1);
    });

    expect(screen.getByText('log out', { exact: false })).toBeInTheDocument();
    expect(screen.queryByText('Log in')).toBeNull();

    expect(store.getState().userReducer.isLogged).toBeTruthy();
    expect(store.getState().userReducer.accessToken.length).toBeGreaterThan(0);

    expect(window.location.pathname).toBe('/');
  });

  it('Route to the main page and not to send new request on the second login', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(updateAccessTokenSpy).toBeCalled();
    });

    await userEvent.type(screen.getByPlaceholderText('Email'), testAccountEmail);
    await userEvent.type(screen.getByPlaceholderText('Password'), testAccountPassword);

    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(screen.getByText('log out', { exact: false })).toBeInTheDocument();
    });

    expect(loggedInSpy).toBeCalledTimes(1);
    expect(setCookieSpy).toBeCalledTimes(1);

    window.history.back();

    window.onpopstate = async () => {
      expect(window.location.pathname).toBe('/login');

      await userEvent.click(screen.getByRole('button', { name: 'Log in' }));

      expect(loggedInSpy).toBeCalledTimes(1);
      expect(setCookieSpy).toBeCalledTimes(1);
      expect(window.location.pathname).toBe('/');
    };
  });

  // TODO - Add test for routing to the registration page
});
