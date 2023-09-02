interface IIngredientListProps {
  children: React.ReactElement;
}

function IngredientList({ children }: IIngredientListProps) {
  return (
    <div className="mt-5 pb-8 sm:mt-8">
      <h3 className="text-2xl font-normal text-accent">Ingredients</h3>
      <ul className="mt-3 leading-loose sm:grid sm:grid-cols-2 sm:flex-wrap sm:gap-x-20 lg:gap-x-40">{children}</ul>
    </div>
  );
}

export default IngredientList;
