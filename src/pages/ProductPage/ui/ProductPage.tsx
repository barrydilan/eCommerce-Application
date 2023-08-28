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
      <div>
        <div className="px-4 pt-7">
          <h2 className="text-3xl font-bold text-text-dark">Vegan Meal</h2>
          <h3 className="mt-5 text-sm font-light text-text-grey">622 kcal</h3>
          <h3 className="text-sm font-light text-text-grey">340 g</h3>
        </div>
      </div>
    </div>
  );
}
