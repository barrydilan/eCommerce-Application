import spicyIcon from '../../../assets/icons/spicy.svg';
import veganIcon from '../../../assets/icons/vegan.svg';

interface IHeaderMobileProps {
  name: string;
  calories: number | string;
  weight: number | string;
  isSpicy: boolean;
  isVegan: boolean;
}

function HeaderMobile({ name, calories, weight, isSpicy, isVegan }: IHeaderMobileProps) {
  return (
    <div className="md:hidden">
      <h2 className="text-3xl font-bold text-text-dark dark:text-primary md:text-primary">
        {name}
        {isSpicy || isVegan ? (
          <span className="ml-4 inline-block max-w-[30px] rounded-xl bg-accent-light p-1">
            <img src={isSpicy ? spicyIcon : veganIcon} alt={`${isSpicy ? 'spicyIcon' : 'veganIcon'}`} />
          </span>
        ) : null}
      </h2>
      <h3 className="mt-5 text-base text-text-grey md:text-primary">{calories} kcal</h3>
      <h3 className="mt-1 text-base text-text-grey md:text-primary">{weight} g</h3>
    </div>
  );
}

export default HeaderMobile;
