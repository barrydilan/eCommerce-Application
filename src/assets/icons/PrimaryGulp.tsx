import { AnimatePresence, motion } from 'framer-motion';

export default function PrimaryGulp() {
  return (
    <AnimatePresence>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          exit={{ opacity: 0 }}
          style={{
            fill: 'none',
            stroke: '#FFF',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
          }}
          d="m5 12 5 5 9-9"
        />
      </svg>
    </AnimatePresence>
  );
}
