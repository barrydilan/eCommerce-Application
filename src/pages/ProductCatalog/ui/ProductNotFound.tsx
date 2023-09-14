import { motion } from 'framer-motion';

import emptyCart from '../../../assets/icons/empty-cart.svg';

function ProductNotFound() {
  return (
    <div className="grid h-full w-full content-center justify-center justify-items-center">
      <motion.img
        initial={{ opacity: 0, x: '70%' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: 'spring',
          stiffness: 460,
          damping: 10,
        }}
        src={emptyCart}
        alt=""
        className="max-w-[150px]"
      />
      <motion.h2
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 360,
          damping: 14,
        }}
        className="mt-5 self-center justify-self-center text-3xl font-bold text-text-grey"
      >
        No Products Found
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 360,
          damping: 14,
          delay: 0.1,
        }}
        className="text-center text-text-grey"
      >
        Your search did not match any products.
        <br />
        Please try again.
      </motion.p>
    </div>
  );
}

export default ProductNotFound;
