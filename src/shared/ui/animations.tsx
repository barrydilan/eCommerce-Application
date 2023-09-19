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

export const pageVariants = {
  initial: {
    opacity: 0,
    rotateY: '-90deg',
    transition: {
      type: 'spring',
      stiffness: 110,
    },
  },
  in: {
    opacity: 1,
    rotateY: '0deg',
    transition: {
      type: 'spring',
      stiffness: 110,
    },
  },
  out: {
    scale: 5,
    opacity: 0.5,
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

export const buttonTapAnimation = {
  scale: 0.9,
};

export const buttonTransition = {
  duration: 0.01,
};

export const itemInitial = {
  opacity: 0,
  scale: 0.5,
};

export const itemAnimation = {
  opacity: 1,
  scale: 1,
};

export const itemTransition = {
  type: 'spring',
  stiffness: 860,
  damping: 30,
};

export const itemExit = {
  opacity: 0,
  scale: 0,
};

export const emptyCartInitial = { opacity: 0, scale: 0 };
export const emptyCartAnimate = { opacity: 1, scale: 1 };
export const emptyCartTransition = {
  type: 'spring',
  stiffness: 560,
  damping: 20,
};
