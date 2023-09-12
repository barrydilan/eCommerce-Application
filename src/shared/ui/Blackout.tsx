import { useEffect } from 'react';

interface IBlackoutProps {
  isBlackout: boolean;
  unlock?: () => void;
}

function Blackout({ isBlackout, unlock }: IBlackoutProps) {
  useEffect(() => {
    if (isBlackout) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isBlackout]);

  return (
    <button
      aria-label="blackout"
      type="button"
      onClick={unlock}
      className={`${isBlackout ? 'scale-1 visible opacity-10' : 'invisible scale-0 opacity-0'} ${
        unlock ? '' : 'pointer-events-none'
      } absolute inset-0 z-30 m-auto h-[430%] w-full cursor-auto bg-border-black backdrop-blur-3xl transition-opacity`}
    />
  );
}

Blackout.defaultProps = {
  unlock: null,
};

export default Blackout;
