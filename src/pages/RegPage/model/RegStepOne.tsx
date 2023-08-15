import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import emailIcon from '../../../assets/icons/emailIcon.svg';
import emailIconRed from '../../../assets/icons/emailIconRed.svg';
import lockIcon from '../../../assets/icons/LockIcon.svg';
import lockIconRed from '../../../assets/icons/LockIconRed.svg';

const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;

export const validationSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegEx, { message: 'Email must follow email@example.com pattern', excludeEmptyString: true })
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Minimum 8 symbols required')
    .matches(passwordRegex, { message: 'Password must have A, a, 1, ! symbols', excludeEmptyString: true })
    .required('Password is required'),
});

type UserData = {
  email: string;
  password: string;
};

type UserFormProps = UserData & {
  updateData: (fields: UserData) => void;
};

function RegStepOne(props: UserFormProps) {
  const { email, password, updateData } = props;
  const formik = useFormik({
    initialValues: {
      email,
      password,
    },
    validationSchema,
    onSubmit: (values) => {
      updateData({ password: values.password, email: values.email });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" 
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
        {formik.touched.email && formik.errors.email ? <p className="invalidInputMsg">{formik.errors.email}</p> : null}
      </label>
      <label htmlFor="passLogInput" className="loginRegLabel">
        <input
          id="passLogInput"
          type="text"
          name="password"
          placeholder="Password"
          className={`loginRegInput ${formik.touched.password && formik.errors.password ? 'border-shop-cart-red' : ''}`}
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
      <p className="mb-2 mt-4 text-xs text-text-grey">We need your email in order to contact you!</p>
      <div className="mt-6 flex items-center justify-between font-poppins text-text-grey">
        <button type="button" className="h-10 p-2">
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
            console.log(formik.values);
          }}
        >
          Continue
        </button>
      </div>
    </form>
  );
}

export default RegStepOne;
