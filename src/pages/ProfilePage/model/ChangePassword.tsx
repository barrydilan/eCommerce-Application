import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import * as Yup from 'yup';

import lockIcon from '../../../assets/icons/LockIcon.svg';
import lockIconRed from '../../../assets/icons/LockIconRed.svg';
import { useLazyGetUserQuery, useLoginUser, useUpdateUserPasswordMutation } from '../../../entities/user';
import { validPassword } from '../../../shared/const/validationSchemas';
import { useAppSelector, useRevokeAccessRefreshTokens } from '../../../shared/lib/hooks';
import { IUser } from '../../../shared/types';
import { ErrorMessage, inputAnimation, svgAnimation } from '../../../shared/ui';
import MODAL_TIMEOUT from '../constants/constants.ts';
import InfoModal from '../ui/InfoModal';

const validationSchema = Yup.object({
  currPass: validPassword().password,
  newPass: validPassword().password,
});

export default function ChangePassword(props: { userData: IUser }) {
  const { userData } = props;
  const { id, version } = userData;
  const [isSaveBlocked, setIsSaveBlocked] = useState(true);
  const [msgModalShown, setMsgModalShown] = useState(false);
  const [msgModalText, setMsgModalText] = useState('Sometext');
  const [getUser] = useLazyGetUserQuery();
  const [updatePassword] = useUpdateUserPasswordMutation();
  const [loginUser] = useLoginUser();
  const revokeTokens = useRevokeAccessRefreshTokens();

  const { accessToken: oldAccessToken, refreshToken: oldRefreshToken } = useAppSelector((state) => state.userReducer);

  const formik = useFormik({
    initialValues: {
      currPass: '',
      newPass: '',
    },
    validationSchema,
    onSubmit: () => {},
  });

  const { handleChange, handleBlur, errors, touched, values } = formik;
  const touchedAndErrorCurrPassword = touched.currPass && errors.currPass;
  const touchedAndErrorNewPassword = touched.newPass && errors.newPass;

  useEffect(() => {
    if (
      (touched.currPass === undefined && values.currPass === '') ||
      (touched.newPass === undefined && values.newPass === '')
    ) {
      setIsSaveBlocked(true);
      return;
    }
    if (errors.currPass || errors.newPass) {
      setIsSaveBlocked(true);
      return;
    }
    setIsSaveBlocked(false);
  }, [values, errors, touched, setIsSaveBlocked]);

  async function saveHandler() {
    try {
      await updatePassword({
        version,
        currentPassword: values.currPass,
        newPassword: values.newPass,
      });

      setMsgModalText(`Password was changed! :)`);
      setMsgModalShown(true);
      setTimeout(() => {
        setMsgModalShown(false);
      }, MODAL_TIMEOUT);
      setIsSaveBlocked(true);

      await loginUser(userData.email, values.newPass, id);
      revokeTokens(oldAccessToken, oldRefreshToken);
      getUser(id);
    } catch (e) {
      setMsgModalText(`Oh snap! Something went wrong :(`);
      setMsgModalShown(true);
      setTimeout(() => setMsgModalShown(false), MODAL_TIMEOUT);
    }
  }

  return (
    <div>
      <h4 className="mx-auto mt-12 w-full text-center text-base font-medium dark:text-primary">Password</h4>
      <div className="profileInputWrapper relative">
        <InfoModal msgModalShown={msgModalShown} msgModalText={msgModalText} />
        <div className="text-base font-medium dark:text-primary">Current password</div>
        <label htmlFor="currPass" className="loginRegLabel mt-5 sm:mt-0 sm:max-w-[350px]">
          <motion.input
            initial={inputAnimation.initial}
            animate={inputAnimation.animate}
            transition={{ ...inputAnimation.transition, delay: 0.05 }}
            id="currPass"
            type="text"
            name="currPass"
            placeholder="Password"
            className={`loginRegInput ${touchedAndErrorCurrPassword ? 'border-shop-cart-red' : ''}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.currPass}
          />
          <motion.img
            initial={svgAnimation.initial}
            animate={svgAnimation.animate}
            transition={{ ...svgAnimation.transition, delay: 0.25 }}
            className="invalidInputIcon"
            src={touchedAndErrorCurrPassword ? lockIconRed : lockIcon}
            alt=""
          />
          {touchedAndErrorCurrPassword && <ErrorMessage>{errors.currPass}</ErrorMessage>}
        </label>
      </div>
      <div className="profileInputWrapper">
        <div className="text-base font-medium text-text-dark dark:text-primary">New password</div>
        <label htmlFor="newPass" className="loginRegLabel mt-5 sm:mt-0 sm:max-w-[350px]">
          <motion.input
            initial={inputAnimation.initial}
            animate={inputAnimation.animate}
            transition={{ ...inputAnimation.transition, delay: 0.05 }}
            id="newPass"
            type="text"
            name="newPass"
            placeholder="Password"
            className={`loginRegInput ${touchedAndErrorNewPassword ? 'border-shop-cart-red' : ''}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.newPass}
          />
          <motion.img
            initial={svgAnimation.initial}
            animate={svgAnimation.animate}
            transition={{ ...svgAnimation.transition, delay: 0.25 }}
            className="invalidInputIcon"
            src={touchedAndErrorNewPassword ? lockIconRed : lockIcon}
            alt=""
          />
          {touchedAndErrorNewPassword && <ErrorMessage>{errors.newPass}</ErrorMessage>}
        </label>
      </div>
      <div className="flex w-full justify-end">
        <button
          className="mt-5 h-10 w-full rounded-md bg-accent-lightest text-center text-accent transition-all duration-300 disabled:bg-separation-line disabled:text-text-grey sm:w-30"
          type="button"
          disabled={isSaveBlocked}
          onClick={saveHandler}
        >
          Save
        </button>
      </div>
    </div>
  );
}
