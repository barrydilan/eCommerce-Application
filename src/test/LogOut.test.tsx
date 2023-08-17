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
const clearLocalStorageSpy = vi.spyOn(helpers, 'clearLocalStorage');
const loggedOutSpy = vi.spyOn(userSlice.actions, 'loggedOut');

const testAccountEmail = 'MyEmail@gmail.com';
const testAccountPassword = '5i3wryMh@';

describe('LogOut', () => {
  afterEach(() => {
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

    await userEvent.type(screen.getByPlaceholderText('Email'), testAccountEmail);
    await userEvent.type(screen.getByPlaceholderText('Password'), testAccountPassword);

    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));

    const logoutBtn = await screen.findByRole('button', { name: 'Log out' });
    expect(logoutBtn).toBeInTheDocument();

    await userEvent.click(logoutBtn);

    await waitFor(() => {
      expect(loggedOutSpy).toBeCalledTimes(1);
      expect(clearLocalStorageSpy).toBeCalledTimes(1);
      expect(deleteCookieSpy).toBeCalledTimes(1);
    });

    expect(screen.queryByRole('button', { name: 'Log out' })).toBeNull();
  });
});
