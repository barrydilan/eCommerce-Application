import { useState } from 'react';

import { useFormik } from 'formik';

import { validSchemaStepTwo } from './validationSchemas';
import calendarIcon from '../../../assets/icons/CalendarIcon.svg';
import calendarIconRed from '../../../assets/icons/CalendarIconRed.svg';
import userIcon from '../../../assets/icons/UserIcon.svg';
import userIconRed from '../../../assets/icons/UserIconRed.svg';
import CustomForm from '../../../entities/form/ui/CustomForm';
import NavBlock from '../ui/NavBlock';

const validationSchema = validSchemaStepTwo();

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
  function blurHandler() {
    formik.handleBlur;
    setDateInputType('text');
  }
  function focusHandler() {
    formik.handleChange;
    setDateInputType('date');
  }

  return (
    <CustomForm onSubmit={handleSubmit}>
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
          onFocus={focusHandler}
          className={`loginRegInput ${touched.birthDate && errors.birthDate ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={blurHandler}
          value={values.birthDate}
        />
        <img
          className="invalidInputIcon"
          src={touched.birthDate && errors.birthDate ? calendarIconRed : calendarIcon}
          alt=""
        />
        {touched.birthDate && errors.birthDate && <p className="invalidInputMsg">{formik.errors.birthDate}</p>}
      </label>
      <NavBlock isBackBtn backFunc={back} nextFunc={undefined} />
    </CustomForm>
  );
}
