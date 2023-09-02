import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import * as Yup from 'yup';

import calendarIcon from '../../../assets/icons/CalendarIcon.svg';
import calendarIconRed from '../../../assets/icons/CalendarIconRed.svg';
import emailIcon from '../../../assets/icons/emailIcon.svg';
import emailIconRed from '../../../assets/icons/emailIconRed.svg';
import userIcon from '../../../assets/icons/UserIcon.svg';
import userIconRed from '../../../assets/icons/UserIconRed.svg';
import { validBirthDate, validEmail, validName } from '../../../shared/const/validationSchemas';
import { ErrorMessage, inputAnimation, svgAnimation } from '../../../shared/ui';

const validationSchema = Yup.object({
  ...validEmail(),
  ...validBirthDate(),
  firstName: validName().name,
  lastName: validName().name,
});

export default function ChangePersonalData(props: {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}) {
  const { email, firstName, lastName, birthDate } = props;

  const formik = useFormik({
    initialValues: {
      email,
      firstName,
      lastName,
      birthDate,
    },
    validationSchema,
    onSubmit: () => {},
  });

  const initData = Object.values(props);

  const { handleChange, handleBlur, errors, touched, values } = formik;
  const [dateInputType, setDateInputType] = useState('text');
  const [isSaveBlocked, setIsSaveBlocked] = useState(true);
  const touchedAndErrorEmail = touched.email && errors.email;
  const touchedAndErrorFirstName = touched.firstName && errors.firstName;
  const touchedAndErrorLastName = touched.lastName && errors.lastName;
  const touchedAndErrorBirthDate = touched.birthDate && errors.birthDate;

  function handleTransitionEnd() {
    setDateInputType(document.activeElement?.id === 'birthDate' ? 'date' : 'text');
  }

  useEffect(() => {
    if (
      initData.every((item) => {
        return Object.values(values).includes(item);
      })
    ) {
      setIsSaveBlocked(true);
      return;
    }
    if (errors.firstName || errors.lastName || errors.birthDate || errors.email) {
      setIsSaveBlocked(true);
      return;
    }
    setIsSaveBlocked(false);
  }, [values, errors, touched, initData]);

  return (
    <div className="border-b-2 border-separation-line">
      <h4 className="mx-auto mt-12 w-full text-center text-base font-medium">Personal data</h4>
      <div className="profileInputWrapper">
        <div className="text-base font-medium">Email</div>
        <label htmlFor="emailInput" className="loginRegLabel mt-5 sm:mt-0 sm:w-[470px]">
          <motion.input
            initial={inputAnimation.initial}
            animate={inputAnimation.animate}
            transition={inputAnimation.transition}
            id="emailInput"
            type="email"
            name="email"
            placeholder="Email"
            className={`loginRegInput ${touchedAndErrorEmail ? 'border-shop-cart-red' : ''}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <motion.img
            initial={svgAnimation.initial}
            animate={svgAnimation.animate}
            transition={svgAnimation.transition}
            className="invalidInputIcon"
            src={touchedAndErrorEmail ? emailIconRed : emailIcon}
            alt=""
          />
          {touchedAndErrorEmail && <ErrorMessage>{errors.email}</ErrorMessage>}
        </label>
      </div>
      <div className="profileInputWrapper">
        <div className="text-base font-medium">Name</div>
        <label htmlFor="firstName" className="loginRegLabel mt-5 sm:mt-0 sm:w-[470px]">
          <motion.input
            initial={inputAnimation.initial}
            animate={inputAnimation.animate}
            transition={inputAnimation.transition}
            id="firstName"
            type="text"
            name="firstName"
            placeholder="First name"
            className={`loginRegInput ${touchedAndErrorFirstName ? 'border-shop-cart-red' : ''}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
          />
          <motion.img
            initial={svgAnimation.initial}
            animate={svgAnimation.animate}
            transition={svgAnimation.transition}
            className="invalidInputIcon"
            src={touchedAndErrorFirstName ? userIconRed : userIcon}
            alt=""
          />
          <span className="text-sm">{touchedAndErrorFirstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}</span>
        </label>
      </div>
      <div className="profileInputWrapper">
        <div className="text-base font-medium">Surname</div>
        <label htmlFor="lastName" className="loginRegLabel mt-5 sm:mt-0 sm:w-[470px]">
          <motion.input
            initial={inputAnimation.initial}
            animate={inputAnimation.animate}
            transition={{ ...inputAnimation.transition, delay: 0.1 }}
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Last name"
            className={`loginRegInput ${touchedAndErrorLastName ? 'border-shop-cart-red' : ''}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
          />
          <motion.img
            initial={svgAnimation.initial}
            animate={svgAnimation.animate}
            transition={{ ...svgAnimation.transition, delay: 0.2 }}
            className="invalidInputIcon"
            src={touchedAndErrorLastName ? userIconRed : userIcon}
            alt=""
          />
          {touchedAndErrorLastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
        </label>
      </div>
      <div className="profileInputWrapper">
        <div className="text-base font-medium">Birth date</div>
        <label
          onTransitionEnd={handleTransitionEnd}
          htmlFor="birthDate"
          className="loginRegLabel mt-5 sm:mt-0 sm:w-[470px]"
        >
          <motion.input
            initial={inputAnimation.initial}
            animate={inputAnimation.animate}
            transition={{ ...inputAnimation.transition, delay: 0.15 }}
            id="birthDate"
            type={dateInputType}
            name="birthDate"
            placeholder="Birth date"
            onFocus={handleChange}
            className={`loginRegInput placeholder:placeholder-opacity-0 ${
              touchedAndErrorBirthDate ? 'border-shop-cart-red' : ''
            }`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.birthDate}
          />
          <motion.img
            initial={svgAnimation.initial}
            animate={svgAnimation.animate}
            transition={{ ...svgAnimation.transition, delay: 0.25 }}
            className="invalidInputIcon"
            src={touchedAndErrorBirthDate ? calendarIconRed : calendarIcon}
            alt=""
          />
          {touchedAndErrorBirthDate && <ErrorMessage>{errors.birthDate}</ErrorMessage>}
        </label>
      </div>
      <button
        className="mb-12 mt-5  h-10 w-full rounded-md bg-accent-lightest text-center text-accent transition-all duration-300 disabled:bg-separation-line"
        type="button"
        disabled={isSaveBlocked}
      >
        Save
      </button>
    </div>
  );
}
