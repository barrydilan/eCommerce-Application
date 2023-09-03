import React from 'react';

import FilterModalCheckbox from './FilterModalCheckbox';
import FilterModalNumberInput from './FilterModalNumberInput';
import { FiltersFields, filtersInitialState } from './filtersInitialState.ts';

const shownClasses = 'pointer-events-auto translate-x-0 opacity-1 lg:translate-y-16';
const hiddenClasses = 'pointer-events-none -translate-x-52 opacity-0 lg:translate-x-0 lg:-translate-y-52';

export default function FilterModal(props: {
  isFiltersOpen: boolean;
  filtersState: FiltersFields;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFiltersState: React.Dispatch<React.SetStateAction<FiltersFields>>;
  onApplyFilters: () => void;
}) {
  const { isFiltersOpen, setIsFiltersOpen, filtersState, setFiltersState, onApplyFilters } = props;

  const universalFilterChanger = (value: string | boolean, field: string) => {
    setFiltersState((prev) => {
      return { ...prev, [field]: value };
    });
  };

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
        id="isVegan"
        checked={filtersState.isVegan}
        universalFilterChanger={universalFilterChanger}
        text="Show only vegan"
        peer="peer-checked/isVegan:before:block"
      />
      <FilterModalCheckbox
        id="isSpicy"
        checked={filtersState.isSpicy}
        universalFilterChanger={universalFilterChanger}
        text="Show only spicy"
        peer="peer-checked/isSpicy:before:block"
      />
      <FilterModalCheckbox
        id="isPromo"
        checked={filtersState.isPromo}
        universalFilterChanger={universalFilterChanger}
        text="Show only promo"
        peer="peer-checked/isPromo:before:block"
      />
      <FilterModalNumberInput
        id="price"
        value={filtersState.price}
        universalFilterChanger={universalFilterChanger}
        text="Max price"
      />
      <FilterModalNumberInput
        id="calories"
        value={filtersState.calories}
        universalFilterChanger={universalFilterChanger}
        text="Max calories"
      />
      <FilterModalNumberInput
        id="weight"
        value={filtersState.weight}
        universalFilterChanger={universalFilterChanger}
        text="Max weight"
      />
      <div className="my-3 flex w-full justify-around">
        <button
          onClick={() => {
            setFiltersState(filtersInitialState);
          }}
          type="button"
          className="xl rounded bg-accent px-1.5 py-1 font-light text-primary"
        >
          Reset
        </button>
        <button
          onClick={onApplyFilters}
          type="button"
          className="xl rounded bg-accent px-1.5 py-1 font-light text-primary"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
