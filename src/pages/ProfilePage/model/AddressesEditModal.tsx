import { useEffect, useMemo, useState } from 'react';

import { useFormik } from 'formik';
import { Cycle, motion } from 'framer-motion';
import * as Yup from 'yup';

import cityIcon from '../../../assets/icons/CityIcon.svg';
import cityIconRed from '../../../assets/icons/CityIconRed.svg';
import countryIcon from '../../../assets/icons/CountryIcon.svg';
import postalCodeIcon from '../../../assets/icons/postalCodeIcon.svg';
import postalCodeIconRed from '../../../assets/icons/postalCodeIconRed.svg';
import streetIcon from '../../../assets/icons/StreetIcon.svg';
import streetIconRed from '../../../assets/icons/StreetIconRed.svg';
import {
  IUpdateUserDataParams,
  useLazyGetUserQuery,
  UserUpdateActions,
  useUpdateUserAddressMutation,
} from '../../../entities/user';
import { validCity, validPostalCode, validStreet } from '../../../shared/const/validationSchemas';
import { ErrorMessage, inputAnimation, svgAnimation } from '../../../shared/ui';
import MODAL_TIMEOUT from '../constants/constants.ts';
import { AddressObj } from '../types/profilePageTypes';
import InfoModal from '../ui/InfoModal';

export default function AddressesEditModal(props: {
  id: string | undefined;
  version: number | undefined;
  editedAddress: AddressObj;
  setIsModalOpen: Cycle;
}) {
  const { editedAddress, setIsModalOpen, version, id } = props;
  const { id: addressId, country, city, streetName, postalCode } = editedAddress;
  const initData = useMemo(() => [country, city, streetName, postalCode], [country, city, streetName, postalCode]);
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [isEditBtnBlocked, setIsEditBtnBlocked] = useState(true);
  const [msgModalShown, setMsgModalShown] = useState(false);
  const [msgModalText, setMsgModalText] = useState('');
  const [getUser] = useLazyGetUserQuery();
  const [updateAddress] = useUpdateUserAddressMutation();

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

  async function handleEditBtn() {
    const getBody = (): IUpdateUserDataParams => {
      if (!version) throw new Error('Version is not defined!');

      if (addressId) {
        return {
          version,
          actions: [
            {
              action: UserUpdateActions.CHANGE_ADDRESS,
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
            action: UserUpdateActions.ADD_ADDRESS,
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
    try {
      await updateAddress({ body: getBody(), id: id as string });
      setMsgModalText('Your addresses saved! :)');
      setMsgModalShown(true);
      setTimeout(() => {
        setMsgModalShown(false);
        setIsModalOpen();
      }, MODAL_TIMEOUT);
      getUser(id as string);
    } catch (e) {
      setMsgModalText('Something went wrong! :(');
      setMsgModalShown(true);
      setTimeout(() => setMsgModalShown(false), MODAL_TIMEOUT);
    }
  }

  window.scrollTo(0, 250);
  return (
    <div>
      <div
        className="
          relative
          z-40
          m-auto
          mt-5
          box-border
          min-h-[184px]
          w-[90%]
          rounded-md
          bg-primary
          p-5
          font-medium
          text-text-grey
          dark:border-2
          dark:bg-dark-bg-primary
        "
      >
        <h4 className="w-full text-center text-lg font-medium text-text-dark">Edit your address:</h4>
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
          <button type="button" className="p-2" onClick={() => setIsModalOpen()}>
            Cancel
          </button>
          <button
            disabled={isEditBtnBlocked}
            type="button"
            className="cursor-pointer rounded-md bg-accent-lightest px-4 py-2 text-accent disabled:bg-separation-line"
            onClick={() => handleEditBtn()}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
