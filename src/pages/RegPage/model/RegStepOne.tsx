import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import emailIcon from '../../../assets/icons/emailIcon.svg';
import emailIconRed from '../../../assets/icons/emailIconRed.svg';
import lockIcon from '../../../assets/icons/LockIcon.svg';
import lockIconRed from '../../../assets/icons/LockIconRed.svg';
import CustomForm from '../../../entities/form/ui/CustomForm';

const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;

const validationSchema = Yup.object({
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
  next: () => void;
};

export default function RegStepOne(props: UserFormProps) {
  const { email, password, updateData, next } = props;
  const formik = useFormik({
    initialValues: {
      email,
      password,
    },
    validationSchema,
    onSubmit: (values) => {
      updateData({ password: values.password, email: values.email });
      next();
    },
  });

  return (
    <CustomForm onSubmit={formik.handleSubmit}>
      <label htmlFor="emailRegInput" className="loginRegLabel">
        <input
          id="emailRegInput"
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
      <label htmlFor="passRegInput" className="loginRegLabel">
        <input
          id="passRegInput"
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
      <div className="mt-6 flex items-center justify-around font-poppins text-text-grey">
        <p className="text-center text-xs sm:leading-10">
          Already have an account?{' '}
          <Link className="font-bold text-accent" to="/login">
            Log in
          </Link>
        </p>
        <button type="submit" className="h-10 rounded-lg bg-accent p-2 text-primary">
          Continue
        </button>
      </div>
    </CustomForm>
  );
}
