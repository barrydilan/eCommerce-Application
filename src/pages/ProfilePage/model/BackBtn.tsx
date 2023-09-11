import { useNavigate } from 'react-router-dom';

import arrowBlack from '../../../assets/icons/arrowLeftBlack.svg';

export default function BackBtn() {
  const navigation = useNavigate();

  return (
    <div className="flex justify-start text-3xl font-medium leading-10 dark:text-primary">
      <button
        onClick={() => navigation(-1)}
        className="mr-5 flex h-10 w-12 items-center justify-center rounded-2xl bg-separation-line dark:bg-text-grey"
        type="button"
      >
        <img src={arrowBlack} alt="" />
      </button>
      Account
    </div>
  );
}
