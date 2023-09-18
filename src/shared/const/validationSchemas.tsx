import * as Yup from 'yup';

import { padZero } from '../lib/helpers';

export const RESTRICTED_AGE = 13;

function correctDate(year: number, month: number, day: number) {
  return new Date(`${year}-${padZero(month + 1)}-${day.toString().padStart(2, '0')}`);
}

export function validEmail() {
  const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return {
    email: Yup.string()
      .matches(emailRegEx, { message: 'Email must be email@example.com', excludeEmptyString: true })
      .required('Email is required'),
  };
}

export function validPassword() {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&~()_+\-=':"}{/?<>;,.\]\\[*]).{8,}$/;

  return {
    password: Yup.string()
      .min(8, 'Minimum 8 symbols required')
      .matches(passwordRegex, { message: 'Password must have A, a, 1 and special symbols', excludeEmptyString: true })
      .required('Password is required'),
  };
}

export function validName() {
  const nameRegEx = /^[a-zA-Z]+$/;

  return {
    name: Yup.string()
      .matches(nameRegEx, { message: 'Name must contain A, a letters', excludeEmptyString: true })
      .max(20, 'Too long name')
      .required('Last name is required'),
  };
}

export function validBirthDate() {
  const currentDate = new Date();
  const ageLimit = correctDate(
    currentDate.getFullYear() - RESTRICTED_AGE,
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  return {
    dateOfBirth: Yup.date().max(ageLimit, 'Age restriction: 13+').required('Birth date is required'),
  };
}

export function validCity() {
  const cityRegEx = /^(?=.*[a-zA-Z])[a-zA-Z ]+$/;

  return {
    city: Yup.string()
      .matches(cityRegEx, { message: 'City name must contain only A, a letters', excludeEmptyString: true })
      .max(20, 'Too long name')
      .required('City name is required'),
  };
}

export function validPostalCode(country: string) {
  const usaPostCode = /^\d{5}(-\d{4})?$/;
  const ukrGerPostCode = /^\d{5}$/;

  function getRegEx(_country: string) {
    switch (_country) {
      case 'UA':
      case 'DE':
        return ukrGerPostCode;
      default:
        return usaPostCode;
    }
  }

  const billRegEx = getRegEx(country);

  return {
    postalCode: Yup.string()
      .matches(billRegEx, { message: 'Enter valid postal code', excludeEmptyString: true })
      .required('PostalCode is required'),
  };
}

export function validStreet() {
  const streetRegEx = /^(?=.*[a-zA-Z]).*$/;

  return {
    streetName: Yup.string()
      .matches(streetRegEx, { message: 'Street name must contain at least one letter', excludeEmptyString: true })
      .required('Street name is required'),
  };
}
