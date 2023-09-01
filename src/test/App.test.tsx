import { screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import RenderTestApp from './helpers/RenderTestApp.tsx';
import { App } from '../app/App.tsx';

describe('App', () => {
  it('Renders the main logo', () => {
    RenderTestApp(<App />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      }),
    ).toHaveTextContent('SushiSushi');
  });

  it('Renders the not found page if invalid path', () => {
    RenderTestApp(<App />, '/eCommerce-Application/test-for-not-found-route');

    expect(
      screen.getByRole('heading', {
        level: 5,
      }),
    ).toHaveTextContent('404 error');
  });

  it('Renders the login page', () => {
    RenderTestApp(<App />, '/login');

    expect(
      screen.getByRole('heading', {
        level: 5,
      }),
    ).toHaveTextContent('Log in');

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument();
  });

  it('Renders the sign up page', () => {
    RenderTestApp(<App />, '/registration');

    expect(screen.getByText('Email & Password', { exact: false })).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Log in' })).toBeInTheDocument();
  });

  // it('Renders the menu page', () => {
  //   RenderTestApp(<App />);
  //
  //   expect(screen.getByText('Here will be main content', { exact: false })).toBeInTheDocument();
  // });
  //
  // it('Renders the about page', () => {
  //   RenderTestApp(<App />, '/about');
  //
  //   expect(screen.getByText('About us', { exact: false })).toBeInTheDocument();
  // });
});
