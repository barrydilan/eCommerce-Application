import React, { useEffect, useMemo, useState } from 'react';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import * as Yup from 'yup';

import cityIcon from '../../../assets/icons/CityIcon.svg';
import cityIconRed from '../../../assets/icons/CityIconRed.svg';
import countryIcon from '../../../assets/icons/CountryIcon.svg';
import postalCodeIcon from '../../../assets/icons/postalCodeIcon.svg';
import postalCodeIconRed from '../../../assets/icons/postalCodeIconRed.svg';
import streetIcon from '../../../assets/icons/StreetIcon.svg';
import streetIconRed from '../../../assets/icons/StreetIconRed.svg';
import { validCity, validPostalCode, validStreet } from '../../../shared/const/validationSchemas';
import { ErrorMessage, inputAnimation, svgAnimation } from '../../../shared/ui';
import MODAL_TIMEOUT from '../constants/constants.ts';
import { AddressObj } from '../types/profilePageTypes';
import InfoModal from '../ui/InfoModal';

export default function AddressesEditModal(props: {
  id: string | undefined;
  version: number | undefined;
  editedAddress: AddressObj;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string | undefined;
  getUser: (_id: string) => void;
}) {
  const { editedAddress, setIsModalOpen, version, accessToken, getUser, id } = props;
  const { id: addressId, country, city, streetName, postalCode } = editedAddress;
  const initData = useMemo(() => [country, city, streetName, postalCode], [country, city, streetName, postalCode]);
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [isEditBtnBlocked, setIsEditBtnBlocked] = useState(true);
  const [msgModalShown, setMsgModalShown] = useState(false);
  const [msgModalText, setMsgModalText] = useState('');

  const validationSchema = Yup.object({
    city: validCity().city,
    streetName: validStreet().streetName,
    postalCode: validPostalCode(selectedCountry).postalCode,
  });

  const formik = useFormik({
    initialValues: {
      country,
      city,
      streetName,
      postalCode,
    },
    validationSchema,
    onSubmit: () => {},
  });

  const { handleChange, handleBlur, errors, touched, values } = formik;
  const touchedAndErrorCity = touched.city && errors.city;
  const touchedAndErrorStreet = touched.streetName && errors.streetName;
  const touchedAndErrorPostalCode = touched.postalCode && errors.postalCode;

  useEffect(() => {
    if (
      initData.every((item) => {
        return Object.values(values).includes(item);
      })
    ) {
      setIsEditBtnBlocked(true);
      return;
    }
    if (errors.city || errors.streetName || errors.postalCode) {
      setIsEditBtnBlocked(true);
      return;
    }
    setIsEditBtnBlocked(false);
  }, [values, errors, touched, initData]);

  function handleEditBtn() {
    const getBody = () => {
      if (addressId) {
        return {
          version,
          actions: [
            {
              action: 'changeAddress',
              addressId,
              address: {
                country: values.country,
                city: values.city,
                streetName: values.streetName,
                postalCode: values.postalCode,
              },
            },
          ],
        };
      }
      return {
        version,
        actions: [
          {
            action: 'addAddress',
            address: {
              country: values.country,
              city: values.city,
              streetName: values.streetName,
              postalCode: values.postalCode,
            },
          },
        ],
      };
    };
    fetch(`https://api.europe-west1.gcp.commercetools.com/async-await-ecommerce-application/customers/${id}`, {
      method: 'POST',
      body: JSON.stringify(getBody()),
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
        setMsgModalText('Your addresses saved! :)');
        setMsgModalShown(true);
        setTimeout(() => {
          setMsgModalShown(false);
          setIsModalOpen(false);
        }, MODAL_TIMEOUT);
        if (typeof id === 'string') getUser(id);
      })
      .catch(() => {
        setMsgModalText('Something went wrong! :(');
        setMsgModalShown(true);
        setTimeout(() => setMsgModalShown(false), MODAL_TIMEOUT);
      });
  }

  window.scrollTo(0, 250);
  return (
    <div className={`absolute h-full w-full transition-all duration-300 `}>
      <div className="absolute z-10 h-full w-full rounded-md bg-text-dark opacity-30" />
      <div
        className="
          relative
          z-20
          m-auto
          mt-5
          box-border
          min-h-[184px]
          w-[90%]
          rounded-md
          bg-primary
          p-5
          font-medium
          text-text-grey"
      >
        <h4 className="w-full text-center font-medium">Edit your address:</h4>
        <InfoModal msgModalShown={msgModalShown} msgModalText={msgModalText} />
        <div>
          <label
            htmlFor="countryInput"
            className={`
        loginRegLabel
      `}
          >
            <motion.select
              initial={inputAnimation.initial}
              animate={inputAnimation.animate}
              transition={inputAnimation.transition}
              id="countryInput"
              name="country"
              className="loginRegInput"
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                handleChange(e);
              }}
              onBlur={handleBlur}
              value={values.country}
            >
              <option value="US">USA</option>
              <option value="UA">Ukraine</option>
              <option value="DE">Germany</option>
            </motion.select>
            <motion.img
              initial={svgAnimation.initial}
              animate={svgAnimation.animate}
              transition={svgAnimation.transition}
              className="invalidInputIcon"
              src={countryIcon}
              alt=""
            />
          </label>
          <label htmlFor="cityInput" className="loginRegLabel">
            <motion.input
              initial={inputAnimation.initial}
              animate={inputAnimation.animate}
              transition={{ ...inputAnimation.transition, delay: 0.05 }}
              id="cityInput"
              type="text"
              name="city"
              placeholder="City"
              className={`loginRegInput ${touchedAndErrorCity ? 'border-shop-cart-red' : ''}`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
            />
            <motion.img
              initial={svgAnimation.initial}
              animate={svgAnimation.animate}
              transition={{ ...svgAnimation.transition, delay: 0.25 }}
              className="invalidInputIcon"
              src={touchedAndErrorCity ? cityIconRed : cityIcon}
              alt=""
            />
            {touchedAndErrorCity && <ErrorMessage>{errors.city}</ErrorMessage>}
          </label>
          <label htmlFor="streetInput" className="loginRegLabel">
            <motion.input
              initial={inputAnimation.initial}
              animate={inputAnimation.animate}
              transition={{ ...inputAnimation.transition, delay: 0.05 }}
              id="streetInput"
              type="text"
              name="streetName"
              placeholder="Street"
              className={`loginRegInput ${touchedAndErrorStreet ? 'border-shop-cart-red' : ''}`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.streetName}
            />
            <motion.img
              initial={svgAnimation.initial}
              animate={svgAnimation.animate}
              transition={{ ...svgAnimation.transition, delay: 0.25 }}
              className="invalidInputIcon"
              src={touchedAndErrorStreet ? streetIconRed : streetIcon}
              alt=""
            />
            {touchedAndErrorStreet && <ErrorMessage>{errors.streetName}</ErrorMessage>}
          </label>
          <label htmlFor="postCodeInput" className="loginRegLabel">
            <motion.input
              initial={inputAnimation.initial}
              animate={inputAnimation.animate}
              transition={{ ...inputAnimation.transition, delay: 0.1 }}
              id="postCodeInput"
              type="text"
              name="postalCode"
              placeholder="Postal code"
              className={`
              loginRegInput
              ${touchedAndErrorPostalCode ? 'border-shop-cart-red' : ''}
            `}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.postalCode}
            />
            <motion.img
              initial={svgAnimation.initial}
              animate={svgAnimation.animate}
              transition={{ ...svgAnimation.transition, delay: 0.3 }}
              className="invalidInputIcon"
              src={touchedAndErrorPostalCode ? postalCodeIconRed : postalCodeIcon}
              alt=""
            />
            {touchedAndErrorPostalCode && <ErrorMessage>{errors.postalCode}</ErrorMessage>}
          </label>
        </div>
        <div className="my-4 flex justify-between">
          <button type="button" className="p-2" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
          <button
            disabled={isEditBtnBlocked}
            type="button"
            className="rounded-md bg-accent-lightest px-4 py-2 text-accent disabled:bg-separation-line"
            onClick={() => handleEditBtn()}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
