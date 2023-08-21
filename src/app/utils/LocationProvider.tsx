import { ReactNode } from 'react';

import { AnimatePresence } from 'framer-motion';

export default function LocationProvider({ children }: { children: ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}
