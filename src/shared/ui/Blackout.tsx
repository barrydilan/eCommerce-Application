import { useEffect } from 'react';

interface IBlackoutProps {
  isBlackout: boolean;
}

function Blackout({ isBlackout }: IBlackoutProps) {
  useEffect(() => {
    if (isBlackout) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isBlackout]);

  return (
    <div
      className={`${
        isBlackout ? 'visible opacity-10' : 'invisible opacity-0'
      } pointer-events-none absolute inset-0 z-30 m-auto h-full w-full bg-border-black backdrop-blur-3xl transition-all`}
    />
  );
}

export default Blackout;
