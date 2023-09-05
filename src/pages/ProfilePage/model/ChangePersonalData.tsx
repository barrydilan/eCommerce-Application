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
import { UserData } from '../types/profilePageTypes';
import InfoModal from '../ui/InfoModal';

const validationSchema = Yup.object({
  ...validEmail(),
  ...validBirthDate(),
  firstName: validName().name,
  lastName: validName().name,
});

export default function ChangePersonalData(props: {
  userData: UserData;
  accessToken: string | undefined;
  getUser: (_id: string) => void;
}) {
  const { userData, accessToken, getUser } = props;
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
  const [dateInputType, setDateInputType] = useState('text');
  const [isSaveBlocked, setIsSaveBlocked] = useState(true);
  const [msgModalShown, setMsgModalShown] = useState(false);
  const [msgModalText, setMsgModalText] = useState('');
  const touchedAndErrorEmail = touched.email && errors.email;
  const touchedAndErrorFirstName = touched.firstName && errors.firstName;
  const touchedAndErrorLastName = touched.lastName && errors.lastName;
  const touchedAndErrorBirthDate = touched.dateOfBirth && errors.dateOfBirth;

  function handleTransitionEnd() {
    setDateInputType(document.activeElement?.id === 'dateOfBirth' ? 'date' : 'text');
  }

  function saveClickHandler() {
    fetch(`https://api.europe-west1.gcp.commercetools.com/async-await-ecommerce-application/customers/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'changeEmail',
            email: values.email,
          },
          {
            action: 'setFirstName',
            firstName: values.firstName,
          },
          {
            action: 'setLastName',
            lastName: values.lastName,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth: values.dateOfBirth,
          },
        ],
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok || res.status !== 200) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(() => {
        setMsgModalText('Your data saved! :)');
        setMsgModalShown(true);
        setTimeout(() => setMsgModalShown(false), 1500);
        if (typeof id === 'string') getUser(id);
      })
      .catch(() => {
        setMsgModalText('Something went wrong! :(');
        setMsgModalShown(true);
        setTimeout(() => setMsgModalShown(false), 1500);
      });
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
          htmlFor="dateOfBirth"
          className="loginRegLabel mt-5 sm:mt-0 sm:w-[470px]"
        >
          <motion.input
            initial={inputAnimation.initial}
            animate={inputAnimation.animate}
            transition={{ ...inputAnimation.transition, delay: 0.15 }}
            id="dateOfBirth"
            type={dateInputType}
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
      <button
        className="mb-12 mt-5  h-10 w-full rounded-md bg-accent-lightest text-center text-accent transition-all duration-300 disabled:bg-separation-line disabled:text-text-grey"
        type="button"
        disabled={isSaveBlocked}
        onClick={saveClickHandler}
      >
        Save
      </button>
    </div>
  );
}
