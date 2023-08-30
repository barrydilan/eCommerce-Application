import { FiltersFields } from '../ProductPage';

export default function FilterModalNumberInput(props: {
  id: string;
  value: string;
  setFiltersState: React.Dispatch<React.SetStateAction<FiltersFields>>;
  text: string;
}) {
  const { id, value, setFiltersState, text } = props;
  return (
    <div className="mt-2 flex w-full justify-between text-text-grey">
      <label className="font-light" htmlFor={id}>
        {text}
      </label>
      <input
        className="lg w-16 rounded border-2 border-separation-line pl-1 text-text-dark"
        id={id}
        type="number"
        value={value}
        onChange={(e) => {
          setFiltersState((prev) => {
            return { ...prev, [id]: e.target.value };
          });
        }}
      />
    </div>
  );
}
