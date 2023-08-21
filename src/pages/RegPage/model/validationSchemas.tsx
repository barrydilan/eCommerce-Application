import * as Yup from 'yup';

export function validSchemaStepOne() {
  const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&~()_+\-=':"}{/?<>;,.\]\\[*])(?!.*\s).{8,}$/;

  return Yup.object({
    email: Yup.string()
      .matches(emailRegEx, { message: 'Email must follow email@example.com pattern', excludeEmptyString: true })
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Minimum 8 symbols required')
      .matches(passwordRegex, { message: 'Password must have A, a, 1, ! symbols', excludeEmptyString: true })
      .required('Password is required'),
  });
}

export function validSchemaStepTwo() {
  const nameRegEx = /^[a-zA-Z]+$/;
  const currentDate = new Date();
  const max = new Date(currentDate.getFullYear() - 13, currentDate.getMonth(), currentDate.getDate());
  const ageLimit = `${max.getFullYear()} ${max.getMonth()} ${max.getDate()}`;

  return Yup.object({
    firstName: Yup.string()
      .matches(nameRegEx, { message: 'First name must contain only letters', excludeEmptyString: true })
      .max(20, 'Too long name')
      .required('First name is required'),
    lastName: Yup.string()
      .matches(nameRegEx, { message: 'Last name must contain A, a letters', excludeEmptyString: true })
      .max(20, 'Too long name')
      .required('Last name is required'),
    birthDate: Yup.date().max(ageLimit, 'Age restriction: 13+').required('Birth date is required'),
  });
}

export function validSchemaStepThree() {
  const cityRegEx = /^(?=.*[a-zA-Z])[a-zA-Z ]+$/;

  return Yup.object({
    billCity: Yup.string()
      .matches(cityRegEx, { message: 'City name must contain only letters', excludeEmptyString: true })
      .max(20, 'Too long name')
      .required('City name is required'),
    shipCity: Yup.string()
      .matches(cityRegEx, { message: 'City name must contain A, a letters', excludeEmptyString: true })
      .max(20, 'Too long name')
      .required('City name is required'),
  });
}

export function validSchemaStepFour(billCountry: string, shipCountry: string) {
  const usaPostCode = /^\d{5}(-\d{4})?$/;
  const ukrGerPostCode = /^\d{5}$/;
  const streetRegEx = /^(?=.*[a-zA-Z]).*$/;

  function getRegEx(country: string) {
    switch (country) {
      case 'ukraine':
      case 'germany':
        return ukrGerPostCode;
      default:
        return usaPostCode;
    }
  }

  const billRegEx = getRegEx(billCountry);
  const shipRegEx = getRegEx(shipCountry);

  return Yup.object({
    billPostalCode: Yup.string()
      .matches(billRegEx, { message: 'Enter valid postal code', excludeEmptyString: true })
      .required('PostalCode is required'),
    billStreet: Yup.string()
      .matches(streetRegEx, { message: 'Street name must contain at least one letter', excludeEmptyString: true })
      .required('Street name is required'),
    shipPostalCode: Yup.string()
      .matches(shipRegEx, { message: 'Enter valid postal code', excludeEmptyString: true })
      .required('PostalCode is required'),
    shipStreet: Yup.string()
      .matches(streetRegEx, { message: 'Street name must contain at least one letter', excludeEmptyString: true })
      .required('Street name is required'),
  });
}
