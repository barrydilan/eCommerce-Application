import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import { App, WrappedApp } from '../app/App.tsx';

const nonExistedRoutes = ['/test-for-not-found-route'];

describe('App', () => {
  it('Renders the main logo', () => {
    render(<WrappedApp />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      }),
    ).toHaveTextContent('Good food');
  });
  it('Renders the not found page if invalid path', () => {
    render(
      <MemoryRouter initialEntries={nonExistedRoutes}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {
        level: 5,
      }),
    ).toHaveTextContent('404 error');
  });
});
