import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { PropsType } from '../types';

interface Props extends PropsType {
  sameBillShip: boolean;
  currentStepIndex: number;
}

export default function NavBlock(props: Props) {
  const { backFunc, nextFunc, isNextEnabled, isFirstStep, isLoading, sameBillShip, currentStepIndex } = props;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: sameBillShip || currentStepIndex < 2 ? 0 : '210%' }}
      transition={{
        type: 'spring',
        stiffness: 660,
        damping: 25,
      }}
      className="
        z-10
        mb-6
        flex
        w-full
        items-center
        justify-between
        gap-4
        font-poppins
        text-text-grey
      "
    >
      <button
        type="button"
        className="h-10 rounded-lg p-2 disabled:opacity-20"
        onClick={backFunc}
        disabled={isFirstStep}
      >
        Back
      </button>
      <p className="text-center text-xs sm:leading-10">
        <span className="hidden sm:inline">Already have an account? </span>
        <Link className="text-accent" to="/login">
          Log in
        </Link>
      </p>
      <button
        type="submit"
        className={`h-10 w-24 rounded-lg bg-accent p-2 text-primary transition-all duration-100 disabled:bg-separation-line disabled:text-text-grey ${
          isLoading ? 'animate-pulse' : ''
        }`}
        onClick={nextFunc}
        disabled={!isNextEnabled || isLoading}
      >
        Continue
      </button>
    </motion.div>
  );
}
