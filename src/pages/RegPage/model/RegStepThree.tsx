import { useFormik } from 'formik';

import { validSchemaStepThree } from './validationSchemas';
import cityIcon from '../../../assets/icons/CityIcon.svg';
import cityIconRed from '../../../assets/icons/CityIconRed.svg';
import countryIcon from '../../../assets/icons/CountryIcon.svg';
import CustomForm from '../../../entities/form/ui/CustomForm';
import NavBlock from '../ui/NavBlock';

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
  next: () => void;
  back: () => void;
};

const shipBillCluesStyles = 'relative after:absolute after:-top-5 after:right-0 after:text-2xs';

export default function RegStepThree(props: UserFormProps) {
  const { shipCountry, shipCity, billCountry, billCity, sameBillShip, updateData, back, next } = props;

  const formik = useFormik({
    initialValues: {
      billCountry,
      billCity,
      shipCountry,
      shipCity,
      sameBillShip,
    },
    validationSchema,
    onSubmit: (values) => {
      updateData({
        shipCountry: values.shipCountry,
        shipCity: values.shipCity,
        billCountry: values.billCountry,
        billCity: values.billCity,
        sameBillShip: values.sameBillShip,
      });
      next();
    },
  });
  const { handleSubmit, handleChange, handleBlur, errors, touched, values } = formik;

  return (
    <CustomForm onSubmit={handleSubmit}>
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
      <NavBlock
        isBackBtn
        backFunc={back}
        nextFunc={() => {
          if (values.sameBillShip) {
            values.shipCountry = values.billCountry;
            values.shipCity = values.billCity;
          }
        }}
      />
    </CustomForm>
  );
}
