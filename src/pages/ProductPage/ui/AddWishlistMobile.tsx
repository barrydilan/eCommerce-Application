import heart from '../../../assets/icons/heart.svg';

function AddWishlistMobile() {
  return (
    <button
      className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border-1 border-primary border-primary/30 border-opacity-30 bg-primary bg-opacity-40 backdrop-blur-[8px] backdrop-brightness-[85%] backdrop-saturate-[4.5] sm:h-14 sm:w-14 md:hidden"
      type="button"
    >
      <img className="md:hidden" src={heart} alt="" />
    </button>
  );
}

export default AddWishlistMobile;
