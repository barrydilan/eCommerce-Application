import { Cycle } from 'framer-motion';

import filterIcon from '../../../assets/icons/FiltersIcon.svg';

interface IFilterButton {
  onFilterOpen: Cycle;
  isFiltersOpen: boolean;
}

function FilterButton({ onFilterOpen, isFiltersOpen }: IFilterButton) {
  return (
    <button
      type="button"
      onClick={() => {
        onFilterOpen();
      }}
      className={`
        ${isFiltersOpen ? 'z-40' : 'z-20'}
        flex
        items-center
        rounded-lg
        border-[1.5px]
        border-text-grey
        bg-primary
        px-[12px]
        py-[10px]
        transition-all
        hover:bg-secondary
        dark:bg-dark-bg-primary
        dark:text-primary
        dark:hover:bg-text-grey
        `}
    >
      <img src={filterIcon} alt="" className="mr-[12px]" />
      Filters
    </button>
  );
}

export default FilterButton;
