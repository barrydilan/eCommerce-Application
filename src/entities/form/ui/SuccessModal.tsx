import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import accentGulp from '../../../assets/icons/AccentGulp.svg';
import { pageVariants } from '../../../shared/ui';

function SuccessModal() {
  return (
    <motion.div
      key="modal"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      className="
      mx-3
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
      <h3 className="text-5xl font-medium tracking-widest text-text-dark">Success!</h3>
      <p className="text-center text-base text-text-grey">Your account has been created</p>
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
        border-accent
      `}
      >
        <img src={accentGulp} alt="" />
      </div>
      <Link
        to="/"
        className="
          mb-4
          mt-8
          h-10
          w-1/4
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

export default SuccessModal;
