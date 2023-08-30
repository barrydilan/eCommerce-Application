import { FiltersFields } from '../ProductPage';

export default function FilterModalCheckbox(props: {
  id: string;
  checked: boolean;
  setFiltersState: (value: React.SetStateAction<FiltersFields>) => void;
  text: string;
  peer: string;
}) {
  const { id, checked, setFiltersState, text, peer } = props;
  return (
    <div
      className="
                mt-2
                flex
                h-8
                items-center
                justify-center
              "
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => {
          setFiltersState((prev) => {
            return { ...prev, [id]: !checked };
          });
        }}
        className={`
                  peer/${id}
                  mr-2
                  h-5
                  w-5
                  appearance-none
                  rounded-md
                  bg-accent
                `}
      />
      <label
        htmlFor={id}
        className={`
                relative
                text-xs
                text-text-grey
                before:absolute
                before:-left-6
                before:top-0.5
                before:hidden
                before:h-2
                before:w-3
                before:-rotate-45
                before:rounded-sm
                before:border-b-4
                before:border-l-4
                before:border-b-primary
                before:border-l-primary
                ${peer}
              `}
      >
        {text}
      </label>
    </div>
  );
}
