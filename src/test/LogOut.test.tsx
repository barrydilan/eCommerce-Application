import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import RenderTestApp from './helpers/RenderTestApp.tsx';
import { App } from '../app/App.tsx';
import { userSlice } from '../entities/user';
import * as helpers from '../shared/lib/helpers';

const deleteCookieSpy = vi.spyOn(helpers, 'deleteCookie');
const loggedOutSpy = vi.spyOn(userSlice.actions, 'loggedOut');

describe('LogOut', () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });

  it('Logout is working', async () => {
    RenderTestApp(<App />, '/login', {
      userReducer: { isLogged: true },
    });

    expect(screen.getByText('log out', { exact: false })).toBeInTheDocument();

    await userEvent.click(screen.getByText(/log out/i));

    await waitFor(() => {
      expect(loggedOutSpy).toBeCalledTimes(1);
      expect(deleteCookieSpy).toBeCalledTimes(1);
    });

    expect(screen.queryByRole('button', { name: 'Log out' })).toBeNull();
  });
});
