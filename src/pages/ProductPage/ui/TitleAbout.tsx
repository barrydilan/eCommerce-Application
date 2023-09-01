interface ITitleAboutProps {
  name: string;
  calories: number;
  weight: number;
}

function TitleAbout({ name, calories, weight }: ITitleAboutProps) {
  return (
    <div className="hidden border-1 border-primary border-opacity-30 bg-primary bg-opacity-40 md:absolute md:left-[3%] md:top-[48%] md:block md:rounded-3xl md:py-7 md:pl-4 md:pr-10 md:backdrop-blur-[8px]">
      <h2 className="text-3xl font-bold text-text-dark md:text-primary">{name}</h2>
      <h3 className="mt-2 text-sm font-light text-text-grey md:text-primary">{calories} kcal pre portion</h3>
      <h3 className="text-sm font-light text-text-grey md:text-primary">{weight} g</h3>
    </div>
  );
}

export default TitleAbout;
