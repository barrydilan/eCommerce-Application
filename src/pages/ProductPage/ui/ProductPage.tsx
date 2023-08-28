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
      <div className="px-4 pt-7">
        <div className="">
          <h2 className="text-3xl font-bold text-text-dark">Vegan Meal</h2>
          <h3 className="mt-5 text-sm font-light text-text-grey">622 kcal</h3>
          <h3 className="text-sm font-light text-text-grey">340 g</h3>
        </div>
        <div className="flex justify-between pt-2">
          <div>*******</div>
          <div className="relative">
            <h2 className="pr-4 text-3xl font-bold text-text-dark">$ 24,25</h2>
            <span className="absolute -top-5 left-[4.7rem] text-sm font-light text-text-grey line-through">
              $ 44,50
            </span>
            <p className="mt-1 text-sm font-light text-accent">You save: 50%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
