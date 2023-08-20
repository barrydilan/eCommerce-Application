import { useRef } from 'react';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

import { togglePassVisibility, validationSchema } from './model/loginPageModel';
import emailIcon from '../../assets/icons/emailIcon.svg';
import emailIconRed from '../../assets/icons/emailIconRed.svg';
import lockIcon from '../../assets/icons/LockIcon.svg';
import lockIconRed from '../../assets/icons/LockIconRed.svg';
import { COOKIE_ACCESS_TOKEN, useLoginTokenMutation, useLoginUserDataMutation, userSlice } from '../../entities/user';
import { COOKIE_USER_ID } from '../../entities/user/consts/constants.ts';
import { setCookie } from '../../shared/lib/helpers';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { CookieTuple, ILoginUserParams } from '../../shared/types';
import { inputAnimation, svgAnimation } from '../../shared/ui/animations';

function LoginPage() {
  const [loginUser, { isLoading }] = useLoginTokenMutation();
  const [getLoginUserData] = useLoginUserDataMutation();
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const { loggedIn } = userSlice.actions;

  const passwordInput = useRef(null);

  async function handleSubmit(userData: ILoginUserParams) {
    if (isLogged) {
      navigate('/');
      return;
    }

    try {
      const waitLoginUser = loginUser(userData).unwrap();
      const waitLoginUserData = getLoginUserData(userData).unwrap();

      const [
        { access_token: accessToken, expires_in: expiresIn },
        {
          customer: { id },
        },
      ] = await Promise.all([waitLoginUser, waitLoginUserData]);

      dispatch(loggedIn({ accessToken, userId: id }));
      navigate('/');

      const accessTokenCookie: CookieTuple = [accessToken, COOKIE_ACCESS_TOKEN, expiresIn];
      const idCookie: CookieTuple = [id, COOKIE_USER_ID, expiresIn];

      setCookie(accessTokenCookie, idCookie);
    } catch (e) {
      // TODO - implement error message
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
        `}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="
          mx-3
          my-10
          box-content
          max-h-[21.5rem]
          w-full
          max-w-[29.9rem]
          rounded-3xl
          border-2 
          border-separation-line 
          px-4
          py-4
          font-medium
          text-text-grey
          sm:pl-10
          sm:pr-10
          "
      >
        <h5
          className="
            pt-4
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
          <motion.input
            initial={inputAnimation.initial}
            animate={inputAnimation.animate}
            transition={inputAnimation.transition}
            id="emailLogInput"
            type="email"
            name="email"
            placeholder="Email"
            className={`loginRegInput ${formik.touched.email && formik.errors.email ? 'border-shop-cart-red' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <motion.img
            initial={svgAnimation.initial}
            animate={svgAnimation.animate}
            transition={svgAnimation.transition}
            className="invalidInputIcon"
            src={formik.touched.email && formik.errors.email ? emailIconRed : emailIcon}
            alt="invalidInputIcon"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="invalidInputMsg">{formik.errors.email}</p>
          ) : null}
        </label>
        <label htmlFor="passLogInput" className="loginRegLabel">
          <motion.input
            initial={inputAnimation.initial}
            animate={inputAnimation.animate}
            transition={inputAnimation.transition}
            id="passLogInput"
            type="password"
            name="password"
            autoComplete="myFancyPassword"
            placeholder="Password"
            className={`loginRegInput ${
              formik.touched.password && formik.errors.password ? 'border-shop-cart-red' : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            ref={passwordInput}
          />
          <motion.img
            initial={svgAnimation.initial}
            animate={svgAnimation.animate}
            transition={svgAnimation.transition}
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
            onClick={() => togglePassVisibility(passwordInput.current)}
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
          className={`
              mt-3
              h-10
              w-full
              rounded-md
              bg-accent
              text-base
              text-primary
              ${isLoading ? 'animate-pulse' : ''}
              `}
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
              text-accent
            "
            to="/registration"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
