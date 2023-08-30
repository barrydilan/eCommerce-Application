/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';

import FilterModal from './model/FilterModal';
import filterIcon from '../../assets/icons/FiltersIcon.svg';

export type FiltersFields = {
  vegan: boolean;
  spicy: boolean;
  promo: boolean;
  price: string;
  calories: string;
  weight: string;
};

export default function ProductPage() {
  const [activeCat, setActiveCat] = useState('all');
  const [filtersState, setFiltersState] = useState({
    vegan: false,
    spicy: false,
    promo: false,
    price: '',
    calories: '',
    weight: '',
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('rateDesc');

  function changeActiveCat(e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    const { target } = e;
    if (target && (target as HTMLElement).hasAttribute('data-user-select')) {
      const attr = (target as HTMLElement).getAttribute('data-user-select');
      if (attr === activeCat) return;
      if (attr) setActiveCat(attr);
    }
  }

  const greenBorder = 'border-b-2 border-accent';

  const categories = ['all', 'sushi', 'sets', 'main dishes', 'drinks', 'salads', 'soups'];
  const categoriesListItems = categories.map((item) => {
    const text = item[0].toUpperCase() + item.slice(1);
    return (
      <li className={`whitespace-nowrap px-1 ${activeCat === item ? greenBorder : ''}`} key={item}>
        <button data-user-select={item} type="button">
          {text}
        </button>
      </li>
    );
  });

  return (
    <div
      className="
        grid
        grid-cols-1
        grid-rows-prodPageMob
        px-[10px]
        md:px-12
        md:py-12
        lg:grid-cols-prodPageDesk
        lg:grid-rows-prodPageDesk
      "
    >
      <div className="text-xl font-light lg:col-[1/2] lg:text-3xl">
        <h3>Choose your ideal Meal</h3>
        <h4 className="mt-1 text-sm text-text-grey lg:text-base">We hope our meals will improve your day :)</h4>
      </div>
      <div
        className="
          relative
          mt-6
          flex
          items-center
          justify-between
          lg:col-start-2
          lg:col-end-3
          lg:row-start-1
          lg:row-end-3
          lg:mt-0 lg:h-full
          lg:flex-col
          lg:items-end
        "
      >
        <button
          type="button"
          onClick={() => {
            setIsFiltersOpen((prev) => !prev);
          }}
          className="
            flex
            items-center
            rounded-lg
            border-[1.5px]
            border-text-grey
            px-[12px]
            py-[10px]
            text-xs
          "
        >
          <img src={filterIcon} alt="" className="mr-[12px]" />
          Filters
        </button>
        <FilterModal
          isFiltersOpen={isFiltersOpen}
          setIsFiltersOpen={setIsFiltersOpen}
          filtersState={filtersState}
          setFiltersState={setFiltersState}
        />
        <div className="relative text-sm font-light text-text-grey lg:h-8 lg:border-b-2 lg:border-separation-line lg:text-base">
          Sort by:
          <select
            name="sortSelect"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none px-1 text-text-dark"
          >
            <option value="rateDesc" className="text-right">
              Rate ▼
            </option>
            <option value="rateAsc" className="text-right">
              Rate ▲
            </option>
            <option value="priceDesc" className="text-right">
              Price ▼
            </option>
            <option value="priceAsc" className="text-right">
              Price ▲
            </option>
            <option value="alphDesc" className="text-right">
              ABC ▼
            </option>
            <option value="alphAsc" className="text-right">
              ABC ▲
            </option>
          </select>
        </div>
      </div>
      <div
        className="
          z-0 
          mt-3 
          bg-none 
          text-sm 
          font-light 
          text-text-grey
          lg:mt-11
        "
      >
        <ul
          onClick={(e: React.MouseEvent<HTMLUListElement, MouseEvent>) => changeActiveCat(e)}
          className="
            flex 
            h-6 
            gap-7 
            overflow-y-scroll 
            border-b-[2px] 
            border-separation-line
            lg:h-8
            lg:gap-3
            lg:text-base
          "
        >
          {categoriesListItems}
        </ul>
      </div>
      <div
        className="
          lg:rows-[3/4]
          lg:col-start-1
          lg:col-end-3
        "
        onClick={() => setIsFiltersOpen(false)}
      >
        Here will be products
      </div>
    </div>
  );
}
