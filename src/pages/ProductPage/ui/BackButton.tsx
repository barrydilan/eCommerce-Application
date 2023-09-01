import arrowLeft from '../../../assets/icons/arrowLeft.svg';

function BackButton() {
  return (
    <button
      className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border-primary/30 backdrop-blur-md sm:h-14 sm:w-14"
      type="button"
    >
      <img src={arrowLeft} alt="" />
    </button>
  );
}

export default BackButton;
