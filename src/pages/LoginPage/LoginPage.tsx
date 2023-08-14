import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import { togglePassVisibility, validationSchema } from './model/loginPageModel';
import emailIcon from '../../assets/icons/emailIcon.svg';
import emailIconRed from '../../assets/icons/emailIconRed.svg';
import lockIcon from '../../assets/icons/LockIcon.svg';
import lockIconRed from '../../assets/icons/LockIconRed.svg';
import CustomForm from '../../entities/form/ui/CustomForm';
import FormWrapper from '../../entities/form/ui/FormWrapper';

function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: () => {},
  });

  return (
    <FormWrapper>
      <CustomForm onSubmit={formik.handleSubmit}>
        <h5
          className="
            text-2xl 
            text-text-dark
            "
        >
          Log in
        </h5>
        <h6
          className="
            text-base 
            text-text-grey
            "
        >
          Welcome back!
        </h6>
        <label htmlFor="emailLogInput" className="loginRegLabel">
          <input
            id="emailLogInput"
            type="email"
            name="email"
            placeholder="Email"
            className={`loginRegInput ${formik.touched.email && formik.errors.email ? 'border-shop-cart-red' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <img
            className="invalidInputIcon"
            src={formik.touched.email && formik.errors.email ? emailIconRed : emailIcon}
            alt=""
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="invalidInputMsg">{formik.errors.email}</p>
          ) : null}
        </label>
        <label htmlFor="passLogInput" className="loginRegLabel">
          <input
            id="passLogInput"
            type="password"
            name="password"
            placeholder="Password"
            className={`loginRegInput ${
              formik.touched.password && formik.errors.password ? 'border-shop-cart-red' : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <img
            className="invalidInputIcon"
            src={formik.touched.password && formik.errors.password ? lockIconRed : lockIcon}
            alt=""
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="invalidInputMsg">{formik.errors.password}</p>
          ) : null}
        </label>
        <div
          className="
            mt-2
            flex
            h-8
            w-full
            items-center
            justify-center
          "
        >
          <input
            id="passToggler"
            type="checkbox"
            onClick={() => togglePassVisibility(document.querySelector('#passLogInput'))}
            className="
              peer/passToggler
              mr-2
              h-5
              w-5
              appearance-none
              rounded-md
              bg-accent
            "
          />
          <label
            htmlFor="passToggler"
            className="
            relative
            text-xs
            before:absolute
            before:-left-6
            before:top-0.5
            before:hidden
            before:h-2
            before:w-3
            before:-rotate-45
            before:rounded-sm
            before:border-b-4
            before:border-l-4
            before:border-b-primary
            before:border-l-primary
            peer-checked/passToggler:before:block
          "
          >
            Show password
          </label>
        </div>
        <button
          type="submit"
          className="
            mt-3 
            h-8 
            w-full 
            rounded-md 
            bg-accent 
            text-base 
            text-primary
            "
        >
          Log in
        </button>
        <p
          className="
            mb-6 
            mt-6 
            w-full 
            text-center 
            text-xs
            "
        >
          Don&apos;t have an account yet?{' '}
          <Link
            className="
              font-bold
              text-accent
            "
            to="/registration"
          >
            Sing up
          </Link>
        </p>
      </CustomForm>
    </FormWrapper>
  );
}

export default LoginPage;
