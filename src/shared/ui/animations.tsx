export const inputAnimation = {
  initial: { x: '-12%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: 'spring',
    stiffness: 560,
    damping: 17,
  },
};

export const svgAnimation = {
  initial: { y: '110%', scale: 0, rotate: '30deg' },
  animate: { y: '0%', scale: 1, rotate: '0' },
  transition: {
    type: 'spring',
    stiffness: 520,
    damping: 15,
    delay: 0.1,
  },
};

export const checkboxAnimation = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transitionLabel: {
    type: 'spring',
    stiffness: 660,
    damping: 38,
    delay: 0.4,
  },
  transitionInput: {
    type: 'spring',
    stiffness: 660,
    damping: 23,
    delay: 0.3,
  },
};
