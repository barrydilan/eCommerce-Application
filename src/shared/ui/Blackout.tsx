import { useEffect } from 'react';

interface IBlackoutProps {
  isBlackout: boolean;
  unlock?: () => void;
  isScrollable?: boolean;
}

function Blackout({ isBlackout, unlock, isScrollable }: IBlackoutProps) {
  useEffect(() => {
    if (isScrollable) return;

    if (isBlackout) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isBlackout, isScrollable]);

  return (
    <button
      aria-label="blackout"
      type="button"
      onClick={unlock}
      className={`${isBlackout ? 'scale-1 visible opacity-30 dark:opacity-50' : 'invisible scale-0 opacity-0'} ${
        unlock ? '' : 'pointer-events-none'
      } fixed inset-0 z-30 m-auto h-[1750%] w-full cursor-auto bg-border-black backdrop-blur-3xl transition-opacity duration-300`}
    />
  );
}

Blackout.defaultProps = {
  unlock: null,
  isScrollable: false,
};

export default Blackout;
