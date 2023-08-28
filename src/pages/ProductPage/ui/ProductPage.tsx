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
      <div className="flex flex-col px-4 pt-7">
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
        <div>
          <div className="flex gap-x-4">
            <button
              className="flex h-6 w-6 items-center justify-center rounded-full border-1 border-text-dark p-2"
              type="button"
            >
              -
            </button>
            <span>01</span>
            <button
              className="flex h-6 w-6 items-center justify-center rounded-full border-1 border-text-dark p-2"
              type="button"
            >
              +
            </button>
          </div>
          <button type="button" className="mt-3 block w-full rounded-md bg-accent-lightest py-3  text-accent">
            <span className="mx-auto flex w-fit gap-x-2 font-light">
              <img src="src/assets/icons/shopping-cart-accent.svg" alt="" />
              <span className="inline-block">Add to Cart</span>
            </span>
          </button>
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-normal text-accent">Description</h3>
          <p className="mt-3 text-[13px] font-light text-text-grey">
            With good planning and an understanding of what makes up a healthy, balanced vegan diet, you can get all the
            nutrients your body needs.
          </p>
        </div>
        <div className="mt-5">
          <h3 className="text-2xl font-normal text-accent">Ingridients</h3>
          <ul className="mt-3">
            <li className="flex items-center gap-x-2 text-[13px] font-light text-text-grey">
              <img src="src/assets/icons/check-icon.svg" alt="" /> 4 oz cream cheese room temperature
            </li>
            <li className="flex items-center gap-x-2 text-[13px] font-light text-text-grey">
              <img src="src/assets/icons/check-icon.svg" alt="" /> 4 oz cream cheese room temperature
            </li>
            <li className="flex items-center gap-x-2 text-[13px] font-light text-text-grey">
              <img src="src/assets/icons/check-icon.svg" alt="" /> 4 oz cream cheese room temperature
            </li>
            <li className="flex items-center gap-x-2 text-[13px] font-light text-text-grey">
              <img src="src/assets/icons/check-icon.svg" alt="" /> 4 oz cream cheese room temperature
            </li>
            <li className="flex items-center gap-x-2 text-[13px] font-light text-text-grey">
              <img src="src/assets/icons/check-icon.svg" alt="" /> 4 oz cream cheese room temperature
            </li>
            <li className="flex items-center gap-x-2 text-[13px] font-light text-text-grey">
              <img src="src/assets/icons/check-icon.svg" alt="" /> 4 oz cream cheese room temperature
            </li>
            <li className="flex items-center gap-x-2 text-[13px] font-light text-text-grey">
              <img src="src/assets/icons/check-icon.svg" alt="" /> 4 oz cream cheese room temperature
            </li>
            <li className="flex items-center gap-x-2 text-[13px] font-light text-text-grey">
              <img src="src/assets/icons/check-icon.svg" alt="" /> 4 oz cream cheese room temperature
            </li>
            <li className="flex items-center gap-x-2 text-[13px] font-light text-text-grey">
              <img src="src/assets/icons/check-icon.svg" alt="" /> 4 oz cream cheese room temperature
            </li>
            <li className="flex items-center gap-x-2 text-[13px] font-light text-text-grey">
              <img src="src/assets/icons/check-icon.svg" alt="" /> 4 oz cream cheese room temperature
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
