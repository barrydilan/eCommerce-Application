import { useEffect, useRef, useState } from 'react';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import togglePassVisibility from './model/passwordToggler';
import emailIcon from '../../assets/icons/emailIcon.svg';
import emailIconRed from '../../assets/icons/emailIconRed.svg';
import lockIcon from '../../assets/icons/LockIcon.svg';
import lockIconRed from '../../assets/icons/LockIconRed.svg';
import { ErrorModal } from '../../entities/form/ui';
import { useLoginUser, useLoginUserDataMutation } from '../../entities/user';
import { validEmail, validPassword } from '../../shared/const/validationSchemas';
import { getErrorMessage } from '../../shared/lib/helpers';
import { useAppSelector, useRevokeAccessRefreshTokens } from '../../shared/lib/hooks';
import { ILoginUserParams } from '../../shared/types';
import { ErrorMessage, inputAnimation, pageVariants, svgAnimation } from '../../shared/ui';

function LoginPage() {
  const [loginUser, { error: loginError, isLoading: loginIsLoading }] = useLoginUser();
  const [getLoginUserData, { error: loginDataError, isLoading: loginDataIsLoading }] = useLoginUserDataMutation();
  const revokeTokens = useRevokeAccessRefreshTokens();
  const { accessToken: oldAccessToken, refreshToken: oldRefreshToken } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const passwordInput = useRef(null);

  const loginErrorMessage = getErrorMessage(loginError);
  const loginDataErrorMessage = getErrorMessage(loginDataError);

  function handleNavigateBackToLogin() {
    navigate('/login');
  }

  async function handleSubmit(userData: ILoginUserParams) {
    try {
      const {
        customer: { id },
      } = await getLoginUserData(userData).unwrap();

      await loginUser(userData.email, userData.password, id);

      navigate('/');
      revokeTokens(oldAccessToken, oldRefreshToken);
    } catch (e) {
      // console.error(`Error occurred while logging the user! (${e.status})`);
    }
  }

  const validationSchema = Yup.object({
    ...validEmail(),
    ...validPassword(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const { handleChange, handleBlur, errors, touched, values, setFieldError } = formik;

  const touchedAndErrorEmail = touched.email && errors.email;
  const touchedAndErrorPassword = touched.password && errors.password;

  const [enableLogin, setEnableLogin] = useState(false);

  useEffect(() => {
    if (
      (touched.email === undefined && values.email === '') ||
      (touched.password === undefined && values.password === '')
    ) {
      setEnableLogin(false);
      return;
    }
    if (errors.email || errors.password) {
      setEnableLogin(false);
      return;
    }
    if (/\s/.test(values.password as string)) {
      setFieldError('password', "Password can't contain spaces");
    } else {
      setFieldError('password', undefined);
    }
    setEnableLogin(true);
  }, [values, errors, touched, setFieldError]);

  return (
    <motion.div
      key="modal"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      className={`
            flex
            h-full
            w-full
            items-center
            justify-center
            font-poppins
            `}
      style={{ transform: 'rotateY(-90deg)' }}
    >
      {!loginError && !loginDataError ? (
        <form
          onSubmit={formik.handleSubmit}
          className="
              mx-3
              mt-24
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
              lg:mt-10
              lg:w-[29.9rem]
              "
        >
          <h5
            className="
                pt-4
                text-2xl
                text-text-dark
                dark:text-primary
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
              className={`loginRegInput ${touchedAndErrorEmail ? 'border-shop-cart-red' : ''}`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <motion.img
              initial={svgAnimation.initial}
              animate={svgAnimation.animate}
              transition={svgAnimation.transition}
              className="invalidInputIcon"
              src={touchedAndErrorEmail ? emailIconRed : emailIcon}
              alt="invalidInputIcon"
            />
            {touchedAndErrorEmail ? <ErrorMessage>{errors.email}</ErrorMessage> : null}
          </label>
          <label htmlFor="passLogInput" className="loginRegLabel">
            <motion.input
              initial={inputAnimation.initial}
              animate={inputAnimation.animate}
              transition={{ ...inputAnimation.transition, delay: 0.05 }}
              id="passLogInput"
              type="password"
              name="password"
              autoComplete="myFancyPassword"
              placeholder="Password"
              className={`loginRegInput ${touchedAndErrorPassword ? 'border-shop-cart-red' : ''}`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              ref={passwordInput}
            />
            <motion.img
              initial={svgAnimation.initial}
              animate={svgAnimation.animate}
              transition={{ ...svgAnimation.transition, delay: 0.25 }}
              className="invalidInputIcon"
              src={touchedAndErrorPassword ? lockIconRed : lockIcon}
              alt=""
            />
            {touchedAndErrorPassword ? <ErrorMessage>{errors.password}</ErrorMessage> : null}
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
            disabled={!enableLogin || loginIsLoading || loginDataIsLoading}
            type="submit"
            className={`
                  mt-3
                  h-10
                  w-full
                  rounded-md
                  bg-accent
                  text-base
                  text-primary
                  transition-all
                  duration-300
                  disabled:bg-separation-line 
                  disabled:text-text-grey
                  ${loginIsLoading || loginDataIsLoading ? 'animate-pulse' : ''}
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
            <Link className="text-accent" to="/registration">
              Sign up
            </Link>
          </p>
        </form>
      ) : (
        <ErrorModal
          key="error"
          reStartForm={handleNavigateBackToLogin}
          errorMessage={loginErrorMessage || loginDataErrorMessage}
          navigateTo="/login"
        />
      )}
    </motion.div>
  );
}

export default LoginPage;
