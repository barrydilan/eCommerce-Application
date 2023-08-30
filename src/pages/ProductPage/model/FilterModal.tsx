import FilterModalCheckbox from './FilterModalCheckbox';
import FilterModalNumberInput from './FilterModalNumberInput';
import { FiltersFields } from '../ProductPage';

export default function FilterModal(props: {
  isFiltersOpen: boolean;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filtersState: FiltersFields;
  setFiltersState: React.Dispatch<React.SetStateAction<FiltersFields>>;
}) {
  const { isFiltersOpen, setIsFiltersOpen, filtersState, setFiltersState } = props;
  const shownClasses = 'pointer-events-auto translate-x-0 opacity-1';
  const hiddenClasses = 'pointer-events-none -translate-x-52 opacity-0';
  return (
    <div
      className={`
        absolute 
        top-[4.6rem]
        z-10 flex 
        w-52 
        flex-col
        items-start 
        rounded-lg 
        border-2 
        border-separation-line 
        bg-primary 
        p-2
        transition-all
        ease-in
        ${isFiltersOpen ? shownClasses : hiddenClasses}
      `}
    >
      <h4 className="w-full text-center">Filters</h4>
      <button
        type="button"
        onClick={() => setIsFiltersOpen(false)}
        className="absolute right-2 top-1 cursor-pointer text-xl font-semibold transition-all ease-in hover:text-text-grey"
      >
        ×
      </button>
      <FilterModalCheckbox
        id="vegan"
        checked={filtersState.vegan}
        setFiltersState={setFiltersState}
        text="Show only vegan"
        peer="peer-checked/vegan:before:block"
      />
      <FilterModalCheckbox
        id="spicy"
        checked={filtersState.spicy}
        setFiltersState={setFiltersState}
        text="Show only spicy"
        peer="peer-checked/spicy:before:block"
      />
      <FilterModalCheckbox
        id="promo"
        checked={filtersState.promo}
        setFiltersState={setFiltersState}
        text="Show only promo"
        peer="peer-checked/promo:before:block"
      />
      <FilterModalNumberInput
        id="price"
        value={filtersState.price}
        setFiltersState={setFiltersState}
        text="Max price"
      />
      <FilterModalNumberInput
        id="calories"
        value={filtersState.calories}
        setFiltersState={setFiltersState}
        text="Max calories"
      />
      <FilterModalNumberInput
        id="weight"
        value={filtersState.weight}
        setFiltersState={setFiltersState}
        text="Max weight"
      />
      <div className="my-3 flex w-full justify-around">
        <button
          onClick={() => {
            setFiltersState({
              vegan: false,
              spicy: false,
              promo: false,
              price: '',
              calories: '',
              weight: '',
            });
          }}
          type="button"
          className="xl rounded bg-accent px-1.5 py-1 font-light text-primary"
        >
          Reset
        </button>
        <button
          onClick={() => setIsFiltersOpen(false)}
          type="button"
          className="xl rounded bg-accent px-1.5 py-1 font-light text-primary"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
