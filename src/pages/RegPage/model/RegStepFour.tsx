import { useEffect } from 'react';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import * as Yup from 'yup';

import postalCodeIcon from '../../../assets/icons/postalCodeIcon.svg';
import postalCodeIconRed from '../../../assets/icons/postalCodeIconRed.svg';
import streetIcon from '../../../assets/icons/StreetIcon.svg';
import streetIconRed from '../../../assets/icons/StreetIconRed.svg';
import { CustomRegForm } from '../../../entities/form/ui';
import { validPostalCode, validStreet } from '../../../shared/const/validationSchemas';
import { ISignUpAddress } from '../../../shared/types';
import { checkboxAnimation, ErrorMessage, inputAnimation, svgAnimation } from '../../../shared/ui';
import { UserFormProps } from '../types';

export default function RegStepFour(props: UserFormProps) {
  const {
    addresses: [
      { country: billCountry = '', postalCode: billPostalCode = '', streetName: billStreet = '' } = {},
      { country: shipCountry = '', postalCode: shipPostalCode = '', streetName: shipStreet = '' } = {},
    ] = [],
    sameBillShip,
    billSetDefault,
    shipSetDefault,
    updateData,
    enableNext,
  } = props;

  const validationSchema = Yup.object({
    billPostalCode: validPostalCode(billCountry).postalCode,
    billStreet: validStreet().streetName,
    shipPostalCode: validPostalCode(shipCountry).postalCode,
    shipStreet: validStreet().streetName,
  });

  const formik = useFormik({
    initialValues: {
      billPostalCode,
      billStreet,
      shipPostalCode,
      shipStreet,
      billSetDefault,
      shipSetDefault,
    },
    validationSchema,
    onSubmit: () => {},
  });

  const { handleChange, handleBlur, errors, touched, values, setValues, setTouched } = formik;
  const shipBillCluesStyles = 'relative after:absolute after:-top-5 after:right-0 after:text-2xs';

  useEffect(() => {
    if (!sameBillShip) return;

    setTouched({ shipPostalCode: true, shipStreet: true });

    setValues({
      ...values,
      shipPostalCode: values.billPostalCode,
      shipStreet: values.billStreet,
      shipSetDefault: billSetDefault,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sameBillShip, values.billStreet, values.billPostalCode, billSetDefault]);

  useEffect(() => {
    updateData((prevState) => ({
      ...prevState,
      billSetDefault: values.billSetDefault as boolean,
      shipSetDefault: values.shipSetDefault as boolean,
      addresses: [
        {
          ...prevState.addresses[0],
          streetName: values.billStreet as string,
          postalCode: values.billPostalCode as string,
        },
        {
          ...(prevState.addresses[1] as ISignUpAddress),
          streetName: values.shipStreet as string,
          postalCode: values.shipPostalCode as string,
        },
      ],
    }));

    if (
      (touched.billPostalCode === undefined && values.billPostalCode === '') ||
      (touched.billStreet === undefined && values.billStreet === '') ||
      (touched.shipPostalCode === undefined && values.shipPostalCode === '') ||
      (touched.shipStreet === undefined && values.shipStreet === '')
    ) {
      enableNext(false);
      return;
    }
    if (errors.billPostalCode || errors.billStreet || errors.shipPostalCode || errors.shipStreet) {
      enableNext(false);
      return;
    }
    enableNext(true);
  }, [values, errors, touched, updateData, enableNext, sameBillShip]);

  const touchedAndErrorBillPostalCode = touched.billPostalCode && errors.billPostalCode;
  const touchedAndErrorBillStreet = touched.billStreet && errors.billStreet;
  const touchedAndErrorShipPostalCode = touched.shipPostalCode && errors.shipPostalCode;
  const touchedAndErrorShipStreet = touched.shipStreet && errors.shipStreet;

  return (
    <CustomRegForm>
      <label
        htmlFor="billPostalCodeInput"
        className={`
          loginRegLabel
          ${sameBillShip ? '' : `${shipBillCluesStyles} after:content-["Billing"]`}
        `}
      >
        <motion.input
          initial={inputAnimation.initial}
          animate={inputAnimation.animate}
          transition={inputAnimation.transition}
          id="billPostCodeInput"
          type="text"
          name="billPostalCode"
          placeholder="Postal code"
          className={`
            loginRegInput 
            relative
            ${touchedAndErrorBillPostalCode ? 'border-shop-cart-red' : ''}
          `}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.billPostalCode}
        />
        <motion.img
          initial={svgAnimation.initial}
          animate={svgAnimation.animate}
          transition={svgAnimation.transition}
          className="invalidInputIcon"
          src={touchedAndErrorBillPostalCode ? postalCodeIconRed : postalCodeIcon}
          alt=""
        />
        {touchedAndErrorBillPostalCode && <ErrorMessage>{errors.billPostalCode}</ErrorMessage>}
      </label>
      <label htmlFor="billStreetInput" className="loginRegLabel">
        <motion.input
          initial={inputAnimation.initial}
          animate={inputAnimation.animate}
          transition={{ ...inputAnimation.transition, delay: 0.05 }}
          id="billStreetInput"
          type="text"
          name="billStreet"
          placeholder="Street"
          className={`loginRegInput ${touchedAndErrorBillStreet ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.billStreet}
        />
        <motion.img
          initial={svgAnimation.initial}
          animate={svgAnimation.animate}
          transition={{ ...svgAnimation.transition, delay: 0.25 }}
          className="invalidInputIcon"
          src={touchedAndErrorBillStreet ? streetIconRed : streetIcon}
          alt=""
        />
        {touchedAndErrorBillStreet && <ErrorMessage>{errors.billStreet}</ErrorMessage>}
      </label>
      <div className="mt-6 flex items-center text-text-grey">
        <motion.input
          initial={checkboxAnimation.initial}
          animate={checkboxAnimation.animate}
          transition={checkboxAnimation.transitionInput}
          id="billSetDefInput"
          type="checkbox"
          name="billSetDefault"
          checked={values.billSetDefault}
          onChange={handleChange}
          className="hiddenCheckBox peer/expand"
        />
        <motion.label
          initial={checkboxAnimation.initial}
          animate={checkboxAnimation.animate}
          transition={checkboxAnimation.transitionLabel}
          htmlFor="billSetDefInput"
          className="
          regFormCheckGulp
          relative
          text-3xs
          leading-3
          before:top-0.5
          peer-checked/expand:before:block
        "
        >
          {sameBillShip ? `Set as default billing & shipping address` : 'Set as default billing address'}
        </motion.label>
      </div>
      {!sameBillShip ? (
        <div>
          <label
            htmlFor="shipPostalCodeInput"
            className={`
            loginRegLabel
            after:content-['Shipping']
            ${shipBillCluesStyles}
          `}
          >
            <motion.input
              initial={inputAnimation.initial}
              animate={inputAnimation.animate}
              transition={{ ...inputAnimation.transition, delay: 0.1 }}
              id="shipPostCodeInput"
              type="text"
              name="shipPostalCode"
              placeholder="Postal code"
              className={`
              loginRegInput   
              ${touchedAndErrorShipPostalCode ? 'border-shop-cart-red' : ''}
            `}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.shipPostalCode}
            />
            <motion.img
              initial={svgAnimation.initial}
              animate={svgAnimation.animate}
              transition={{ ...svgAnimation.transition, delay: 0.3 }}
              className="invalidInputIcon"
              src={touchedAndErrorShipPostalCode ? postalCodeIconRed : postalCodeIcon}
              alt=""
            />
            {touchedAndErrorShipPostalCode && <ErrorMessage>{errors.shipPostalCode}</ErrorMessage>}
          </label>
          <label htmlFor="shipStreetInput" className="loginRegLabel">
            <motion.input
              initial={inputAnimation.initial}
              animate={inputAnimation.animate}
              transition={{ ...inputAnimation.transition, delay: 0.15 }}
              id="shipStreetInput"
              type="text"
              name="shipStreet"
              placeholder="Street"
              className={`loginRegInput ${touchedAndErrorShipStreet ? 'border-shop-cart-red' : ''}`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.shipStreet}
            />
            <motion.img
              initial={svgAnimation.initial}
              animate={svgAnimation.animate}
              transition={{ ...svgAnimation.transition, delay: 0.35 }}
              className="invalidInputIcon"
              src={touchedAndErrorShipStreet ? streetIconRed : streetIcon}
              alt=""
            />
            {touchedAndErrorShipStreet && <ErrorMessage>{errors.shipStreet}</ErrorMessage>}
          </label>
          <div className="mt-6 flex items-center text-text-grey">
            <motion.input
              initial={checkboxAnimation.initial}
              animate={checkboxAnimation.animate}
              transition={{ ...checkboxAnimation.transitionInput, delay: 0.4 }}
              id="shipSetDefInput"
              type="checkbox"
              name="shipSetDefault"
              checked={values.shipSetDefault}
              onChange={handleChange}
              className="peer/expand hiddenCheckBox"
            />
            <motion.label
              initial={checkboxAnimation.initial}
              animate={checkboxAnimation.animate}
              transition={{ ...checkboxAnimation.transitionLabel, delay: 0.5 }}
              htmlFor="shipSetDefInput"
              className="
            regFormCheckGulp
            relative
            text-3xs
            leading-3
            before:top-0.5
            peer-checked/expand:before:block
          "
            >
              {sameBillShip ? `Set as default billing & shipping address` : 'Set as default shipping address'}
            </motion.label>
          </div>
        </div>
      ) : null}
    </CustomRegForm>
  );
}
