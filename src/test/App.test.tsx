import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import { App, WrappedApp } from '../app/App.tsx';
import { setupStore } from '../app/store';

const store = setupStore();
const nonExistedRoutes = ['/test-for-not-found-route'];

describe('App', () => {
  it('Renders the main logo', () => {
    render(
      <Provider store={store}>
        <WrappedApp />
      </Provider>,
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
      }),
    ).toHaveTextContent('Good food');
  });
  it('Renders the not found page if invalid path', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={nonExistedRoutes}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      screen.getByRole('heading', {
        level: 5,
      }),
    ).toHaveTextContent('404 error');
  });
});
