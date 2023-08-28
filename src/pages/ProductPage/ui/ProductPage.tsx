export default function ProductPage() {
  return (
    <div>
      <div className="relative">
        <img src="src/assets/img/sushi.png" alt="" />
        <div className="absolute top-4 flex w-full justify-between px-3">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border-1 border-white/30  backdrop-blur-md"
            type="button"
          >
            <img src="src/assets/icons/arrowLeft.svg" alt="" />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border-1 border-white/30  backdrop-blur-md"
            type="button"
          >
            <img src="src/assets/icons/heart.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
