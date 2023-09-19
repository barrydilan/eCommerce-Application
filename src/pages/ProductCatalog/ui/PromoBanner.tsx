import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

export default function PromoBanner() {
  const [showMessage, setShowMessage] = useState(false);

  const PROMOCODE = 'myLovelyPromoCode';

  const handleButtonClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  return (
    <div className="mx-auto mt-4 flex w-full">
      <div className="relative self-center overflow-hidden rounded-lg bg-gradient-to-br from-shop-cart-red to-rating-star py-4 text-center text-white shadow-md">
        <h3 className="mb-4 px-12 text-2xl font-semibold">15% flat off on all items only today!</h3>
        <div className="mx-auto flex justify-center space-x-2 first-line:mb-6 xs:w-[60%]">
          <motion.span
            id="cpnCode"
            className="relative flex items-center justify-center rounded-l border border-dashed px-2 py-2 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {showMessage ? (
              <AnimatePresence>
                <motion.div
                  className="opacity-90"
                  transition={{ duration: 0.5 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Text Copied!
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                className="opacity-90"
                transition={{ duration: 0.5 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {PROMOCODE}
              </motion.div>
            )}
          </motion.span>
          <button
            type="button"
            id="cpnBtn"
            className="focus:scale-80 flex transform cursor-pointer items-center justify-center rounded-sm border border-white bg-white px-2 py-2 text-sm text-shop-cart-red shadow-lg outline-none transition-transform active:scale-75"
            onClick={() => {
              handleButtonClick();
              navigator.clipboard.writeText(PROMOCODE);
            }}
          >
            Copy Code
          </button>
        </div>
        <div className="absolute left-0 top-1/2 z-0 -ml-6 h-12 w-12 -translate-y-1/2 transform rounded-full bg-white" />
        <div className="absolute right-0 top-1/2 z-0 -mr-6 h-12 w-12 -translate-y-1/2 transform rounded-full bg-white" />
      </div>
    </div>
  );
}
