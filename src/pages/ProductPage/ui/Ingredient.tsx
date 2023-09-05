import checkIcon from '../../../assets/icons/check-icon.svg';

interface IIngredientProps {
  value: string;
}

function Ingredient({ value }: IIngredientProps) {
  return (
    <li className="flex items-center text-text-grey md:items-start">
      <span className="flex items-center gap-x-2 md:gap-x-3">
        <img src={checkIcon} alt="" /> {value}
      </span>
    </li>
  );
}

export default Ingredient;
