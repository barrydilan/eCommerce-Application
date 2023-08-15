import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import cityIcon from '../../../assets/icons/CityIcon.svg';
import cityIconRed from '../../../assets/icons/CityIconRed.svg';
import countryIcon from '../../../assets/icons/CountryIcon.svg';
import CustomForm from '../../../entities/form/ui/CustomForm';

const nameRegEx = /^[a-zA-Z]+$/;

const validationSchema = Yup.object({
  billCity: Yup.string()
    .matches(nameRegEx, { message: 'City name must contain only letters', excludeEmptyString: true })
    .max(20, 'Too long name')
    .required('City name is required'),
  shipCity: Yup.string()
    .matches(nameRegEx, { message: 'City name must contain A, a letters', excludeEmptyString: true })
    .max(20, 'Too long name')
    .required('City name is required'),
});

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

  return (
    <CustomForm onSubmit={formik.handleSubmit}>
      <label
        htmlFor="billCountryInput"
        className={`
        loginRegLabel
        ${
          formik.values.sameBillShip
            ? ''
            : "relative after:absolute after:-top-5 after:right-0 after:text-2xs after:content-['Billing']"
        }
      `}
      >
        <select
          id="billCountryInput"
          name="billCountry"
          className={`loginRegInput ${
            formik.touched.billCountry && formik.errors.billCountry ? 'border-shop-cart-red' : ''
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.billCountry}
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
          className={`loginRegInput ${formik.touched.billCity && formik.errors.billCity ? 'border-shop-cart-red' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.billCity}
        />
        <img
          className="invalidInputIcon"
          src={formik.touched.billCity && formik.errors.billCity ? cityIconRed : cityIcon}
          alt=""
        />
        {formik.touched.billCity && formik.errors.billCity ? (
          <p className="invalidInputMsg">{formik.errors.billCity}</p>
        ) : null}
      </label>
      <div className="mt-6 flex items-center text-text-grey">
        <input
          id="expand"
          type="checkbox"
          name="sameBillShip"
          checked={formik.values.sameBillShip}
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
          htmlFor="expand"
          className="
          relative
          text-3xs
          leading-3
          before:absolute
          before:-left-5
          before:top-2
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
          Use the same address <br />
          as a billing and a shipping
        </label>
      </div>
      <div className={formik.values.sameBillShip ? 'hidden' : 'block'}>
        <label
          htmlFor="billCountryInput"
          className="
        loginRegLabel
        relative
        after:absolute
        after:-top-5
        after:right-0
        after:text-2xs
        after:content-['Shipping']
        "
        >
          <select
            id="shipCountryInput"
            name="shipCountry"
            className={`loginRegInput ${
              formik.touched.shipCountry && formik.errors.shipCountry ? 'border-shop-cart-red' : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shipCountry}
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
            className={`loginRegInput ${
              formik.touched.shipCity && formik.errors.shipCity ? 'border-shop-cart-red' : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shipCity}
          />
          <img
            className="invalidInputIcon"
            src={formik.touched.shipCity && formik.errors.shipCity ? cityIconRed : cityIcon}
            alt=""
          />
          {formik.touched.shipCity && formik.errors.shipCity ? (
            <p className="invalidInputMsg">{formik.errors.shipCity}</p>
          ) : null}
        </label>
      </div>
      <div className="mt-6 flex items-center justify-between font-poppins text-text-grey">
        <button type="button" className="h-10 p-2" onClick={back}>
          Back
        </button>
        <p className="text-center text-xs sm:leading-10">
          Already have an account?{' '}
          <Link className="font-bold text-accent" to="/login">
            Log in
          </Link>
        </p>
        <button
          type="submit"
          className="h-10 rounded-lg bg-accent p-2 text-primary"
          onClick={() => {
            if (formik.values.sameBillShip) {
              formik.values.shipCountry = formik.values.billCountry;
              formik.values.shipCity = formik.values.billCity;
            }
          }}
        >
          Continue
        </button>
      </div>
    </CustomForm>
  );
}
