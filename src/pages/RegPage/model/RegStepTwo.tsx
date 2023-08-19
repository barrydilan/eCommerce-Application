import { useEffect, useState } from 'react';

import { useFormik } from 'formik';

import { validSchemaStepTwo } from './validationSchemas';
import calendarIcon from '../../../assets/icons/CalendarIcon.svg';
import calendarIconRed from '../../../assets/icons/CalendarIconRed.svg';
import userIcon from '../../../assets/icons/UserIcon.svg';
import userIconRed from '../../../assets/icons/UserIconRed.svg';
import CustomRegForm from '../../../entities/form/ui';
import { UserFormProps } from '../types';

const validationSchema = validSchemaStepTwo();

export default function RegStepTwo(props: UserFormProps) {
  const { firstName, lastName, birthDate, updateData, enableNext } = props;
  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      birthDate,
    },
    validationSchema,
    onSubmit: () => {},
  });
  const { handleChange, handleBlur, errors, touched, values } = formik;
  const [dateInputType, setDateInputType] = useState('text');
  function blurHandler(e: React.FocusEvent<HTMLInputElement, Element>) {
    formik.handleBlur(e);
    setDateInputType('text');
  }
  function focusHandler(e: React.FocusEvent<HTMLInputElement, Element>) {
    formik.handleChange(e);
    setDateInputType('date');
  }

  useEffect(() => {
    updateData({ firstName: values.firstName, lastName: values.lastName, birthDate: values.birthDate });

    if (
      (touched.firstName === undefined && values.firstName === '') ||
      (touched.lastName === undefined && values.lastName === '') ||
      (touched.birthDate === undefined && values.birthDate === '')
    ) {
      enableNext(false);
      return;
    }
    if (errors.firstName || errors.lastName || errors.birthDate) {
      enableNext(false);
      return;
    }
    enableNext(true);
  }, [values, errors, touched, updateData, enableNext]);

  const touchedAndErrorFirstName = touched.firstName && errors.firstName;
  const touchedAndErrorLastName = touched.lastName && errors.lastName;
  const touchedAndErrorBirthDate = touched.birthDate && errors.birthDate;

  return (
    <CustomRegForm>
      <label htmlFor="firstNameInput" className="loginRegLabel">
        <input
          id="firstNameInput"
          type="text"
          name="firstName"
          placeholder="First name"
          className={`loginRegInput ${touchedAndErrorFirstName ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
        />
        <img className="invalidInputIcon" src={touchedAndErrorFirstName ? userIconRed : userIcon} alt="" />
        {touchedAndErrorFirstName && <p className="invalidInputMsg">{errors.firstName}</p>}
      </label>
      <label htmlFor="lastNameInput" className="loginRegLabel">
        <input
          id="lastNameInput"
          type="text"
          name="lastName"
          placeholder="Last name"
          className={`loginRegInput ${touchedAndErrorLastName ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
        />
        <img className="invalidInputIcon" src={touchedAndErrorLastName ? userIconRed : userIcon} alt="" />
        {touchedAndErrorLastName && <p className="invalidInputMsg">{errors.lastName}</p>}
      </label>
      <label htmlFor="birthDateInput" className="loginRegLabel">
        <input
          id="birthDateInput"
          type={dateInputType}
          name="birthDate"
          placeholder="Birth date"
          onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => focusHandler(e)}
          className={`loginRegInput ${touchedAndErrorBirthDate ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => blurHandler(e)}
          value={values.birthDate}
        />
        <img className="invalidInputIcon" src={touchedAndErrorBirthDate ? calendarIconRed : calendarIcon} alt="" />
        {touchedAndErrorBirthDate && <p className="invalidInputMsg">{formik.errors.birthDate}</p>}
      </label>
    </CustomRegForm>
  );
}
