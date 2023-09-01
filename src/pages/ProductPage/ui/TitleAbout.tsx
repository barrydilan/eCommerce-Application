interface ITitleAboutProps {
  name: string;
  calories: number;
  weight: number;
}

function TitleAbout({ name, calories, weight }: ITitleAboutProps) {
  return (
    <div className="hidden md:absolute md:left-[3%] md:top-[45%] md:block md:rounded-2xl md:p-6 md:backdrop-blur-2xl">
      <h2 className="text-3xl font-bold text-text-dark md:text-primary">{name}</h2>
      <h3 className="mt-5 text-sm font-light text-text-grey md:text-primary">{calories} kcal</h3>
      <h3 className="text-sm font-light text-text-grey md:text-primary">{weight} g</h3>
    </div>
  );
}

export default TitleAbout;
