import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import RenderTestApp from './helpers/RenderTestApp.tsx';
import RegPage from '../pages/RegPage/RegPage.tsx';

describe('RegPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Renders the first step', () => {
    RenderTestApp(<RegPage />);

    const backBtn = screen.getByRole('button', { name: 'Back' });
    const continueBtn = screen.getByRole('button', { name: 'Continue' });

    expect(screen.getByText('Email & Password')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    expect(backBtn).toBeInTheDocument();
    expect(backBtn).toBeDisabled();

    expect(continueBtn).toBeInTheDocument();
    expect(continueBtn).toBeDisabled();
  });

  it('First step empty inputs', async () => {
    RenderTestApp(<RegPage />);

    await userEvent.click(screen.getByPlaceholderText('Email'));
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Email')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Email is required')).toBeInTheDocument();

    await userEvent.click(screen.getByPlaceholderText('Password'));
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Password')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('First step wrong inputs', async () => {
    RenderTestApp(<RegPage />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'testtesttest');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Email')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Email must be email@example.com')).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Password'), 'testtesttest');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Password')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Password must have A, a, 1 and special symbols')).toBeInTheDocument();
  });

  it('First step correct inputs', async () => {
    RenderTestApp(<RegPage />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Email')).not.toHaveClass('border-shop-cart-red');
    expect(screen.queryByText('Email is required')).toBeNull();

    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Password')).not.toHaveClass('border-shop-cart-red');
    expect(screen.queryByText('Password is required')).toBeNull();

    const continueBtn = screen.getByRole('button', { name: 'Continue' });

    expect(continueBtn).toBeEnabled();
    await userEvent.click(continueBtn);

    expect(screen.queryByPlaceholderText('Email')).toBeNull();
    expect(screen.queryByPlaceholderText('Password')).toBeNull();
    expect(screen.getByRole('button', { name: 'Back' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled();
  });

  it('Renders the second step', async () => {
    RenderTestApp(<RegPage />);

    /// ////////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// ////////////////////////////////////
    // Actual test

    const backBtn = screen.getByRole('button', { name: 'Back' });
    const continueBtn = screen.getByRole('button', { name: 'Continue' });

    expect(screen.getByText('Name & Birth')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Birth date')).toBeInTheDocument();

    expect(backBtn).toBeInTheDocument();
    expect(backBtn).toBeEnabled();

    expect(continueBtn).toBeInTheDocument();
    expect(continueBtn).toBeDisabled();
  });

  it('Second step empty inputs', async () => {
    RenderTestApp(<RegPage />);

    /// /////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////
    // Actual test

    await userEvent.click(screen.getByPlaceholderText('First name'));
    await userEvent.tab();

    expect(screen.getByPlaceholderText('First name')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Last name is required')).toBeInTheDocument();

    await userEvent.click(screen.getByPlaceholderText('Last name'));
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Last name')).toHaveClass('border-shop-cart-red');
    screen.getAllByText('Last name is required').forEach((match) => {
      expect(match).toBeInTheDocument();
    });

    await userEvent.click(screen.getByPlaceholderText('Birth date'));
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Birth date')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Birth date is required')).toBeInTheDocument();
  });

  it('Second step wrong inputs', async () => {
    RenderTestApp(<RegPage />);

    /// //////////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// //////////////////////////////////////
    // Actual test

    await userEvent.type(screen.getByPlaceholderText('First name'), 'dsadasdasdasdsadsaddd');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('First name')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Too long name')).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Last name'), 'dsadasdasdasdsadsaddd');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Last name')).toHaveClass('border-shop-cart-red');
    screen.getAllByText('Too long name').forEach((match) => {
      expect(match).toBeInTheDocument();
    });

    await userEvent.type(screen.getByPlaceholderText('Birth date'), '2020-02-02');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Birth date')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Age restriction: 13+')).toBeInTheDocument();
  });

  it('Second step correct inputs', async () => {
    RenderTestApp(<RegPage />);

    /// ///////////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// ///////////////////////////////////////
    // Actual test

    await userEvent.type(screen.getByPlaceholderText('First name'), 'test');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('First name')).not.toHaveClass('border-shop-cart-red');
    expect(screen.queryByText('Too long name')).toBeNull();
    expect(screen.queryByText('Last name is required')).toBeNull();

    await userEvent.type(screen.getByPlaceholderText('Last name'), 'test');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Last name')).not.toHaveClass('border-shop-cart-red');
    expect(screen.queryByText('Too long name')).toBeNull();
    expect(screen.queryByText('Last name is required')).toBeNull();

    await userEvent.type(screen.getByPlaceholderText('Birth date'), '2000-02-02');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Birth date')).not.toHaveClass('border-shop-cart-red');
    expect(screen.queryByText('Age restriction: 13+')).toBeNull();
    expect(screen.queryByText('Birth date is required')).toBeNull();

    expect(screen.getByRole('button', { name: 'Back' })).toBeEnabled();

    const continueBtn = screen.getByRole('button', { name: 'Continue' });
    expect(continueBtn).toBeEnabled();

    await userEvent.click(continueBtn);

    expect(screen.queryByPlaceholderText('First name')).toBeNull();
    expect(screen.queryByPlaceholderText('Last name')).toBeNull();
    expect(screen.queryByPlaceholderText('Birth date')).toBeNull();
  });
});
