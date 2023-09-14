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

  it('Renders the third step', async () => {
    RenderTestApp(<RegPage />);

    /// ///////////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the second step

    await userEvent.type(screen.getByPlaceholderText('First name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Birth date'), '2000-02-02');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Actual test

    const backBtn = screen.getByRole('button', { name: 'Back' });
    const continueBtn = screen.getByRole('button', { name: 'Continue' });
    const useSameAddressCheckbox = screen.getByTestId('checkbox');

    expect(screen.getByText('Country & City')).toBeInTheDocument();
    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
    expect(useSameAddressCheckbox).toBeInTheDocument();
    expect(useSameAddressCheckbox).toBeChecked();

    expect(backBtn).toBeInTheDocument();
    expect(backBtn).toBeEnabled();
    expect(continueBtn).toBeInTheDocument();
    expect(continueBtn).toBeDisabled();

    const options = screen.getAllByTestId('select-option');
    expect(options[0]).toHaveValue('US');
    expect(options[1]).toHaveValue('UA');
    expect(options[2]).toHaveValue('DE');

    expect(options[0]).toHaveTextContent('USA');
    expect(options[1]).toHaveTextContent('Ukraine');
    expect(options[2]).toHaveTextContent('Germany');

    await userEvent.click(useSameAddressCheckbox);

    expect(screen.getByTestId('checkbox')).not.toBeChecked();

    screen.getAllByTestId('select').forEach((select) => {
      expect(select).toBeInTheDocument();
    });

    screen.getAllByPlaceholderText('City').forEach((input) => {
      expect(input).toBeInTheDocument();
    });
  });

  it('Third step empty inputs', async () => {
    RenderTestApp(<RegPage />);

    /// ///////////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the second step

    await userEvent.type(screen.getByPlaceholderText('First name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Birth date'), '2000-02-02');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Actual test

    await userEvent.click(screen.getByPlaceholderText('City'));
    await userEvent.tab();

    expect(screen.getByPlaceholderText('City')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('City name is required')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('checkbox'));

    const cities = screen.getAllByPlaceholderText('City');

    const waitUserEvents = cities.map(async (city) => {
      await userEvent.click(city);
      await userEvent.tab();
    });

    await Promise.all(waitUserEvents);

    cities.forEach((city) => {
      expect(city).toHaveClass('border-shop-cart-red');
    });

    expect(screen.getAllByText('City name is required')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled();
  });

  it('Third step wrong inputs', async () => {
    RenderTestApp(<RegPage />);

    /// ///////////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the second step

    await userEvent.type(screen.getByPlaceholderText('First name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Birth date'), '2000-02-02');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Actual test

    await userEvent.type(screen.getByPlaceholderText('City'), 'dsadasdasdasdsadsaddd');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('City')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Too long name')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('checkbox'));

    const cities = screen.getAllByPlaceholderText('City');

    const waitUserEvents = cities.map(async (city) => {
      await userEvent.type(city, 'dsadasdasdasdsadsaddd');
      await userEvent.tab();
    });

    await Promise.all(waitUserEvents);

    cities.forEach((city) => {
      expect(city).toHaveClass('border-shop-cart-red');
    });

    expect(screen.getAllByText('Too long name')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled();
  });

  it('Third step correct inputs', async () => {
    RenderTestApp(<RegPage />);

    /// ///////////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the second step

    await userEvent.type(screen.getByPlaceholderText('First name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Birth date'), '2000-02-02');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Actual test

    await userEvent.type(screen.getByPlaceholderText('City'), 'test');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('City')).not.toHaveClass('border-shop-cart-red');
    expect(screen.queryByText('Too long name')).toBeNull();

    await userEvent.click(screen.getByTestId('checkbox'));

    const cities = screen.getAllByPlaceholderText('City');

    const waitUserEvents = cities.map(async (city) => {
      await userEvent.type(city, 'test');
      await userEvent.tab();
    });

    await Promise.all(waitUserEvents);

    cities.forEach((city) => {
      expect(city).not.toHaveClass('border-shop-cart-red');
    });

    expect(screen.queryAllByText('Too long name')).toHaveLength(0);
    expect(screen.getByRole('button', { name: 'Continue' })).toBeEnabled();
  });

  it('Third step select is working properly', async () => {
    RenderTestApp(<RegPage />);

    /// ///////////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the second step

    await userEvent.type(screen.getByPlaceholderText('First name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Birth date'), '2000-02-02');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Actual test

    const options = screen.getAllByTestId('select-option');
    expect((options.at(0) as HTMLOptionElement).selected).toBeTruthy();
    expect((options.at(1) as HTMLOptionElement).selected).toBeFalsy();
    expect((options.at(2) as HTMLOptionElement).selected).toBeFalsy();

    await userEvent.selectOptions(screen.getByTestId('select'), 'UA');

    const options2 = screen.getAllByTestId('select-option');

    expect((options2.at(0) as HTMLOptionElement).selected).toBeFalsy();
    expect((options2.at(1) as HTMLOptionElement).selected).toBeTruthy();
    expect((options2.at(2) as HTMLOptionElement).selected).toBeFalsy();

    await userEvent.selectOptions(screen.getByTestId('select'), 'DE');

    const options3 = screen.getAllByTestId('select-option');

    expect((options3.at(0) as HTMLOptionElement).selected).toBeFalsy();
    expect((options3.at(1) as HTMLOptionElement).selected).toBeFalsy();
    expect((options3.at(2) as HTMLOptionElement).selected).toBeTruthy();
  });

  it('Renders the fourth step', async () => {
    RenderTestApp(<RegPage />);

    /// ///////////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the second step

    await userEvent.type(screen.getByPlaceholderText('First name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Birth date'), '2000-02-02');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the third step

    await userEvent.type(screen.getByPlaceholderText('City'), 'test');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Actual test

    const backBtn = screen.getByRole('button', { name: 'Back' });
    const continueBtn = screen.getByRole('button', { name: 'Continue' });

    expect(screen.getByText('PC & Street')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Postal code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Street')).toBeInTheDocument();

    expect(backBtn).toBeInTheDocument();
    expect(backBtn).toBeEnabled();
    expect(continueBtn).toBeInTheDocument();
    expect(continueBtn).toBeDisabled();
  });

  it('Fourth step empty inputs', async () => {
    RenderTestApp(<RegPage />);

    /// ///////////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the second step

    await userEvent.type(screen.getByPlaceholderText('First name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Birth date'), '2000-02-02');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the third step

    await userEvent.type(screen.getByPlaceholderText('City'), 'test');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Actual test

    await userEvent.click(screen.getByPlaceholderText('Postal code'));
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Postal code')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('PostalCode is required')).toBeInTheDocument();

    await userEvent.click(screen.getByPlaceholderText('Street'));
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Street')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Street name is required')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled();
  });

  it('Fourth step wrong inputs', async () => {
    RenderTestApp(<RegPage />);

    /// ///////////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the second step

    await userEvent.type(screen.getByPlaceholderText('First name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Birth date'), '2000-02-02');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the third step

    await userEvent.type(screen.getByPlaceholderText('City'), 'test');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Actual test

    await userEvent.type(screen.getByPlaceholderText('Postal code'), 'dsadasdasdasdsadsaddd');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Postal code')).toHaveClass('border-shop-cart-red');
    expect(screen.getByText('Enter valid postal code')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled();
  });

  it('Third step correct inputs', async () => {
    RenderTestApp(<RegPage />);

    /// ///////////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the second step

    await userEvent.type(screen.getByPlaceholderText('First name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Birth date'), '2000-02-02');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the third step

    await userEvent.type(screen.getByPlaceholderText('City'), 'test');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Actual test

    await userEvent.type(screen.getByPlaceholderText('Postal code'), '33333-3333');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Postal code')).not.toHaveClass('border-shop-cart-red');
    expect(screen.queryByText('Enter valid postal code')).toBeNull();

    await userEvent.type(screen.getByPlaceholderText('Street'), 'street');
    await userEvent.tab();

    expect(screen.getByPlaceholderText('Street')).not.toHaveClass('border-shop-cart-red');
    expect(screen.queryByText('Street name is required')).toBeNull();

    expect(screen.getByRole('button', { name: 'Continue' })).toBeEnabled();
  });

  it('Failed submit', async () => {
    RenderTestApp(<RegPage />);

    /// ///////////////////////////////////////
    // Skip the first step

    await userEvent.type(screen.getByPlaceholderText('Email'), 'MyEmail@gmail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword123#');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the second step

    await userEvent.type(screen.getByPlaceholderText('First name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Birth date'), '2000-02-02');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the third step

    await userEvent.type(screen.getByPlaceholderText('City'), 'test');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Skip the fourth step

    await userEvent.type(screen.getByPlaceholderText('Postal code'), '33333-3333');
    await userEvent.type(screen.getByPlaceholderText('Street'), 'street');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    /// /////////////////////////////////////
    // Actual test

    const errorMessage = await screen.findByText('Oh snap!');
    const description = await screen.findByText('Change a few things up and try again');
    const continueBtn = await screen.findByText('Continue');

    expect(errorMessage).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(continueBtn).toBeInTheDocument();
  });
});
