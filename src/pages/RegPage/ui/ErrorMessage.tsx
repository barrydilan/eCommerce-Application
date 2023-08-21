import { motion } from 'framer-motion';

interface IErrorMessageProps {
  children: string | undefined;
}

function ErrorMessage({ children }: IErrorMessageProps) {
  return (
    <motion.p
      key={children}
      initial={{ translateX: '-20%' }}
      animate={{ translateX: '0' }}
      exit={{ scale: 0 }}
      transition={{
        type: 'spring',
        stiffness: 1200,
        damping: 20,
        duration: 0.2,
      }}
      className="invalidInputMsg"
    >
      {children}
    </motion.p>
  );
}

export default ErrorMessage;
