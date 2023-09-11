import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import * as Yup from 'yup';

import calendarIcon from '../../../assets/icons/CalendarIcon.svg';
import calendarIconRed from '../../../assets/icons/CalendarIconRed.svg';
import userIcon from '../../../assets/icons/UserIcon.svg';
import userIconRed from '../../../assets/icons/UserIconRed.svg';
import { CustomRegForm } from '../../../entities/form/ui';
import { validBirthDate, validName } from '../../../shared/const/validationSchemas';
import { ErrorMessage, inputAnimation, svgAnimation } from '../../../shared/ui';
import { UserFormProps } from '../types';

const validationSchema = Yup.object({
  ...validBirthDate(),
  firstName: validName().name,
  lastName: validName().name,
});

export default function RegStepTwo(props: UserFormProps) {
  const { firstName, lastName, dateOfBirth, updateData, enableNext } = props;
  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      dateOfBirth,
    },
    validationSchema,
    onSubmit: () => {},
  });
  const { handleChange, handleBlur, errors, touched, values } = formik;
  const [dateInputType, setDateInputType] = useState('text');
  const [isDateFocus, setIsDateFocus] = useState(false);

  function handleTransitionEnd() {
    setDateInputType(document.activeElement?.id === 'dateOfBirthInput' ? 'date' : 'text');
  }

  function blurHandler(e: React.FocusEvent<HTMLInputElement, Element>) {
    formik.handleBlur(e);
    setIsDateFocus((currVal) => !currVal);
  }
  function focusHandler(e: React.FocusEvent<HTMLInputElement, Element>) {
    formik.handleChange(e);
    setIsDateFocus((currVal) => !currVal);
  }

  useEffect(() => {
    updateData({ firstName: values.firstName, lastName: values.lastName, dateOfBirth: values.dateOfBirth });

    if (
      (touched.firstName === undefined && values.firstName === '') ||
      (touched.lastName === undefined && values.lastName === '') ||
      (touched.dateOfBirth === undefined && values.dateOfBirth === '')
    ) {
      enableNext(false);
      return;
    }
    if (errors.firstName || errors.lastName || errors.dateOfBirth) {
      enableNext(false);
      return;
    }
    enableNext(true);
  }, [values, errors, touched, updateData, enableNext]);

  const touchedAndErrorFirstName = touched.firstName && errors.firstName;
  const touchedAndErrorLastName = touched.lastName && errors.lastName;
  const touchedAndErrorBirthDate = touched.dateOfBirth && errors.dateOfBirth;

  return (
    <CustomRegForm>
      <div className="flex gap-5">
        <label htmlFor="firstNameInput" className="loginRegLabel">
          <motion.input
            initial={inputAnimation.initial}
            animate={inputAnimation.animate}
            transition={inputAnimation.transition}
            id="firstNameInput"
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
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`w-2/4 overflow-hidden transition-all duration-300 ease-bounce ${isDateFocus ? 'w-5/6' : ''}`}
        >
          <label htmlFor="dateOfBirthInput" className="loginRegLabel">
            <motion.input
              initial={inputAnimation.initial}
              animate={inputAnimation.animate}
              transition={{ ...inputAnimation.transition, delay: 0.15 }}
              id="dateOfBirthInput"
              type={dateInputType}
              name="dateOfBirth"
              placeholder="Birth date"
              onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => focusHandler(e)}
              className={`loginRegInput placeholder:placeholder-opacity-0 ${
                touchedAndErrorBirthDate ? 'border-shop-cart-red' : ''
              }`}
              onChange={handleChange}
              onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => blurHandler(e)}
              value={values.dateOfBirth}
            />
            <motion.img
              initial={svgAnimation.initial}
              animate={svgAnimation.animate}
              transition={{ ...svgAnimation.transition, delay: 0.25 }}
              className="invalidInputIcon"
              src={touchedAndErrorBirthDate ? calendarIconRed : calendarIcon}
              alt=""
            />
            {touchedAndErrorBirthDate && <ErrorMessage>{errors.dateOfBirth}</ErrorMessage>}
          </label>
        </div>
      </div>
      <label htmlFor="lastNameInput" className="loginRegLabel">
        <motion.input
          initial={inputAnimation.initial}
          animate={inputAnimation.animate}
          transition={{ ...inputAnimation.transition, delay: 0.1 }}
          id="lastNameInput"
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
    </CustomRegForm>
  );
}
