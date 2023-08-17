import { useEffect, useState } from 'react';

import { useFormik } from 'formik';

import { validSchemaStepTwo } from './validationSchemas';
import calendarIcon from '../../../assets/icons/CalendarIcon.svg';
import calendarIconRed from '../../../assets/icons/CalendarIconRed.svg';
import userIcon from '../../../assets/icons/UserIcon.svg';
import userIconRed from '../../../assets/icons/UserIconRed.svg';

const validationSchema = validSchemaStepTwo();

type UserData = {
  firstName: string;
  lastName: string;
  birthDate: string;
};

type UserFormProps = UserData & {
  updateData: (fields: UserData) => void;
  setBtnEnabled: (arg: boolean) => void;
  next: () => void;
};

export default function RegStepTwo(props: UserFormProps) {
  const { firstName, lastName, birthDate, updateData, next, setBtnEnabled } = props;
  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      birthDate,
    },
    validationSchema,
    onSubmit: (values) => {
      updateData({ firstName: values.firstName, lastName: values.lastName, birthDate: values.birthDate });
      next();
    },
  });
  const { handleSubmit, handleChange, handleBlur, errors, touched, values } = formik;
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
      setBtnEnabled(false);
      return;
    }
    if (errors.firstName || errors.lastName || errors.birthDate) {
      setBtnEnabled(false);
      return;
    }
    setBtnEnabled(true);
  }, [values, errors, touched]);

  return (
    <form
      onSubmit={handleSubmit}
      className="
        ml-3 
        mr-3 
        box-border 
        w-full
        font-medium
        text-text-grey
      "
    >
      <label htmlFor="firstNameInput" className="loginRegLabel">
        <input
          id="firstNameInput"
          type="text"
          name="firstName"
          placeholder="First name"
          className={`loginRegInput ${touched.firstName && errors.firstName ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
        />
        <img className="invalidInputIcon" src={touched.firstName && errors.firstName ? userIconRed : userIcon} alt="" />
        {touched.firstName && errors.firstName && <p className="invalidInputMsg">{errors.firstName}</p>}
      </label>
      <label htmlFor="lastNameInput" className="loginRegLabel">
        <input
          id="lastNameInput"
          type="text"
          name="lastName"
          placeholder="Last name"
          className={`loginRegInput ${touched.lastName && errors.lastName ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
        />
        <img className="invalidInputIcon" src={touched.lastName && errors.lastName ? userIconRed : userIcon} alt="" />
        {touched.lastName && errors.lastName && <p className="invalidInputMsg">{errors.lastName}</p>}
      </label>
      <label htmlFor="birthDateInput" className="loginRegLabel">
        <input
          id="birthDateInput"
          type={dateInputType}
          name="birthDate"
          placeholder="Birth date"
          onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => focusHandler(e)}
          className={`loginRegInput ${touched.birthDate && errors.birthDate ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => blurHandler(e)}
          value={values.birthDate}
        />
        <img
          className="invalidInputIcon"
          src={touched.birthDate && errors.birthDate ? calendarIconRed : calendarIcon}
          alt=""
        />
        {touched.birthDate && errors.birthDate && <p className="invalidInputMsg">{formik.errors.birthDate}</p>}
      </label>
    </form>
  );
}
