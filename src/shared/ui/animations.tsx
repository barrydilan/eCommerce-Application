export const inputAnimation = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: 'spring',
    stiffness: 360,
    damping: 20,
    duration: 0.4,
  },
};

export const svgAnimation = {
  initial: { scale: 0, rotate: '90deg' },
  animate: { scale: 1, rotate: '0' },
  transition: {
    type: 'spring',
    stiffness: 360,
    damping: 24,
    delay: 0.2,
    duration: 0.2,
  },
};
