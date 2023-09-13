import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import redCross from '../../../assets/icons/RedCross.svg';
import { pageVariants } from '../../../shared/ui';

interface IErrorModalProps {
  reStartForm: () => void;
  errorMessage: string;
  navigateTo: string;
}

export default function ErrorModal({ reStartForm, errorMessage, navigateTo }: IErrorModalProps) {
  return (
    <motion.div
      key="modal"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      className="
      mx-3
      my-24
      box-border
      flex
      w-10/12
      flex-col
      items-center
      rounded-3xl
      border-2
      border-separation-line
      p-6
      sm:w-128
    "
    >
      <h3 className="text-5xl font-medium tracking-widest text-text-dark dark:text-primary">Oh snap!</h3>
      <p className="mt-5 text-center text-base text-text-grey">
        <span className="text-text-dark dark:text-primary">{errorMessage}</span> <br />
        <br />
        <span>Change a few things up and try again</span>
      </p>
      <div
        className={`
        relative
        mt-8
        flex 
        h-30
        w-30 
        justify-center
        rounded-full
        border-3
        border-shop-cart-red
      `}
      >
        <img src={redCross} alt="" />
      </div>
      <Link
        onClick={() => {
          reStartForm();
        }}
        to={navigateTo}
        className="
          mb-4
          mt-8
          h-10
          w-30
          rounded-lg
          bg-accent
          p-2
          text-center
          text-primary
        "
      >
        Continue
      </Link>
    </motion.div>
  );
}
