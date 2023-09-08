import { motion } from 'framer-motion';

export default function LoadingAnimation() {
  const firstSushi = {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 0.4 },
  };
  return (
    <motion.div
      initial={{ rotate: -360 }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 2,
        delay: 0.2,
        repeat: Infinity,
        repeatDelay: 0.2,
        type: 'tween',
        ease: 'easeOut',
      }}
    >
      <svg
        className="h-8 w-8 sm:h-12 sm:w-12"
        viewBox="-409.6 -409.6 1843.20 1843.20"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
        transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
        stroke="#000000"
        strokeWidth="10"
      >
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.1 }}>
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M608.00416 0h-224a128 128 0 0 0-128 128v128a128 128 0 0 0 128 128h224a128 128 0 0 0 128-128V128a128 128 0 0 0-128-128z m96 240a112 112 0 0 1-112 112h-192A112 112 0 0 1 288.00416 240v-96A112 112 0 0 1 400.00416 32h192A112 112 0 0 1 704.00416 144v96z"
            fill="#434854"
          />
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M704.00416 240a112 112 0 0 1-112 112h-192A112 112 0 0 1 288.00416 240v-96A112 112 0 0 1 400.00416 32h192A112 112 0 0 1 704.00416 144v96z"
            fill="#EAEAEA"
          />
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M729.12416 295.488c-0.704 2.24-1.216 4.576-2.048 6.752-2.592 6.592-5.824 12.8-9.408 18.848-0.16 0.288-0.288 0.576-0.48 0.832A127.424 127.424 0 0 1 608.00416 384h-224a127.488 127.488 0 0 1-109.184-62.048l-0.448-0.8a130.304 130.304 0 0 1-9.44-18.912c-0.832-2.176-1.344-4.512-2.08-6.752-1.632-5.024-3.392-9.952-4.416-15.2A123.552 123.552 0 0 1 256.00416 256v224a128 128 0 0 0 128 128h224a128 128 0 0 0 128-128V256c0 8.352-0.864 16.448-2.432 24.32-1.024 5.248-2.784 10.176-4.448 15.168z"
            fill="#434854"
          />
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M729.12416 295.488c-0.704 2.24-1.216 4.576-2.048 6.752-2.592 6.592-5.824 12.8-9.408 18.848-0.16 0.288-0.288 0.576-0.48 0.832A127.424 127.424 0 0 1 608.00416 384h-224a127.488 127.488 0 0 1-109.184-62.048l-0.448-0.8a130.304 130.304 0 0 1-9.44-18.912c-0.832-2.176-1.344-4.512-2.08-6.752-1.632-5.024-3.392-9.952-4.416-15.2A123.552 123.552 0 0 1 256.00416 256v224a128 128 0 0 0 128 128h224a128 128 0 0 0 128-128V256c0 8.352-0.864 16.448-2.432 24.32-1.024 5.248-2.784 10.176-4.448 15.168z"
            fill=""
          />
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M672.00416 590.24v-223.648c-9.888 5.824-20.64 10.24-32 13.216V603.456a125.024 125.024 0 0 0 32-13.216z"
            fill="#FFFFFF"
          />
          <motion.path
            initial={{ pathLength: 0, fill: '#FFFF' }}
            animate={{ pathLength: 1, fill: '#EF4D4D' }}
            stroke="#000000"
            transition={{ duration: 0.4, delay: 0.2 }}
            d="M352.00416 192a144 96 0 1 0 288 0 144 96 0 1 0-288 0Z"
            fill="#EF4D4D"
          />
        </motion.g>
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1, delay: 0.1 }}
        >
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M352.00416 416H128.00416a128 128 0 0 0-128 128v128a128 128 0 0 0 128 128h224a128 128 0 0 0 128-128v-128a128 128 0 0 0-128-128z m96 240a112 112 0 0 1-112 112h-192A112 112 0 0 1 32.00416 656v-96A112 112 0 0 1 144.00416 448h192a112 112 0 0 1 112 112v96z"
            fill="#434854"
          />
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M448.00416 656a112 112 0 0 1-112 112h-192A112 112 0 0 1 32.00416 656v-96A112 112 0 0 1 144.00416 448h192a112 112 0 0 1 112 112v96z"
            fill="#EAEAEA"
          />
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M473.12416 711.488c-0.704 2.24-1.216 4.576-2.048 6.752-2.592 6.592-5.824 12.8-9.408 18.848-0.16 0.288-0.288 0.576-0.48 0.832A127.424 127.424 0 0 1 352.00416 800H128.00416a127.488 127.488 0 0 1-109.184-62.048l-0.448-0.8a128.32 128.32 0 0 1-9.44-18.88c-0.832-2.176-1.344-4.544-2.08-6.752-1.632-5.024-3.36-9.984-4.416-15.232A123.552 123.552 0 0 1 0.00416 672v224a128 128 0 0 0 128 128h224a128 128 0 0 0 128-128v-224c0 8.352-0.864 16.448-2.432 24.32-1.024 5.248-2.784 10.176-4.448 15.168z"
            fill="#434854"
          />
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M473.12416 711.488c-0.704 2.24-1.216 4.576-2.048 6.752-2.592 6.592-5.824 12.8-9.408 18.848-0.16 0.288-0.288 0.576-0.48 0.832A127.424 127.424 0 0 1 352.00416 800H128.00416a127.488 127.488 0 0 1-109.184-62.048l-0.448-0.8a128.32 128.32 0 0 1-9.44-18.88c-0.832-2.176-1.344-4.544-2.08-6.752-1.632-5.024-3.36-9.984-4.416-15.232A123.552 123.552 0 0 1 0.00416 672v224a128 128 0 0 0 128 128h224a128 128 0 0 0 128-128v-224c0 8.352-0.864 16.448-2.432 24.32-1.024 5.248-2.784 10.176-4.448 15.168z"
            fill=""
          />
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M416.00416 1006.24v-223.648c-9.888 5.824-20.64 10.24-32 13.216V1019.456a125.024 125.024 0 0 0 32-13.216z"
            fill="#FFFFFF"
          />
          <motion.path
            initial={{ pathLength: 0, fill: '#FFFF' }}
            animate={{ pathLength: 1, fill: '#EF4D4D' }}
            stroke="#000000"
            transition={{ duration: 0.4, delay: 0.4 }}
            d="M96.00416 608a144 96 0 1 0 288 0 144 96 0 1 0-288 0Z"
            fill="#EF4D4D"
          />
        </motion.g>
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1, delay: 0.3 }}
        >
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M896.00416 416h-224a128 128 0 0 0-128 128v128a128 128 0 0 0 128 128h224a128 128 0 0 0 128-128v-128a128 128 0 0 0-128-128z m96 240a112 112 0 0 1-112 112h-192a112 112 0 0 1-112-112v-96a112 112 0 0 1 112-112h192a112 112 0 0 1 112 112v96z"
            fill="#434854"
          />
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M992.00416 656a112 112 0 0 1-112 112h-192a112 112 0 0 1-112-112v-96a112 112 0 0 1 112-112h192a112 112 0 0 1 112 112v96z"
            fill="#EAEAEA"
          />
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M1017.12416 711.488c-0.704 2.24-1.216 4.576-2.048 6.752-2.592 6.592-5.824 12.8-9.408 18.848-0.16 0.288-0.288 0.576-0.48 0.832A127.424 127.424 0 0 1 896.00416 800h-224a127.488 127.488 0 0 1-109.184-62.048l-0.448-0.8a128.32 128.32 0 0 1-9.44-18.88c-0.832-2.176-1.344-4.544-2.08-6.752-1.632-5.024-3.36-9.984-4.416-15.232A123.552 123.552 0 0 1 544.00416 672v224a128 128 0 0 0 128 128h224a128 128 0 0 0 128-128v-224c0 8.352-0.864 16.448-2.432 24.32-1.024 5.248-2.784 10.176-4.448 15.168z"
            fill="#434854"
          />
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M1017.12416 711.488c-0.704 2.24-1.216 4.576-2.048 6.752-2.592 6.592-5.824 12.8-9.408 18.848-0.16 0.288-0.288 0.576-0.48 0.832A127.424 127.424 0 0 1 896.00416 800h-224a127.488 127.488 0 0 1-109.184-62.048l-0.448-0.8a128.32 128.32 0 0 1-9.44-18.88c-0.832-2.176-1.344-4.544-2.08-6.752-1.632-5.024-3.36-9.984-4.416-15.232A123.552 123.552 0 0 1 544.00416 672v224a128 128 0 0 0 128 128h224a128 128 0 0 0 128-128v-224c0 8.352-0.864 16.448-2.432 24.32-1.024 5.248-2.784 10.176-4.448 15.168z"
            fill=""
          />
          <motion.path
            initial={firstSushi.initial}
            animate={firstSushi.animate}
            stroke="#000000"
            transition={firstSushi.transition}
            d="M960.00416 1006.24v-223.648c-9.888 5.824-20.64 10.24-32 13.216V1019.456a125.024 125.024 0 0 0 32-13.216z"
            fill="#FFFFFF"
          />
          <motion.path
            initial={{ pathLength: 0, fill: '#FFFF' }}
            animate={{ pathLength: 1, fill: '#EF4D4D' }}
            stroke="#000000"
            transition={{ duration: 0.4, delay: 0.6 }}
            d="M640.00416 608a144 96 0 1 0 288 0 144 96 0 1 0-288 0Z"
            fill="#EF4D4D"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}
