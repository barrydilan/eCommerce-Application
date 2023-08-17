import { useEffect } from 'react';

import { useFormik } from 'formik';

import { validSchemaStepThree } from './validationSchemas';
import cityIcon from '../../../assets/icons/CityIcon.svg';
import cityIconRed from '../../../assets/icons/CityIconRed.svg';
import countryIcon from '../../../assets/icons/CountryIcon.svg';
import CustomRegForm from '../../../entities/form/ui/CustomRegForm';

const validationSchema = validSchemaStepThree();

type UserData = {
  billCountry: string;
  billCity: string;
  shipCountry: string;
  shipCity: string;
  sameBillShip: boolean;
};

type UserFormProps = UserData & {
  updateData: (fields: UserData) => void;
  setIsNextEnabled: (arg: boolean) => void;
};

const shipBillCluesStyles = 'relative after:absolute after:-top-5 after:right-0 after:text-2xs';

export default function RegStepThree(props: UserFormProps) {
  const { shipCountry, shipCity, billCountry, billCity, sameBillShip, updateData, setIsNextEnabled } = props;

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

    updateData({
      shipCountry: values.shipCountry,
      shipCity: values.shipCity,
      billCountry: values.billCountry,
      billCity: values.billCity,
      sameBillShip: values.sameBillShip,
    });

    if (
      (touched.shipCountry === undefined && values.shipCountry === '') ||
      (touched.shipCity === undefined && values.shipCity === '') ||
      (touched.billCountry === undefined && values.billCountry === '') ||
      (touched.billCity === undefined && values.billCity === '')
    ) {
      setIsNextEnabled(false);
      return;
    }
    if (errors.shipCountry || errors.shipCity || errors.billCountry || errors.billCity) {
      setIsNextEnabled(false);
      return;
    }
    setIsNextEnabled(true);
  }, [values, errors, touched]);

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
          className={`loginRegInput ${touched.billCountry && errors.billCountry ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.billCountry}
        >
          <option value="usa">USA</option>
          <option value="ukraine">Ukraine</option>
          <option value="germany">Germany</option>
        </select>
        <img className="invalidInputIcon" src={countryIcon} alt="" />
      </label>
      <label htmlFor="billCityInput" className="loginRegLabel">
        <input
          id="billCityInput"
          type="text"
          name="billCity"
          placeholder="City"
          className={`loginRegInput ${touched.billCity && errors.billCity ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.billCity}
        />
        <img className="invalidInputIcon" src={touched.billCity && errors.billCity ? cityIconRed : cityIcon} alt="" />
        {touched.billCity && errors.billCity && <p className="invalidInputMsg">{errors.billCity}</p>}
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
        <label
          htmlFor="billCountryInput"
          className={`loginRegLabel ${`${shipBillCluesStyles} after:content-['Shipping']`}
        `}
        >
          <select
            id="shipCountryInput"
            name="shipCountry"
            className={`loginRegInput ${touched.shipCountry && errors.shipCountry ? 'border-shop-cart-red' : ''}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.shipCountry}
          >
            <option value="usa">USA</option>
            <option value="ukraine">Ukraine</option>
            <option value="germany">Germany</option>
          </select>
          <img className="invalidInputIcon" src={countryIcon} alt="" />
        </label>
        <label htmlFor="shipCityInput" className="loginRegLabel">
          <input
            id="shipCityInput"
            type="text"
            name="shipCity"
            placeholder="City"
            className={`loginRegInput ${touched.shipCity && errors.shipCity ? 'border-shop-cart-red' : ''}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.shipCity}
          />
          <img className="invalidInputIcon" src={touched.shipCity && errors.shipCity ? cityIconRed : cityIcon} alt="" />
          {touched.shipCity && errors.shipCity ? <p className="invalidInputMsg">{errors.shipCity}</p> : null}
        </label>
      </div>
    </CustomRegForm>
  );
}
