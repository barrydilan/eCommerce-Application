import { useEffect } from 'react';

import { useFormik } from 'formik';

import { validSchemaStepFour } from './validationSchemas';
import postalCodeIcon from '../../../assets/icons/postalCodeIcon.svg';
import postalCodeIconRed from '../../../assets/icons/postalCodeIconRed.svg';
import streetIcon from '../../../assets/icons/StreetIcon.svg';
import streetIconRed from '../../../assets/icons/StreetIconRed.svg';
import CustomRegForm from '../../../entities/form/ui';
import { ISignUpAddress } from '../../../shared/types';
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

  const validationSchema = validSchemaStepFour(billCountry as string, shipCountry as string);

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

  const { handleChange, handleBlur, errors, touched, values } = formik;
  const shipBillCluesStyles = 'relative after:absolute after:-top-5 after:right-0 after:text-2xs';

  useEffect(() => {
    if (sameBillShip) {
      values.shipPostalCode = values.billPostalCode;
      values.shipStreet = values.billStreet;
      values.shipSetDefault = values.billSetDefault;
      errors.shipPostalCode = undefined;
      errors.shipStreet = undefined;
      touched.shipPostalCode = true;
      touched.shipStreet = true;
    }

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
        <input
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
        <img
          className="invalidInputIcon"
          src={touchedAndErrorBillPostalCode ? postalCodeIconRed : postalCodeIcon}
          alt=""
        />
        {touchedAndErrorBillPostalCode && <p className="invalidInputMsg">{errors.billPostalCode}</p>}
      </label>
      <label htmlFor="billStreetInput" className="loginRegLabel">
        <input
          id="billStreetInput"
          type="text"
          name="billStreet"
          placeholder="Street"
          className={`loginRegInput ${touchedAndErrorBillStreet ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.billStreet}
        />
        <img className="invalidInputIcon" src={touchedAndErrorBillStreet ? streetIconRed : streetIcon} alt="" />
        {touchedAndErrorBillStreet && <p className="invalidInputMsg">{errors.billStreet}</p>}
      </label>
      <div className="mt-6 flex items-center text-text-grey">
        <input
          id="billSetDefInput"
          type="checkbox"
          name="billSetDefault"
          checked={values.billSetDefault}
          onChange={handleChange}
          className="hiddenCheckBox peer/expand"
        />
        <label
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
        </label>
      </div>
      <div className={sameBillShip ? 'hidden' : 'block'}>
        <label
          htmlFor="shipPostalCodeInput"
          className={`
            loginRegLabel
            after:content-['Shipping']
            ${shipBillCluesStyles}
          `}
        >
          <input
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
          <img
            className="invalidInputIcon"
            src={touchedAndErrorShipPostalCode ? postalCodeIconRed : postalCodeIcon}
            alt=""
          />
          {touchedAndErrorShipPostalCode && <p className="invalidInputMsg">{errors.shipPostalCode}</p>}
        </label>
        <label htmlFor="shipStreetInput" className="loginRegLabel">
          <input
            id="shipStreetInput"
            type="text"
            name="shipStreet"
            placeholder="Street"
            className={`loginRegInput ${touchedAndErrorShipStreet ? 'border-shop-cart-red' : ''}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.shipStreet}
          />
          <img className="invalidInputIcon" src={touchedAndErrorShipStreet ? streetIconRed : streetIcon} alt="" />
          {touchedAndErrorShipStreet && <p className="invalidInputMsg">{errors.shipStreet}</p>}
        </label>
        <div className="mt-6 flex items-center text-text-grey">
          <input
            id="shipSetDefInput"
            type="checkbox"
            name="shipSetDefault"
            checked={values.shipSetDefault}
            onChange={handleChange}
            className="peer/expand hiddenCheckBox"
          />
          <label
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
            {sameBillShip ? `Set as default billing & shipping address` : 'Set as default billing address'}
          </label>
        </div>
      </div>
    </CustomRegForm>
  );
}
