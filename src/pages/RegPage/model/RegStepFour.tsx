import { useEffect } from 'react';

import { useFormik } from 'formik';

import { validSchemaStepFour } from './validationSchemas';
import postalCodeIcon from '../../../assets/icons/postalCodeIcon.svg';
import postalCodeIconRed from '../../../assets/icons/postalCodeIconRed.svg';
import streetIcon from '../../../assets/icons/StreetIcon.svg';
import streetIconRed from '../../../assets/icons/StreetIconRed.svg';
import CustomForm from '../../../entities/form/ui/CustomForm';

type UserData = {
  billPostalCode: string;
  billStreet: string;
  shipPostalCode: string;
  shipStreet: string;
  billSetDefault: boolean;
  shipSetDefault: boolean;
};

type UserFormProps = UserData & {
  updateData: (fields: UserData) => void;
  setBtnEnabled: (arg: boolean) => void;
  billCountry: string;
  shipCountry: string;
  sameBillShip: boolean;
};

export default function RegStepFour(props: UserFormProps) {
  const {
    shipCountry,
    billCountry,
    sameBillShip,
    billPostalCode,
    billStreet,
    shipPostalCode,
    shipStreet,
    billSetDefault,
    shipSetDefault,
    updateData,
    setBtnEnabled,
  } = props;

  const validationSchema = validSchemaStepFour(billCountry, shipCountry);

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
    onSubmit: (values) => {
      updateData({
        billPostalCode: values.billPostalCode,
        billStreet: values.billStreet,
        shipPostalCode: values.shipPostalCode,
        shipStreet: values.shipStreet,
        billSetDefault: values.billSetDefault,
        shipSetDefault: values.shipSetDefault,
      });
    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } = formik;
  const shipBillCluesStyles = 'relative after:absolute after:-top-5 after:right-0 after:text-2xs';

  useEffect(() => {
    if (sameBillShip === true) {
      values.shipPostalCode = values.billPostalCode;
      values.shipStreet = values.billStreet;
      values.shipSetDefault = values.billSetDefault;
    }
    updateData({
      billPostalCode: values.billPostalCode,
      billStreet: values.billStreet,
      shipPostalCode: values.shipPostalCode,
      shipStreet: values.shipStreet,
      billSetDefault: values.billSetDefault,
      shipSetDefault: values.shipSetDefault,
    });

    if (
      (touched.billPostalCode === undefined && values.billPostalCode === '') ||
      (touched.billStreet === undefined && values.billStreet === '') ||
      (touched.shipPostalCode === undefined && values.shipPostalCode === '') ||
      (touched.shipStreet === undefined && values.shipStreet === '')
    ) {
      setBtnEnabled(false);
      return;
    }
    if (errors.billPostalCode || errors.billStreet || errors.shipPostalCode || errors.shipStreet) {
      setBtnEnabled(false);
      return;
    }
    setBtnEnabled(true);
  }, [values, errors, touched]);

  return (
    <CustomForm onSubmit={handleSubmit}>
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
            ${touched.billPostalCode && errors.billPostalCode ? 'border-shop-cart-red' : ''}
          `}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.billPostalCode}
        />
        <img
          className="invalidInputIcon"
          src={touched.billPostalCode && errors.billPostalCode ? postalCodeIconRed : postalCodeIcon}
          alt=""
        />
        {touched.billPostalCode && errors.billPostalCode && <p className="invalidInputMsg">{errors.billPostalCode}</p>}
      </label>
      <label htmlFor="billStreetInput" className="loginRegLabel">
        <input
          id="billStreetInput"
          type="text"
          name="billStreet"
          placeholder="Street"
          className={`loginRegInput ${touched.billStreet && errors.billStreet ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.billStreet}
        />
        <img
          className="invalidInputIcon"
          src={touched.billStreet && errors.billStreet ? streetIconRed : streetIcon}
          alt=""
        />
        {touched.billStreet && errors.billStreet && <p className="invalidInputMsg">{errors.billStreet}</p>}
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
              ${touched.shipPostalCode && errors.shipPostalCode ? 'border-shop-cart-red' : ''}
            `}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.shipPostalCode}
          />
          <img
            className="invalidInputIcon"
            src={touched.shipPostalCode && errors.shipPostalCode ? postalCodeIconRed : postalCodeIcon}
            alt=""
          />
          {touched.shipPostalCode && errors.shipPostalCode && (
            <p className="invalidInputMsg">{errors.shipPostalCode}</p>
          )}
        </label>
        <label htmlFor="shipStreetInput" className="loginRegLabel">
          <input
            id="shipStreetInput"
            type="text"
            name="shipStreet"
            placeholder="Street"
            className={`loginRegInput ${touched.shipStreet && errors.shipStreet ? 'border-shop-cart-red' : ''}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.shipStreet}
          />
          <img
            className="invalidInputIcon"
            src={touched.shipStreet && errors.shipStreet ? streetIconRed : streetIcon}
            alt=""
          />
          {touched.shipStreet && errors.shipStreet && <p className="invalidInputMsg">{errors.shipStreet}</p>}
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
    </CustomForm>
  );
}
