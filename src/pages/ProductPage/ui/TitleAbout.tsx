import spicyIcon from '../../../assets/icons/spicy.svg';
import veganIcon from '../../../assets/icons/vegan.svg';

interface ITitleAboutProps {
  name: string;
  calories: number | string;
  weight: number | string;
  isSpicy: boolean;
  isVegan: boolean;
}

function TitleAbout({ name, calories, weight, isSpicy, isVegan }: ITitleAboutProps) {
  return (
    <div className="z-10 ml-3 mr-12 hidden border-1 border-primary border-opacity-10 bg-primary bg-opacity-40 backdrop-brightness-[85%] backdrop-saturate-200 dark:border-border-black dark:border-opacity-10 dark:bg-border-black dark:bg-opacity-30 md:absolute md:left-[3%] md:top-[37%] md:block md:rounded-3xl md:py-7 md:pl-4 md:pr-10 md:backdrop-blur-[8px]">
      <h2 className="text-3xl font-bold text-text-dark md:text-xl md:text-primary lg:text-3xl">
        {name}
        {isSpicy || isVegan ? (
          <span className="ml-4 inline-block max-w-[30px] rounded-xl bg-accent-light p-1">
            <img src={isSpicy ? spicyIcon : veganIcon} alt={`${isSpicy ? 'spicyIcon' : 'veganIcon'}`} />
          </span>
        ) : null}
      </h2>
      <h3 className="mt-2 text-sm text-text-grey md:text-primary">{calories} kcal pre portion</h3>
      <h3 className="text-sm text-text-grey md:text-primary">{weight} g</h3>
    </div>
  );
}

export default TitleAbout;
