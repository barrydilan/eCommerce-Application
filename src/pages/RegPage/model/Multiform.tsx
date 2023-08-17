import { ReactElement, useState } from 'react';

export default function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function reStart() {
    setCurrentStepIndex(0);
  }

  const { length } = steps;

  return {
    reStart,
    currentStepIndex,
    currForm: steps[currentStepIndex],
    length,
    next,
    back,
  };
}
