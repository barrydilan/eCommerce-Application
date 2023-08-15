import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { togglePassVisibility, validationSchema } from './model/loginPageModel';
import { COOKIE_ACCESS_TOKEN_NAME, useLoginUserMutation, userSlice } from '../../entities/user';
import { setCookie, useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import ILoginUserData from '../../shared/types';

function LoginPage() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const { loggedIn } = userSlice.actions;

  async function handleSubmit(userData: ILoginUserData) {
    if (isLogged) {
      navigate('/');
      return;
    }

    try {
      const { access_token: accessToken, expires_in: expiresIn } = await loginUser(userData).unwrap();

      dispatch(loggedIn(accessToken));
      navigate('/');
      setCookie(accessToken, COOKIE_ACCESS_TOKEN_NAME, expiresIn);
    } catch (e) {
      // console.error(`Error occurred while logging the user! (${e.status})`);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div
      className={`
        flex
        h-full
        w-full
        items-center
        justify-center
        font-poppins
        ${isLoading ? 'opacity-70' : ''}
        `}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="
          min-w-78 
          ml-3 
          mr-3 
          box-border 
          w-128 
          rounded-3xl 
          border-2 
          border-separation-line 
          pb-2 
          pl-4 
          pr-4 
          pt-2
        "
      >
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
          <div
            className={`
              invalidInputIcon
              ${formik.touched.email && formik.errors.email ? 'bg-emailIconRed' : 'bg-emailIcon'}
            `}
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
          <div
            className={`
              invalidInputIcon
              ${formik.touched.password && formik.errors.password ? 'bg-lockIconRed' : 'bg-lockIcon'}
            `}
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
          disabled={isLoading}
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
      </form>
    </div>
  );
}

export default LoginPage;
