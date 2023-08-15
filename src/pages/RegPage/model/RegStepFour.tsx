import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import postalCodeIcon from '../../../assets/icons/postalCodeIcon.svg';
import postalCodeIconRed from '../../../assets/icons/postalCodeIconRed.svg';
import streetIcon from '../../../assets/icons/StreetIcon.svg';
import streetIconRed from '../../../assets/icons/StreetIconRed.svg';
import CustomForm from '../../../entities/form/ui/CustomForm';

const usaPostCode = /^\d{5}(-\d{4})?$/;
const ukrGerPostCode = /^\d{5}$/;

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
  billCountry: string;
  shipCountry: string;
  next: () => void;
  back: () => void;
};

export default function RegStepFour(props: UserFormProps) {
  const {
    shipCountry,
    billCountry,
    billPostalCode,
    billStreet,
    shipPostalCode,
    shipStreet,
    billSetDefault,
    shipSetDefault,
    updateData,
    back,
    next,
  } = props;

  const checkSameBillShip = shipCountry === billCountry;

  function getRegEx(country: string) {
    switch (country) {
      case 'ukraine':
      case 'germany':
        return ukrGerPostCode;
      default:
        return usaPostCode;
    }
  }

  const billRegEx = getRegEx(billCountry);
  const shipRegEx = getRegEx(shipCountry);

  const validationSchema = Yup.object({
    billPostalCode: Yup.string()
      .matches(billRegEx, { message: 'Enter valid postal code', excludeEmptyString: true })
      .required('PostalCode is required'),
    billStreet: Yup.string().required('Street name is required'),
    shipPostalCode: Yup.string()
      .matches(shipRegEx, { message: 'Enter valid postal code', excludeEmptyString: true })
      .required('PostalCode is required'),
    shipStreet: Yup.string().required('Street name is required'),
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
    onSubmit: (values) => {
      updateData({
        billPostalCode: values.billPostalCode,
        billStreet: values.billStreet,
        shipPostalCode: values.shipPostalCode,
        shipStreet: values.shipStreet,
        billSetDefault: values.billSetDefault,
        shipSetDefault: values.shipSetDefault,
      });
      next();
    },
  });

  return (
    <CustomForm onSubmit={formik.handleSubmit}>
      <label htmlFor="billPostalCodeInput" className="loginRegLabel">
        <input
          id="billPostCodeInput"
          type="text"
          name="billPostalCode"
          placeholder="Postal code"
          className={`loginRegInput ${
            formik.touched.billPostalCode && formik.errors.billPostalCode ? 'border-shop-cart-red' : ''
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.billPostalCode}
        />
        <img
          className="invalidInputIcon"
          src={formik.touched.billPostalCode && formik.errors.billPostalCode ? postalCodeIconRed : postalCodeIcon}
          alt=""
        />
        {formik.touched.billPostalCode && formik.errors.billPostalCode ? (
          <p className="invalidInputMsg">{formik.errors.billPostalCode}</p>
        ) : null}
      </label>
      <label htmlFor="billStreetInput" className="loginRegLabel">
        <input
          id="billStreetInput"
          type="text"
          name="billStreet"
          placeholder="Street"
          className={`loginRegInput ${
            formik.touched.billStreet && formik.errors.billStreet ? 'border-shop-cart-red' : ''
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.billStreet}
        />
        <img
          className="invalidInputIcon"
          src={formik.touched.billStreet && formik.errors.billStreet ? streetIconRed : streetIcon}
          alt=""
        />
        {formik.touched.billStreet && formik.errors.billStreet ? (
          <p className="invalidInputMsg">{formik.errors.billStreet}</p>
        ) : null}
      </label>
      <div className="mt-6 flex items-center text-text-grey">
        <input
          id="billSetDefInput"
          type="checkbox"
          name="billSetDefault"
          checked={formik.values.billSetDefault}
          onChange={formik.handleChange}
          className="
            peer/expand
            mr-2
            h-4
            w-4
            appearance-none
            rounded-sm
            border-1
            border-accent
            bg-primary
          "
        />
        <label
          htmlFor="billSetDefInput"
          className="
          relative
          text-3xs
          leading-3
          before:absolute
          before:-left-5
          before:top-0.5
          before:hidden
          before:h-1.5
          before:w-2.5
          before:-rotate-45
          before:border-b-3
          before:border-l-3
          before:border-b-accent
          before:border-l-accent
          peer-checked/expand:before:block
        "
        >
          {checkSameBillShip ? `Set as default billing & shipping address` : 'Set as default billing address'}
        </label>
      </div>
      <div className={checkSameBillShip ? 'hidden' : 'block'}>
        <label htmlFor="shipPostalCodeInput" className="loginRegLabel">
          <input
            id="shipPostCodeInput"
            type="text"
            name="shipPostalCode"
            placeholder="Postal code"
            className={`loginRegInput ${
              formik.touched.shipPostalCode && formik.errors.shipPostalCode ? 'border-shop-cart-red' : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shipPostalCode}
          />
          <img
            className="invalidInputIcon"
            src={formik.touched.shipPostalCode && formik.errors.shipPostalCode ? postalCodeIconRed : postalCodeIcon}
            alt=""
          />
          {formik.touched.shipPostalCode && formik.errors.shipPostalCode ? (
            <p className="invalidInputMsg">{formik.errors.shipPostalCode}</p>
          ) : null}
        </label>
        <label htmlFor="shipStreetInput" className="loginRegLabel">
          <input
            id="shipStreetInput"
            type="text"
            name="shipStreet"
            placeholder="Street"
            className={`loginRegInput ${
              formik.touched.shipStreet && formik.errors.shipStreet ? 'border-shop-cart-red' : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shipStreet}
          />
          <img
            className="invalidInputIcon"
            src={formik.touched.shipStreet && formik.errors.shipStreet ? streetIconRed : streetIcon}
            alt=""
          />
          {formik.touched.shipStreet && formik.errors.shipStreet ? (
            <p className="invalidInputMsg">{formik.errors.shipStreet}</p>
          ) : null}
        </label>
        <div className="mt-6 flex items-center text-text-grey">
          <input
            id="shipSetDefInput"
            type="checkbox"
            name="shipSetDefault"
            checked={formik.values.shipSetDefault}
            onChange={formik.handleChange}
            className="
              peer/expand
              mr-2
              h-4
              w-4
              appearance-none
              rounded-sm
              border-1
              border-accent
              bg-primary
            "
          />
          <label
            htmlFor="shipSetDefInput"
            className="
            relative
            text-3xs
            leading-3
            before:absolute
            before:-left-5
            before:top-0.5
            before:hidden
            before:h-1.5
            before:w-2.5
            before:-rotate-45
            before:border-b-3
            before:border-l-3
            before:border-b-accent
            before:border-l-accent
            peer-checked/expand:before:block
          "
          >
            {checkSameBillShip ? `Set as default billing & shipping address` : 'Set as default billing address'}
          </label>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between font-poppins text-text-grey">
        <button type="button" className="h-10 p-2" onClick={back}>
          Back
        </button>
        <p className="text-center text-xs sm:leading-10">
          Already have an account ?{' '}
          <Link className="font-bold text-accent" to="/login">
            Log in
          </Link>
        </p>
        <button
          type="submit"
          className="h-10 rounded-lg bg-accent p-2 text-primary"
          onClick={() => {
            if (checkSameBillShip) {
              formik.values.shipPostalCode = formik.values.billPostalCode;
              formik.values.shipStreet = formik.values.billStreet;
              formik.values.shipSetDefault = formik.values.billSetDefault;
            }
          }}
        >
          Continue
        </button>
      </div>
    </CustomForm>
  );
}
