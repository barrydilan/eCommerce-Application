import { motion } from 'framer-motion';

import CheckCircle from './CheckCircle';

const titles = ['Email & Password', 'Name & Birth', 'Country & City', 'PC & Street'];

export default function CirclesWrapper(props: {
  currStep: number;
  quantity: number;
  sameBillShip: boolean;
  currentStepIndex: number;
}) {
  const { currStep, quantity, currentStepIndex, sameBillShip } = props;
  const circles = Array.from({ length: quantity }, (_, i) => (
    <CheckCircle numb={i} title={titles[i]} currStep={currStep} key={titles[i]} />
  ));
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: sameBillShip || currentStepIndex < 2 ? 0 : '-110%' }}
      transition={{
        type: 'spring',
        stiffness: 660,
        damping: 25,
      }}
      className="mt-10 flex w-full justify-between gap-4 pr-4 sm:gap-10"
    >
      {circles}
    </motion.div>
  );
}
