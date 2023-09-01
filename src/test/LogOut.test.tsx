import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, vi } from 'vitest';

import { App } from '../app/App.tsx';
import { setupStore } from '../app/store';
import { userSlice } from '../entities/user';
import * as helpers from '../shared/lib/helpers';

let store = setupStore();

const deleteCookieSpy = vi.spyOn(helpers, 'deleteCookie');
const loggedOutSpy = vi.spyOn(userSlice.actions, 'loggedOut');
const updateAccessTokenSpy = vi.spyOn(userSlice.actions, 'updateAccessToken');

const testAccountEmail = 'MyEmail@gmail.com';
const testAccountPassword = '5i3wryMh@';

describe('LogOut', () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
    store = setupStore();
  });

  it('Logout is working', async () => {
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

    await waitFor(async () => {
      expect(screen.getByText('log out', { exact: false })).toBeInTheDocument();
      await userEvent.click(screen.getByText(/log out/i));
    });

    await waitFor(() => {
      expect(loggedOutSpy).toBeCalledTimes(1);
      expect(deleteCookieSpy).toBeCalledTimes(1);
    });

    expect(screen.queryByRole('button', { name: 'Log out' })).toBeNull();

    expect(window.location.pathname).toBe('/');
  });
});
