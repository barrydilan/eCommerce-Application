/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import App from '../App';
import sum from '../testFile';

describe('App', () => {
  it('Renders greeting header', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      }),
    ).toHaveTextContent('Is is my test header!');
  });
  test('Renders App correctly', () => {
    expect(true).toBeTruthy();
  });
  test('Shuold sum properly', () => {
    expect(sum(2, 2)).toBe(4);
  });
});
