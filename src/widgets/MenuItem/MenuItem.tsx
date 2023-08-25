import productImg from '../../assets/img/productImg.png';
import AddToCartBtn from '../../features/AddToCart/AddToCartBtn';
import Rating from '../../features/Rating/Rating';

export default function MenuItem() {
  return (
    <div className="flex w-full rounded-2xl border-1 border-border-black/10">
      <div className="flex flex-[70%] gap-x-2">
        <div className="flex-[50%]">
          <img className="mr-2 inline-block" src={productImg} alt={productImg} />
        </div>
        <div className="my-4 flex flex-[50%] flex-col gap-y-1">
          <h2 className="text-sm font-light text-text-dark">Vegan meal</h2>
          <h4 className="text-xs font-extralight text-text-grey">622 kcal</h4>
          <h4 className="text-xs font-extralight text-text-grey">340 g</h4>
          <div className="hidden">
            <Rating />
          </div>
        </div>
      </div>
      <div className="my-4 flex flex-[30%] flex-col items-end justify-between pr-2">
        <h3 className="text-base font-light text-text-dark">$ 24,50</h3>
        <AddToCartBtn />
      </div>
    </div>
  );
}
