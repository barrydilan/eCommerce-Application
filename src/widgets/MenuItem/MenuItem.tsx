import productImg from '../../assets/img/productImg.png';
import AddToCartBtn from '../../features/AddToCart/AddToCartBtn';
import Rating from '../../features/Rating/Rating';

export default function MenuItem() {
  return (
    <div className="flex w-full rounded-2xl border-1 border-border-black/10">
      <div className="flex flex-[80%] gap-x-2">
        <img
          className="mr-2 inline-block h-full max-h-[150px] max-w-[45%] flex-none xs:max-w-[35%]"
          src={productImg}
          alt={productImg}
        />
        <div className="my-2 flex flex-1 flex-col gap-y-1 sm:my-4">
          <h2 className="text-sm font-light text-text-dark xs:text-lg sm:text-xl">Vegan meal</h2>
          <h4 className="text-xs font-extralight text-text-grey sm:text-base">622 kcal</h4>
          <h4 className="text-xs font-extralight text-text-grey sm:text-base">340 g</h4>
          <div className="mt-2 text-sm">
            <Rating />
          </div>
        </div>
      </div>
      <div className="my-2 flex flex-[20%] flex-col items-end justify-between pr-2 sm:my-4 sm:pr-4">
        <h3 className="text-sm font-light text-text-dark xs:text-lg sm:text-xl">$ 24,50</h3>
        <AddToCartBtn />
      </div>
    </div>
  );
}
