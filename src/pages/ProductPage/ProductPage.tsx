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

  return (
    <div className="grid grid-cols-1 grid-rows-prodPageMob px-[10px]">
      <div className="text-xl font-light">
        <h3>Choose your ideal Meal</h3>
        <h4 className="mt-1 text-sm text-text-grey">We hope our meals will improve your day :)</h4>
      </div>
      <div className="relative mt-6 flex items-center justify-between">
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
        <div className="relative text-sm font-light text-text-grey">
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
      <div className="z-0 mt-3 bg-none text-sm font-light text-text-grey">
        <ul
          onClick={(e: React.MouseEvent<HTMLUListElement, MouseEvent>) => changeActiveCat(e)}
          className="flex h-6 gap-7 overflow-y-scroll border-b-[2px] border-separation-line"
        >
          <li className={`px-1 ${activeCat === 'all' ? greenBorder : ''}`}>
            <button data-user-select="all" type="button">
              All
            </button>
          </li>
          <li className={`px-1 ${activeCat === 'sushi' ? greenBorder : ''}`}>
            <button data-user-select="sushi" type="button">
              Sushi
            </button>
          </li>
          <li className={`px-1 ${activeCat === 'sets' ? greenBorder : ''}`}>
            <button data-user-select="sets" type="button">
              Sets
            </button>
          </li>
          <li className={`px-1 ${activeCat === 'dishes' ? greenBorder : ''}`}>
            <button data-user-select="dishes" type="button">
              Main&nbsp;dishes
            </button>
          </li>
          <li className={`px-1 ${activeCat === 'drinks' ? greenBorder : ''}`}>
            <button data-user-select="drinks" type="button">
              Drinks
            </button>
          </li>
          <li className={`px-1 ${activeCat === 'salads' ? greenBorder : ''}`}>
            <button data-user-select="salads" type="button">
              Salads
            </button>
          </li>
          <li className={`px-1 ${activeCat === 'soups' ? greenBorder : ''}`}>
            <button data-user-select="soups" type="button">
              Soups
            </button>
          </li>
        </ul>
      </div>
      <div onClick={() => setIsFiltersOpen(false)}>
        Here will be products <br />
        <button
          type="button"
          onClick={() => {
            console.log(filtersState);
          }}
        >
          click me
        </button>
      </div>
    </div>
  );
}
