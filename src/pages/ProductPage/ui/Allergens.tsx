import { capitalize } from '../../../shared/lib/helpers';

export default function Allergens(props: { allergens: string }) {
  const { allergens } = props;
  return (
    <div className="mt-6 pb-8">
      <h3 className="text-2xl font-medium text-accent">Allergens</h3>
      <p className="mt-5 grid gap-y-2 text-text-grey md:grid-cols-2 lg:gap-x-40">
        {allergens.split(',').map((allergen) => {
          return <span className="block" key={allergen}>{`${capitalize(allergen)}`}</span>;
        })}
      </p>
    </div>
  );
}
