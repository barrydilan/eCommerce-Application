import { useRef } from 'react';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { togglePassVisibility, validationSchema } from './model/loginPageModel';
import emailIcon from '../../assets/icons/emailIcon.svg';
import emailIconRed from '../../assets/icons/emailIconRed.svg';
import lockIcon from '../../assets/icons/LockIcon.svg';
import lockIconRed from '../../assets/icons/LockIconRed.svg';
import { inputAnimation, svgAnimation } from '../../shared/ui/animations';

function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: () => {},
  });

  const passwordInput = useRef(null);

  return (
    <div
      className="
        flex 
        h-full 
        w-full 
        items-center 
        justify-center 
        font-poppins 
      "
    >
      <form
        onSubmit={formik.handleSubmit}
        className="
          ml-3 
          mr-3 
          box-content 
          w-128
          rounded-3xl 
          border-2 
          border-separation-line 
          pb-2 
          pl-4 
          pr-4 
          pt-2
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
