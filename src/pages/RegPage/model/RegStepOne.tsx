import { useEffect } from 'react';

import { useFormik } from 'formik';

import { validSchemaStepOne } from './validationSchemas';
import emailIcon from '../../../assets/icons/emailIcon.svg';
import emailIconRed from '../../../assets/icons/emailIconRed.svg';
import lockIcon from '../../../assets/icons/LockIcon.svg';
import lockIconRed from '../../../assets/icons/LockIconRed.svg';

const validationSchema = validSchemaStepOne();

type UserData = {
  email: string;
  password: string;
};

type UserFormProps = UserData & {
  updateData: (fields: UserData) => void;
  setBtnEnabled: (arg: boolean) => void;
};

export default function RegStepOne(props: UserFormProps) {
  const { email, password, updateData, setBtnEnabled } = props;
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

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } = formik;

  useEffect(() => {
    updateData({ email: values.email, password: values.password });
    if (
      (touched.email === undefined && values.email === '') ||
      (touched.password === undefined && values.password === '')
    ) {
      setBtnEnabled(false);
      return;
    }
    if (errors.email || errors.password) {
      setBtnEnabled(false);
      return;
    }
    setBtnEnabled(true);
  }, [values, errors, touched]);

  return (
    <form
      onSubmit={handleSubmit}
      className=" 
        ml-3 
        mr-3 
        box-border 
        w-full
        font-medium
        text-text-grey
      "
    >
      <label htmlFor="emailRegInput" className="loginRegLabel">
        <input
          id="emailRegInput"
          type="email"
          name="email"
          placeholder="Email"
          className={`loginRegInput ${touched.email && errors.email ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        <img className="invalidInputIcon" src={touched.email && errors.email ? emailIconRed : emailIcon} alt="" />
        {touched.email && errors.email && <p className="invalidInputMsg">{errors.email}</p>}
      </label>
      <label htmlFor="passRegInput" className="loginRegLabel">
        <input
          id="passRegInput"
          type="text"
          name="password"
          placeholder="Password"
          className={`loginRegInput ${touched.password && errors.password ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        <img className="invalidInputIcon" src={touched.password && errors.password ? lockIconRed : lockIcon} alt="" />
        {touched.password && errors.password ? <p className="invalidInputMsg">{errors.password}</p> : null}
      </label>
    </form>
  );
}
