import { motion } from 'framer-motion';

export default function PrimaryGulp() {
  return (
    <motion.svg strokeWidth="3.5" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          type: 'spring',
          stiffness: 307,
          damping: 18,
        }}
        style={{
          fill: 'none',
          stroke: '#FFF',
        }}
        d="m5.8 12 5 5 9-9"
      />
    </motion.svg>
  );
}
