import { useEffect } from 'react';

import { useFormik } from 'formik';

import { validSchemaStepThree } from './validationSchemas';
import cityIcon from '../../../assets/icons/CityIcon.svg';
import cityIconRed from '../../../assets/icons/CityIconRed.svg';
import countryIcon from '../../../assets/icons/CountryIcon.svg';
import CustomRegForm from '../../../entities/form/ui';
import { ISignUpAddress } from '../../../shared/types';
import { UserFormProps } from '../types';

const validationSchema = validSchemaStepThree();

const shipBillCluesStyles = 'relative after:absolute after:-top-5 after:right-0 after:text-2xs';

export default function RegStepThree(props: UserFormProps) {
  const {
    addresses: [
      { country: billCountry = '', city: billCity = '' } = {},
      { country: shipCountry = '', city: shipCity = '' } = {},
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
  const { handleChange, handleBlur, errors, touched, values } = formik;

  useEffect(() => {
    if (values.sameBillShip === true) {
      values.shipCountry = values.billCountry;
      values.shipCity = values.billCity;
      errors.shipCountry = undefined;
      errors.shipCity = undefined;
      touched.shipCountry = true;
      touched.shipCity = true;
    }

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
      (touched.shipCountry === undefined && values.shipCountry === '') ||
      (touched.shipCity === undefined && values.shipCity === '') ||
      (touched.billCountry === undefined && values.billCountry === '') ||
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
        <select
          id="billCountryInput"
          name="billCountry"
          className="loginRegInput"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.billCountry}
        >
          <option value="US">USA</option>
          <option value="UA">Ukraine</option>
          <option value="DE">Germany</option>
        </select>
        <img className="invalidInputIcon" src={countryIcon} alt="" />
      </label>
      <label htmlFor="billCityInput" className="loginRegLabel">
        <input
          id="billCityInput"
          type="text"
          name="billCity"
          placeholder="City"
          className={`loginRegInput ${touchedAndErrorBillCity ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.billCity}
        />
        <img className="invalidInputIcon" src={touchedAndErrorBillCity ? cityIconRed : cityIcon} alt="" />
        {touchedAndErrorBillCity && <p className="invalidInputMsg">{errors.billCity}</p>}
      </label>
      <div className="mt-6 flex items-center text-text-grey">
        <input
          id="expand"
          type="checkbox"
          name="sameBillShip"
          checked={values.sameBillShip}
          onChange={handleChange}
          className="hiddenCheckBox peer/expand"
        />
        <label
          htmlFor="expand"
          className="regFormCheckGulp relative text-3xs leading-3 peer-checked/expand:before:block"
        >
          Use the same address <br />
          as a billing and a shipping
        </label>
      </div>
      <div className={values.sameBillShip ? 'hidden' : 'block'}>
        <label htmlFor="billCountryInput" className={`loginRegLabel ${shipBillCluesStyles} after:content-['Shipping']`}>
          <select
            id="shipCountryInput"
            name="shipCountry"
            className="loginRegInput"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.shipCountry}
          >
            <option value="US">USA</option>
            <option value="UA">Ukraine</option>
            <option value="DE">Germany</option>
          </select>
          <img className="invalidInputIcon" src={countryIcon} alt="" />
        </label>
        <label htmlFor="shipCityInput" className="loginRegLabel">
          <input
            id="shipCityInput"
            type="text"
            name="shipCity"
            placeholder="City"
            className={`loginRegInput ${touchedAndErrorShipCity ? 'border-shop-cart-red' : ''}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.shipCity}
          />
          <img className="invalidInputIcon" src={touchedAndErrorShipCity ? cityIconRed : cityIcon} alt="" />
          {touchedAndErrorShipCity && <p className="invalidInputMsg">{errors.shipCity}</p>}
        </label>
      </div>
    </CustomRegForm>
  );
}
