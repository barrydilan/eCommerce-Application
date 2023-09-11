import React from 'react';

import FilterModalCheckbox from './FilterModalCheckbox';
import FilterModalNumberInput from './FilterModalNumberInput';
import { FiltersFields, filtersInitialState } from './filtersInitialState.ts';

const shownClasses = 'pointer-events-auto translate-x-0 opacity-1 lg:translate-y-16';
const hiddenClasses = 'pointer-events-none -translate-x-52 opacity-0 lg:translate-x-0 lg:-translate-y-52';

export default function FilterModal(props: {
  isFiltersOpen: boolean;
  filtersState: FiltersFields;
  onFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFiltersState: React.Dispatch<React.SetStateAction<FiltersFields>>;
  onApplyFilters: () => void;
}) {
  const { isFiltersOpen, onFilterOpen, filtersState, setFiltersState, onApplyFilters } = props;

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
        w-72
        flex-col
        items-start
        rounded-[32px] 
        border-2
        border-separation-line 
        bg-primary 
        p-5
        transition-all
        ease-in
        dark:border-dark-separation-line
        dark:bg-dark-bg-primary
        md:w-[475px]
        ${isFiltersOpen ? shownClasses : hiddenClasses}
      `}
    >
      <h4 className="w-full text-center text-base font-normal dark:text-primary">Filters</h4>
      <button
        type="button"
        onClick={() => onFilterOpen(false)}
        className="absolute right-4 top-4 cursor-pointer text-2xl font-semibold text-text-grey transition-all ease-in hover:text-text-dark "
      >
        ×
      </button>
      <div className="flex w-full flex-col md:mt-6 md:flex-row md:justify-between md:gap-6">
        <div className="mt-6 w-full border-b-2 border-t-2 border-separation-line pb-6 dark:border-dark-separation-line md:mt-0 md:w-[55.5%] md:border-b-0 md:border-r-2 md:border-t-0 md:pb-0 md:pr-6">
          <h5 className="my-6 text-text-grey md:mt-0">Show only:</h5>
          <FilterModalCheckbox
            id="isVegan"
            checked={filtersState.isVegan}
            universalFilterChanger={universalFilterChanger}
            text="Vegan"
            itemsNum={8}
            peer="peer-checked/isVegan:before:block"
          />
          <FilterModalCheckbox
            id="isSpicy"
            checked={filtersState.isSpicy}
            universalFilterChanger={universalFilterChanger}
            text="Spicy"
            itemsNum={5}
            peer="peer-checked/isSpicy:before:block"
          />
          <FilterModalCheckbox
            id="isPromo"
            checked={filtersState.isPromo}
            universalFilterChanger={universalFilterChanger}
            text="Promo"
            itemsNum={7}
            peer="peer-checked/isPromo:before:block"
          />
        </div>
        <div className="md:w-[50%]">
          <h5 className="my-6 text-text-grey md:mt-0">Set max:</h5>
          <FilterModalNumberInput
            id="price"
            value={filtersState.price}
            universalFilterChanger={universalFilterChanger}
            text="Price"
          />
          <FilterModalNumberInput
            id="calories"
            value={filtersState.calories}
            universalFilterChanger={universalFilterChanger}
            text="Calories"
          />
          <FilterModalNumberInput
            id="weight"
            value={filtersState.weight}
            universalFilterChanger={universalFilterChanger}
            text="Weight"
          />
        </div>
      </div>
      <div className="my-6 flex w-full justify-between gap-5 font-medium md:mt-10">
        <button
          onClick={() => {
            setFiltersState(filtersInitialState);
          }}
          type="button"
          className="w-1/2 rounded-lg border-1 bg-primary px-1.5 py-2 text-text-grey  transition-all
          hover:bg-separation-line dark:bg-dark-bg-primary dark:text-primary dark:hover:bg-text-grey"
        >
          Reset
        </button>
        <button
          onClick={onApplyFilters}
          type="button"
          className="w-1/2 rounded-lg bg-accent-lightest px-1.5 py-2 text-accent transition-all
          hover:bg-separation-line dark:border-1 dark:border-accent dark:bg-dark-bg-primary dark:hover:bg-text-grey dark:hover:text-primary"
        >
          Apply
        </button>
      </div>
    </div>
  );
}