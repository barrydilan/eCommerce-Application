import React from 'react';

import filterIcon from '../../../assets/icons/FiltersIcon.svg';

interface IFilterButton {
  onFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function FilterButton({ onFilterOpen }: IFilterButton) {
  return (
    <button
      type="button"
      onClick={() => {
        onFilterOpen((prev) => !prev);
      }}
      className="
            flex
            items-center
            rounded-lg
            border-[1.5px]
            border-text-grey
            px-[12px]
            py-[10px]
            transition-all
            hover:bg-accent-lightest
          "
    >
      <img src={filterIcon} alt="" className="mr-[12px]" />
      Filters
    </button>
  );
}

export default FilterButton;
