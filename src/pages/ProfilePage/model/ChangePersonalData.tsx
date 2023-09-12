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
import { useLazyGetUserQuery, useUpdateUserDataMutation } from '../../../entities/user';
import UserUpdateActions from '../../../entities/user/types/enums.ts';
import { validBirthDate, validEmail, validName } from '../../../shared/const/validationSchemas';
import { IUser } from '../../../shared/types';
import { ErrorMessage, inputAnimation, svgAnimation } from '../../../shared/ui';
import MODAL_TIMEOUT from '../constants/constants.ts';
import InfoModal from '../ui/InfoModal';

const validationSchema = Yup.object({
  ...validEmail(),
  ...validBirthDate(),
  firstName: validName().name,
  lastName: validName().name,
});

export default function ChangePersonalData(props: { userData: IUser }) {
  const [updateUser] = useUpdateUserDataMutation();

  const { userData } = props;
  const { id, email, firstName, lastName, dateOfBirth, version } = userData;

  const formik = useFormik({
    initialValues: {
      email,
      firstName,
      lastName,
      dateOfBirth,
    },
    validationSchema,
    onSubmit: () => {},
  });

  const initData = Object.values([email, firstName, lastName, dateOfBirth]);

  const { handleChange, handleBlur, errors, touched, values } = formik;
  const [isSaveBlocked, setIsSaveBlocked] = useState(true);
  const [msgModalShown, setMsgModalShown] = useState(false);
  const [msgModalText, setMsgModalText] = useState('');
  const [getUser] = useLazyGetUserQuery();

  const touchedAndErrorEmail = touched.email && errors.email;
  const touchedAndErrorFirstName = touched.firstName && errors.firstName;
  const touchedAndErrorLastName = touched.lastName && errors.lastName;
  const touchedAndErrorBirthDate = touched.dateOfBirth && errors.dateOfBirth;

  async function saveClickHandler() {
    try {
      await updateUser({
        version,
        actions: [
          {
            action: UserUpdateActions.CHANGE_EMAIL,
            email: values.email,
          },
          {
            action: UserUpdateActions.SET_FIRST_NAME,
            firstName: values.firstName,
          },
          {
            action: UserUpdateActions.SET_LAST_NAME,
            lastName: values.lastName,
          },
          {
            action: UserUpdateActions.SET_BIRTH_DATE,
            dateOfBirth: values.dateOfBirth,
          },
        ],
      });

      setMsgModalText('Your data saved! :)');
      setMsgModalShown(true);
      setTimeout(() => setMsgModalShown(false), MODAL_TIMEOUT);
      getUser(id);
    } catch (e) {
      setMsgModalText('Something went wrong! :(');
      setMsgModalShown(true);
      setTimeout(() => setMsgModalShown(false), MODAL_TIMEOUT);
    }
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
    if (errors.firstName || errors.lastName || errors.dateOfBirth || errors.email) {
      setIsSaveBlocked(true);
      return;
    }
    setIsSaveBlocked(false);
  }, [values, errors, touched, initData]);

  return (
    <div className="relative border-b-2 border-separation-line">
      <InfoModal msgModalShown={msgModalShown} msgModalText={msgModalText} />
      <h4 className="mx-auto mt-12 w-full text-center text-base font-medium dark:text-primary">Personal data</h4>
      <div className="profileInputWrapper">
        <div className="text-base font-medium dark:text-primary">Email</div>
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
        <div className="text-base font-medium dark:text-primary">Name</div>
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
        <div className="text-base font-medium dark:text-primary">Surname</div>
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
        <div className="text-base font-medium dark:text-primary md:pr-5">Birth&nbsp;date</div>
        <label htmlFor="dateOfBirth" className="loginRegLabel mt-5 sm:mt-0 sm:w-[470px]">
          <motion.input
            initial={inputAnimation.initial}
            animate={inputAnimation.animate}
            transition={{ ...inputAnimation.transition, delay: 0.15 }}
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            placeholder="Birth date"
            onFocus={handleChange}
            className={`loginRegInput placeholder:placeholder-opacity-0 ${
              touchedAndErrorBirthDate ? 'border-shop-cart-red' : ''
            }`}
            onChange={handleChange}
            onBlur={handleBlur}
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
      <div className="flex w-full justify-end">
        <button
          className="mb-12 ml-auto mt-5 h-10 w-full rounded-md bg-accent-lightest text-center text-accent transition-all duration-300 disabled:bg-separation-line disabled:text-text-grey sm:w-30"
          type="button"
          disabled={isSaveBlocked}
          onClick={saveClickHandler}
        >
          Save
        </button>
      </div>
    </div>
  );
}
