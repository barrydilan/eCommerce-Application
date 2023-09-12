import { AnimatePresence, motion } from 'framer-motion';

export default function InfoModal(props: { msgModalShown: boolean; msgModalText: string }) {
  const { msgModalShown, msgModalText } = props;
  return (
    <AnimatePresence>
      {msgModalShown ? (
        <motion.div
          key="dialog"
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ y: '100%', scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 560,
            damping: 28,
          }}
          exit={{ scale: 0, opacity: 0 }}
          className={`
          fixed
          right-10
          top-0
          z-50
          flex
          h-20 
          w-60 
          items-center
          justify-center
          rounded-md
          border-2
          border-separation-line
          bg-primary
          px-2
          text-center
          font-medium
          dark:border-dark-separation-line
          dark:bg-dark-bg-primary
          dark:text-primary
        `}
        >
          {msgModalText}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
