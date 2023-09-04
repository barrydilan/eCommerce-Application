import { useEffect, useState } from 'react';

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
import { AddressObj, EditedAddressObj } from '../types/profilePageTypes';

export default function AddressesEditModal(props: {
  editedAddress: EditedAddressObj;
  setMyAddresses: React.Dispatch<React.SetStateAction<AddressObj[]>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { editedAddress, setMyAddresses, setIsModalOpen } = props;
  const { index } = editedAddress;
  const { country, city, street, postalCode } = editedAddress.address;
  const initData = Object.values(editedAddress.address);
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [isEditBtnBlocked, setIsEditBtnBlocked] = useState(true);

  const validationSchema = Yup.object({
    city: validCity().city,
    street: validStreet().street,
    postalCode: validPostalCode(selectedCountry).postalCode,
  });

  const formik = useFormik({
    initialValues: {
      country,
      city,
      street,
      postalCode,
    },
    validationSchema,
    onSubmit: () => {},
  });

  const { handleChange, handleBlur, errors, touched, values } = formik;
  const touchedAndErrorCity = touched.city && errors.city;
  const touchedAndErrorStreet = touched.street && errors.street;
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
    if (errors.city || errors.street || errors.postalCode) {
      setIsEditBtnBlocked(true);
      return;
    }
    setIsEditBtnBlocked(false);
  }, [values, errors, touched, initData]);

  function handleEditBtn() {
    setMyAddresses((prev) => {
      if (index === undefined) {
        return [...prev, values];
      }
      const copy = [...prev];
      copy[index] = values;
      return copy;
    });
    setIsModalOpen(false);
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
              name="street"
              placeholder="Street"
              className={`loginRegInput ${touchedAndErrorStreet ? 'border-shop-cart-red' : ''}`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.street}
            />
            <motion.img
              initial={svgAnimation.initial}
              animate={svgAnimation.animate}
              transition={{ ...svgAnimation.transition, delay: 0.25 }}
              className="invalidInputIcon"
              src={touchedAndErrorStreet ? streetIconRed : streetIcon}
              alt=""
            />
            {touchedAndErrorStreet && <ErrorMessage>{errors.street}</ErrorMessage>}
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
