import { useRef } from 'react';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

import { togglePassVisibility, validationSchema } from './model/loginPageModel';
import ErrorModal from './ui/ErrorModal.tsx';
import emailIcon from '../../assets/icons/emailIcon.svg';
import emailIconRed from '../../assets/icons/emailIconRed.svg';
import lockIcon from '../../assets/icons/LockIcon.svg';
import lockIconRed from '../../assets/icons/LockIconRed.svg';
import { useLoginUser, useLoginUserDataMutation } from '../../entities/user';
import { useAppSelector } from '../../shared/lib/hooks';
import { ILoginUserParams } from '../../shared/types';
import { ErrorMessage, inputAnimation, pageVariants, svgAnimation } from '../../shared/ui';

function LoginPage() {
  const [loginUser, { error: loginError, isLoading: loginIsLoading }] = useLoginUser();
  const [getLoginUserData, { error: loginDataError, isLoading: loginDataIsLoading }] = useLoginUserDataMutation();
  const { isLogged } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const passwordInput = useRef(null);

  const logErrObj = (loginError as FetchBaseQueryError)?.data;
  const logDataErrObj = (loginDataError as FetchBaseQueryError)?.data;
  let loginErrorMessage = '';
  let loginDataErrorMessage = '';

  if (logErrObj instanceof Object && 'message' in logErrObj) {
    loginErrorMessage = logErrObj.message as string;
  }

  if (logDataErrObj instanceof Object && 'message' in logDataErrObj) {
    loginDataErrorMessage = logDataErrObj.message as string;
  }

  function handleNavigateBackToLogin() {
    navigate('/login');
  }

  async function handleSubmit(userData: ILoginUserParams) {
    if (isLogged) {
      navigate('/');
      return;
    }

    try {
      const {
        customer: { id },
      } = await getLoginUserData(userData).unwrap();

      await loginUser(userData.email, userData.password, id);

      navigate('/');
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
            {formik.touched.email && formik.errors.email ? <ErrorMessage>{formik.errors.email}</ErrorMessage> : null}
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
              transition={{ ...svgAnimation.transition, delay: 0.25 }}
              className="invalidInputIcon"
              src={formik.touched.password && formik.errors.password ? lockIconRed : lockIcon}
              alt=""
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
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
            disabled={loginIsLoading || loginDataIsLoading}
            type="submit"
            className={`
                  mt-3
                  h-10
                  w-full
                  rounded-md
                  bg-accent
                  text-base
                  text-primary
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
      ) : (
        <ErrorModal reStartForm={handleNavigateBackToLogin} errorMessage={loginErrorMessage || loginDataErrorMessage} />
      )}
    </motion.div>
  );
}

export default LoginPage;
