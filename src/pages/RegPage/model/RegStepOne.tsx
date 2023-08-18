import { useEffect } from 'react';

import { useFormik } from 'formik';

import { validSchemaStepOne } from './validationSchemas';
import emailIcon from '../../../assets/icons/emailIcon.svg';
import emailIconRed from '../../../assets/icons/emailIconRed.svg';
import lockIcon from '../../../assets/icons/LockIcon.svg';
import lockIconRed from '../../../assets/icons/LockIconRed.svg';
import CustomRegForm from '../../../entities/form/ui/CustomRegForm';
import { UserFormProps } from '../RegPage';

const validationSchema = validSchemaStepOne();

export default function RegStepOne(props: UserFormProps) {
  const { email, password, updateData, enableNext } = props;
  const formik = useFormik({
    initialValues: {
      email,
      password,
    },
    validationSchema,
    onSubmit: () => {},
  });

  const { handleChange, handleBlur, errors, touched, values } = formik;

  useEffect(() => {
    updateData({ email: values.email, password: values.password });
    if (
      (touched.email === undefined && values.email === '') ||
      (touched.password === undefined && values.password === '')
    ) {
      enableNext(false);
      return;
    }
    if (errors.email || errors.password) {
      enableNext(false);
      return;
    }
    enableNext(true);
  }, [values, errors, touched, enableNext, updateData]);

  const touchedAndErrorEmail = touched.email && errors.email;
  const touchedAndErrorPassword = touched.password && errors.password;

  return (
    <CustomRegForm>
      <label htmlFor="emailRegInput" className="loginRegLabel">
        <input
          id="emailRegInput"
          type="email"
          name="email"
          placeholder="Email"
          className={`loginRegInput ${touchedAndErrorEmail ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        <img className="invalidInputIcon" src={touchedAndErrorEmail ? emailIconRed : emailIcon} alt="" />
        {touchedAndErrorEmail && <p className="invalidInputMsg">{errors.email}</p>}
      </label>
      <label htmlFor="passRegInput" className="loginRegLabel">
        <input
          id="passRegInput"
          type="text"
          name="password"
          placeholder="Password"
          className={`loginRegInput ${touchedAndErrorPassword ? 'border-shop-cart-red' : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        <img className="invalidInputIcon" src={touched.password && errors.password ? lockIconRed : lockIcon} alt="" />
        {touchedAndErrorPassword ? <p className="invalidInputMsg">{errors.password}</p> : null}
      </label>
    </CustomRegForm>
  );
}
