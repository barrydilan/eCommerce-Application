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

  if (!isBlackout) return null;

  return (
    <button
      aria-label="blackout"
      type="button"
      onClick={unlock}
      className={`${isBlackout ? 'visible bg-border-black/50 dark:bg-border-black/60' : 'invisible'} ${
        unlock ? '' : 'pointer-events-none'
      } fixed inset-0 z-30 m-auto h-[1750%] w-full cursor-auto backdrop-blur-sm transition-opacity duration-300`}
    />
  );
}

Blackout.defaultProps = {
  unlock: null,
  isScrollable: false,
};

export default Blackout;
