import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it } from 'vitest';

import { TEST_ACCOUNT_EMAIL, TEST_ACCOUNT_PASSWORD } from './constants';
import { setupStore } from '../app/store';
import { useAnonymousSessionMutation, useLoginTokenMutation, useRevokeTokenMutation } from '../entities/user';
import { TokenTypeHints } from '../shared/types';

interface ICleanUpTokens {
  accessTokens: string[];
  refreshTokens: string[];
}

const mockUserData = { email: TEST_ACCOUNT_EMAIL, password: TEST_ACCOUNT_PASSWORD };
const tokensToCleanUp: ICleanUpTokens = {
  accessTokens: [],
  refreshTokens: [],
};

function wrapper({ children }: { children: React.ReactNode }) {
  const store = setupStore();
  return <Provider store={store}>{children}</Provider>;
}

describe('Api requests', () => {
  afterAll(async () => {
    const { result } = renderHook(() => useRevokeTokenMutation(), { wrapper });

    const [revokeToken] = result.current;
    const { accessTokens, refreshTokens } = tokensToCleanUp;

    accessTokens.map((token) => {
      return act(() => {
        revokeToken({ token, tokenTypeHint: TokenTypeHints.ACCESS_TOKEN });
      });
    });

    refreshTokens.map((token) => {
      return act(() => {
        revokeToken({ token, tokenTypeHint: TokenTypeHints.REFRESH_TOKEN });
      });
    });
  });

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

    tokensToCleanUp.accessTokens.push(loadedResponse?.data?.access_token as string);
    tokensToCleanUp.refreshTokens.push(loadedResponse?.data?.refresh_token as string);
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

    tokensToCleanUp.accessTokens.push(loginLoadedResponse?.data?.access_token as string);
    tokensToCleanUp.refreshTokens.push(loginLoadedResponse?.data?.refresh_token as string);
  });
});
