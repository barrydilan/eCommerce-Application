import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import accentGulp from '../../../assets/icons/AccentGulp.svg';
import redCross from '../../../assets/icons/RedCross.svg';
import { ErrorCodeStatus } from '../../../shared/types';

export default function RegFinal(props: {
  isSuccess: boolean;
  reStartForm: () => void;
  setIsFormSubmitted: (arg: boolean) => void;
  error: FetchBaseQueryError | SerializedError | undefined;
}) {
  const { isSuccess, reStartForm, setIsFormSubmitted, error } = props;
  let errorMessage = '';

  if (error && 'status' in error) {
    errorMessage = error.status === ErrorCodeStatus.ACCOUNT_EXIST ? 'Account with this email is already exist!' : '';
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className=" 
      ml-3
      mr-3
      box-border
      flex 
      w-10/12 
      flex-col 
      items-center 
      rounded-3xl 
      border-2 
      border-separation-line 
      pb-2 
      pl-4 
      pr-4 
      pt-2
      sm:w-128
    "
      >
        <h3 className="text-5xl font-medium tracking-widest text-text-dark">{isSuccess ? 'Success!' : 'Oh snap!'}</h3>
        <p className="text-center text-base text-text-grey">
          {isSuccess ? (
            'Your account has been created'
          ) : (
            <>
              <span className="text-text-dark">{error && errorMessage}</span> <br />
              <span>Change a few things up and try submitting again</span>
            </>
          )}
        </p>
        <div
          className={`
        relative
        mt-8
        h-30 
        w-30
        rounded-full 
        border-3
        ${isSuccess ? 'border-accent' : 'border-shop-cart-red'}
        flex
        justify-center
      `}
        >
          <img src={isSuccess ? accentGulp : redCross} alt="" />
        </div>
        <Link
          onClick={() => {
            reStartForm();
            setIsFormSubmitted(false);
          }}
          to={isSuccess ? '/' : '/registration'}
          className="
          mb-9 
          mt-9 
          h-10 
          rounded-lg 
          bg-accent 
          p-2 
          text-primary
        "
        >
          Continue
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
