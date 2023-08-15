import { useState } from 'react';

import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import calendarIcon from '../../../assets/icons/CalendarIcon.svg';
import calendarIconRed from '../../../assets/icons/CalendarIconRed.svg';
import userIcon from '../../../assets/icons/UserIcon.svg';
import userIconRed from '../../../assets/icons/UserIconRed.svg';
import CustomForm from '../../../entities/form/ui/CustomForm';

const nameRegEx = /^[a-zA-Z]+$/;

const currentDate = new Date();
const max = new Date(currentDate.getFullYear() - 13, currentDate.getMonth(), currentDate.getDate());
const ageLimit = `${max.getFullYear()} ${max.getMonth()} ${max.getDate()}`;

const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(nameRegEx, { message: 'First name must contain only letters', excludeEmptyString: true })
    .max(20, 'Too long name')
    .required('First name is required'),
  lastName: Yup.string()
    .matches(nameRegEx, { message: 'Last name must contain A, a letters', excludeEmptyString: true })
    .max(20, 'Too long name')
    .required('Last name is required'),
  birthDate: Yup.date().max(ageLimit, 'You can`t use service if under 13 years old').required('Birth date is required'),
});

type UserData = {
  firstName: string;
  lastName: string;
  birthDate: string;
};

type UserFormProps = UserData & {
  updateData: (fields: UserData) => void;
  next: () => void;
  back: () => void;
};

export default function RegStepTwo(props: UserFormProps) {
  const { firstName, lastName, birthDate, updateData, back, next } = props;
  const [dateInputType, setDateInputType] = useState('text');
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
  function blurHandler() {
    formik.handleBlur;
    setDateInputType('text');
  }
  function focusHandler() {
    formik.handleChange;
    setDateInputType('date');
  }

  return (
    <CustomForm onSubmit={formik.handleSubmit}>
      <label htmlFor="firstNameInput" className="loginRegLabel">
        <input
          id="firstNameInput"
          type="text"
          name="firstName"
          placeholder="First name"
          className={`loginRegInput ${
            formik.touched.firstName && formik.errors.firstName ? 'border-shop-cart-red' : ''
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        <img
          className="invalidInputIcon"
          src={formik.touched.firstName && formik.errors.firstName ? userIconRed : userIcon}
          alt=""
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <p className="invalidInputMsg">{formik.errors.firstName}</p>
        ) : null}
      </label>
      <label htmlFor="lastNameInput" className="loginRegLabel">
        <input
          id="lastNameInput"
          type="text"
          name="lastName"
          placeholder="Last name"
          className={`loginRegInput ${formik.touched.lastName && formik.errors.lastName ? 'border-shop-cart-red' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        <img
          className="invalidInputIcon"
          src={formik.touched.lastName && formik.errors.lastName ? userIconRed : userIcon}
          alt=""
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <p className="invalidInputMsg">{formik.errors.lastName}</p>
        ) : null}
      </label>
      <label htmlFor="birthDateInput" className="loginRegLabel">
        <input
          id="birthDateInput"
          type={dateInputType}
          name="birthDate"
          placeholder="Birth date"
          onFocus={focusHandler}
          className={`loginRegInput ${
            formik.touched.birthDate && formik.errors.birthDate ? 'border-shop-cart-red' : ''
          }`}
          onChange={formik.handleChange}
          onBlur={blurHandler}
          value={formik.values.birthDate}
        />
        <img
          className="invalidInputIcon"
          src={formik.touched.birthDate && formik.errors.birthDate ? calendarIconRed : calendarIcon}
          alt=""
        />
        {formik.touched.birthDate && formik.errors.birthDate ? (
          <p className="invalidInputMsg">{formik.errors.birthDate}</p>
        ) : null}
      </label>
      <div className="mt-6 flex items-center justify-between font-poppins text-text-grey">
        <button type="button" className="h-10 p-2" onClick={back}>
          Back
        </button>
        <p className="text-center text-xs sm:leading-10">
          Already have an account?{' '}
          <Link className="font-bold text-accent" to="/login">
            Log in
          </Link>
        </p>
        <button type="submit" className="h-10 rounded-lg bg-accent p-2 text-primary">
          Continue
        </button>
      </div>
    </CustomForm>
  );
}
