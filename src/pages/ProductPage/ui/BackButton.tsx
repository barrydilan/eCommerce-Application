import { useNavigate } from 'react-router-dom';

import arrowLeft from '../../../assets/icons/arrowLeft.svg';

function BackButton() {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <button
      onClick={handleBack}
      className="absolute left-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border-1 border-primary border-primary/30 border-opacity-30 bg-primary bg-opacity-40 backdrop-blur-[8px] backdrop-brightness-[85%] backdrop-saturate-[4.5] dark:border-border-black dark:border-opacity-10 dark:bg-border-black dark:bg-opacity-30 sm:h-14 sm:w-14"
      type="button"
    >
      <img src={arrowLeft} alt="" />
    </button>
  );
}

export default BackButton;
