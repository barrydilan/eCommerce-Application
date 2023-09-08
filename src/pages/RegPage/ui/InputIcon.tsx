import { motion } from 'framer-motion';

import { svgAnimation } from '../../../shared/ui';

interface IInputIconProps {
  icon: string;
  delay?: number;
}

function InputIcon({ icon, delay = 0.15 }: IInputIconProps) {
  return (
    <motion.img
      initial={svgAnimation.initial}
      animate={svgAnimation.animate}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ ...svgAnimation.transition, damping: 14, delay }}
      className="invalidInputIcon"
      src={icon}
      alt=""
    />
  );
}

InputIcon.defaultProps = {
  delay: 0.15,
};
export default InputIcon;
