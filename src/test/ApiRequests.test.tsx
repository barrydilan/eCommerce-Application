import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it } from 'vitest';

import { TEST_ACCOUNT_EMAIL, TEST_ACCOUNT_PASSWORD } from './constants';
import { setupStore } from '../app/store';
import { useAnonymousSessionMutation, useLoginTokenMutation } from '../entities/user';

const mockUserData = { email: TEST_ACCOUNT_EMAIL, password: TEST_ACCOUNT_PASSWORD };

function wrapper({ children }: { children: React.ReactNode }) {
  const store = setupStore();
  return <Provider store={store}>{children}</Provider>;
}

describe('App', () => {
  it('Getting the anonymous token', async () => {
    const { result } = renderHook(() => useAnonymousSessionMutation(), { wrapper });

    const [getAnonToken, initialResponse] = result.current;

    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    await act(() => getAnonToken());

    const [, loadedResponse] = result.current;
    expect(loadedResponse.data).not.toBeUndefined();
    expect(loadedResponse.isLoading).toBe(false);
    expect(loadedResponse.isSuccess).toBe(true);
  });

  it('Getting the login token', async () => {
    const { result: loginRequestResult } = renderHook(() => useLoginTokenMutation(), { wrapper });

    const [loginUser, loginInitialResponse] = loginRequestResult.current;

    expect(loginInitialResponse.data).toBeUndefined();
    expect(loginInitialResponse.isLoading).toBe(false);

    await act(() => loginUser(mockUserData));

    const [, loginLoadedResponse] = loginRequestResult.current;
    expect(loginLoadedResponse.data).not.toBeUndefined();
    expect(loginLoadedResponse.isLoading).toBe(false);
    expect(loginLoadedResponse.isSuccess).toBe(true);
  });
});
