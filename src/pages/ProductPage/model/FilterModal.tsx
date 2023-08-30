import FilterModalCheckbox from './FilterModalCheckbox';
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
      <div className="mt-2 flex w-full justify-between text-text-grey">
        <label className="font-light" htmlFor="priceFilter">
          Max price:
        </label>
        <input
          className="lg w-16 rounded border-2 border-separation-line pl-1 text-text-dark"
          id="priceFilter"
          type="number"
          value={filtersState.price}
          onChange={(e) => {
            setFiltersState((prev) => {
              return { ...prev, price: e.target.value };
            });
          }}
        />
      </div>
      <div className="mt-2 flex w-full justify-between text-text-grey">
        <label className="font-light" htmlFor="calorFilter">
          Max calories:
        </label>
        <input
          className="lg w-16 rounded border-2 border-separation-line pl-1 text-text-dark"
          id="calorFilter"
          type="number"
          value={filtersState.calories}
          onChange={(e) => {
            setFiltersState((prev) => {
              return { ...prev, calories: e.target.value };
            });
          }}
        />
      </div>
      <div className="mt-2 flex w-full justify-between text-text-grey">
        <label className="font-light" htmlFor="weightFilter">
          Max weight:
        </label>
        <input
          className="lg w-16 rounded border-2 border-separation-line pl-1 text-text-dark"
          id="weightFilter"
          type="number"
          value={filtersState.weight}
          onChange={(e) => {
            setFiltersState((prev) => {
              return { ...prev, weight: e.target.value };
            });
          }}
        />
      </div>
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
