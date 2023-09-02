// import { useEffect } from 'react';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import * as Yup from 'yup';

// import calendarIcon from '../../../assets/icons/CalendarIcon.svg';
// import calendarIconRed from '../../../assets/icons/CalendarIconRed.svg';
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

  const { handleChange, handleBlur, errors, touched, values } = formik;
  const touchedAndErrorEmail = touched.email && errors.email;
  const touchedAndErrorFirstName = touched.firstName && errors.firstName;
  const touchedAndErrorLastName = touched.lastName && errors.lastName;
  // const touchedAndErrorBirthDate = touched.birthDate && errors.birthDate;

  return (
    <div>
      <h4 className="mx-auto mt-5 w-full text-center text-base font-medium">Personal data</h4>
      <div className="my-4">
        <div className="text-base font-medium">Email</div>
        <label htmlFor="emailInput" className="loginRegLabel mt-5">
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
      <div className="my-4">
        <div className="text-base font-medium">Name</div>
        <label htmlFor="firstName" className="loginRegLabel">
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
      <div className="my-4">
        <div className="text-base font-medium">Surname</div>
        <label htmlFor="lastName" className="loginRegLabel">
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
    </div>
  );
}
