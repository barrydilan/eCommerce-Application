import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';

import { validSchemaStepTwo } from './validationSchemas';
import calendarIcon from '../../../assets/icons/CalendarIcon.svg';
import calendarIconRed from '../../../assets/icons/CalendarIconRed.svg';
import userIcon from '../../../assets/icons/UserIcon.svg';
import userIconRed from '../../../assets/icons/UserIconRed.svg';
import CustomRegForm from '../../../entities/form/ui';
import { ErrorMessage } from '../../../shared/ui';
import { inputAnimation, svgAnimation } from '../../../shared/ui/animations';
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
  const [isDateFocus, setIsDateFocus] = useState(false);

  function handleTransitionEnd() {
    setDateInputType(document.activeElement?.id === 'birthDateInput' ? 'date' : 'text');
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
          {touchedAndErrorFirstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
        </label>
        <div className={`w-2/4 overflow-hidden transition-all duration-300 ease-bounce ${isDateFocus ? 'w-5/6' : ''}`}>
          <label onTransitionEnd={handleTransitionEnd} htmlFor="birthDateInput" className="loginRegLabel">
            <motion.input
              initial={inputAnimation.initial}
              animate={inputAnimation.animate}
              transition={inputAnimation.transition}
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
            <motion.img
              initial={svgAnimation.initial}
              animate={svgAnimation.animate}
              transition={svgAnimation.transition}
              className="invalidInputIcon"
              src={touchedAndErrorBirthDate ? calendarIconRed : calendarIcon}
              alt=""
            />
            {touchedAndErrorBirthDate && <ErrorMessage>{errors.birthDate}</ErrorMessage>}
          </label>
        </div>
      </div>
      <label htmlFor="lastNameInput" className="loginRegLabel">
        <motion.input
          initial={inputAnimation.initial}
          animate={inputAnimation.animate}
          transition={inputAnimation.transition}
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
          transition={svgAnimation.transition}
          className="invalidInputIcon"
          src={touchedAndErrorLastName ? userIconRed : userIcon}
          alt=""
        />
        {touchedAndErrorLastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
      </label>
    </CustomRegForm>
  );
}
