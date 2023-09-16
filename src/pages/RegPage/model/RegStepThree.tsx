import { useEffect } from 'react';

import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import * as Yup from 'yup';

import cityIcon from '../../../assets/icons/CityIcon.svg';
import cityIconRed from '../../../assets/icons/CityIconRed.svg';
import countryIcon from '../../../assets/icons/CountryIcon.svg';
import { CustomRegForm } from '../../../entities/form/ui';
import { validCity } from '../../../shared/const/validationSchemas';
import { ISignUpAddress } from '../../../shared/types';
import { checkboxAnimation, ErrorMessage, inputAnimation, svgAnimation } from '../../../shared/ui';
import { UserFormProps } from '../types';
import { InputIcon } from '../ui';

const validationSchema = Yup.object({
  billCity: validCity().city,
  shipCity: validCity().city,
});

const shipBillCluesStyles = 'relative after:absolute after:-top-5 after:right-0 after:text-2xs';

export default function RegStepThree(props: UserFormProps) {
  const {
    addresses: [
      { country: billCountry = 'US', city: billCity = '' } = {},
      { country: shipCountry = 'US', city: shipCity = '' } = {},
    ] = [],
    sameBillShip,
    updateData,
    enableNext,
  } = props;

  const formik = useFormik({
    initialValues: {
      billCountry,
      billCity,
      shipCountry,
      shipCity,
      sameBillShip,
    },
    validationSchema,
    onSubmit: () => {},
  });
  const { handleChange, handleBlur, errors, touched, values, setValues } = formik;

  useEffect(() => {
    if (values.sameBillShip) {
      setValues({ ...values, shipCountry: values.billCountry, shipCity: values.billCity });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.sameBillShip, values.billCity, values.billCountry]);

  useEffect(() => {
    const shipAddress: ISignUpAddress = {
      city: values.shipCity!,
      country: values.shipCountry!,
      streetName: '',
      postalCode: '',
    };

    const billAddress: ISignUpAddress = {
      city: values.billCity!,
      country: values.billCountry!,
      streetName: '',
      postalCode: '',
    };

    updateData({
      sameBillShip: values.sameBillShip,
      addresses: [billAddress, shipAddress],
    });

    if (
      (touched.shipCity === undefined && values.shipCity === '') ||
      (touched.billCity === undefined && values.billCity === '')
    ) {
      enableNext(false);
      return;
    }
    if (errors.shipCountry || errors.shipCity || errors.billCountry || errors.billCity) {
      enableNext(false);
      return;
    }
    enableNext(true);
  }, [values, errors, touched, updateData, enableNext]);

  const touchedAndErrorBillCity = touched.billCity && errors.billCity;
  const touchedAndErrorShipCity = touched.shipCity && errors.shipCity;

  return (
    <CustomRegForm>
      <label
        htmlFor="billCountryInput"
        className={`
        loginRegLabel
        ${values.sameBillShip ? '' : `${shipBillCluesStyles} after:content-['Billing']`}
      `}
      >
        <motion.select
          data-testid="select"
          initial={inputAnimation.initial}
          animate={inputAnimation.animate}
          transition={inputAnimation.transition}
          id="billCountryInput"
          name="billCountry"
          className="loginRegInput"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.billCountry}
        >
          <option data-testid="select-option" value="US">
            USA
          </option>
          <option data-testid="select-option" value="UA">
            Ukraine
          </option>
          <option data-testid="select-option" value="DE">
            Germany
          </option>
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
      <label htmlFor="billCityInput" className="loginRegLabel">
        <motion.input
          initial={inputAnimation.initial}
          animate={inputAnimation.animate}
          transition={{ ...inputAnimation.transition, delay: 0.05 }}
          id="billCityInput"
          type="text"
          name="billCity"
          placeholder="City"
          className={`loginRegInput ${touchedAndErrorBillCity ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.billCity}
        />
        <motion.img
          initial={svgAnimation.initial}
          animate={svgAnimation.animate}
          transition={{ ...svgAnimation.transition, delay: 0.25 }}
          className="invalidInputIcon"
          src={touchedAndErrorBillCity ? cityIconRed : cityIcon}
          alt=""
        />
        {touchedAndErrorBillCity && <ErrorMessage>{errors.billCity}</ErrorMessage>}
      </label>
      <AnimatePresence>
        {!values.sameBillShip ? (
          <motion.div
            key="secondInputGroup"
            initial={{ opacity: 0, scaleY: 0, translateY: '20%' }}
            animate={{ opacity: 1, scaleY: 1, translateY: '0%' }}
            exit={{ scaleY: 0, opacity: 0, position: 'absolute' }}
            transition={{
              type: 'spring',
              stiffness: 360,
              damping: 15,
            }}
          >
            <label
              htmlFor="billCountryInput"
              className={`loginRegLabel ${shipBillCluesStyles} mt-10 after:content-['Shipping']`}
            >
              <motion.select
                data-testid="select"
                initial={{ y: '-30%' }}
                animate={{ y: '0%' }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 560,
                  damping: 10,
                  delay: 0.1,
                }}
                id="shipCountryInput"
                name="shipCountry"
                className="loginRegInput"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.shipCountry}
              >
                <option data-testid="select-option" value="US">
                  USA
                </option>
                <option data-testid="select-option" value="UA">
                  Ukraine
                </option>
                <option data-testid="select-option" value="DE">
                  Germany
                </option>
              </motion.select>
              <InputIcon icon={countryIcon} delay={0.3} />
            </label>
            <label htmlFor="shipCityInput" className="loginRegLabel">
              <motion.input
                initial={{ y: '-30%' }}
                animate={{ y: '0%' }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 560,
                  damping: 10,
                }}
                id="shipCityInput"
                type="text"
                name="shipCity"
                placeholder="City"
                className={`loginRegInput ${touchedAndErrorShipCity ? 'border-shop-cart-red' : ''}`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.shipCity}
              />
              <InputIcon icon={touchedAndErrorShipCity ? cityIconRed : cityIcon} delay={0.35} />
              {touchedAndErrorShipCity && <ErrorMessage>{errors.shipCity}</ErrorMessage>}
            </label>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: sameBillShip ? 0 : '20%' }}
        transition={{
          type: 'spring',
          stiffness: 960,
          damping: 15,
        }}
        className="mt-4 flex items-center text-text-grey"
      >
        <motion.input
          data-testid="checkbox"
          initial={checkboxAnimation.initial}
          animate={checkboxAnimation.animate}
          transition={checkboxAnimation.transitionInput}
          id="expand"
          type="checkbox"
          name="sameBillShip"
          checked={values.sameBillShip}
          onChange={handleChange}
          className="hiddenCheckBox peer/expand"
        />
        <motion.label
          initial={checkboxAnimation.initial}
          animate={checkboxAnimation.animate}
          transition={checkboxAnimation.transitionLabel}
          htmlFor="expand"
          className="regFormCheckGulp relative text-3xs leading-3 peer-checked/expand:before:block"
        >
          Use the same address <br />
          as a billing and a shipping
        </motion.label>
      </motion.div>
    </CustomRegForm>
  );
}
