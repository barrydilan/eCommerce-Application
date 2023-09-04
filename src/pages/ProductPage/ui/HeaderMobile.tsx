interface IHeaderMobileProps {
  name: string;
  calories: number | string;
  weight: number | string;
}

function HeaderMobile({ name, calories, weight }: IHeaderMobileProps) {
  return (
    <div className="md:hidden">
      <h2 className="text-3xl font-bold text-text-dark md:text-primary">{name}</h2>
      <h3 className="mt-5 text-sm font-light text-text-grey md:text-primary">{calories} kcal</h3>
      <h3 className="mt-1 text-sm font-light text-text-grey md:text-primary">{weight} g</h3>
    </div>
  );
}

export default HeaderMobile;
