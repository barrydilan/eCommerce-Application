/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';

import filterIcon from '../../assets/icons/FiltersIcon.svg';

export default function ProductPage() {
  const [activeCat, setActiveCat] = useState('all');

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
        <div className="relative text-sm font-light text-text-grey">
          Sort by:
          <select name="sortSelect" id="" className="appearance-none px-1 text-text-dark">
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
      <div className="flex w-52 flex-col items-start rounded-lg border-2 border-separation-line p-2">
        <h4 className="w-full text-center">Filters</h4>
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
            id="veganCheck"
            type="checkbox"
            className="
                  peer/veganCheck
                  mr-2
                  h-5
                  w-5
                  appearance-none
                  rounded-md
                  bg-accent
                "
          />
          <label
            htmlFor="veganCheck"
            className="
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
                peer-checked/veganCheck:before:block
              "
          >
            Show only vegan
          </label>
        </div>
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
            id="spicyCheck"
            type="checkbox"
            className="
                  peer/spicyCheck
                  mr-2
                  h-5
                  w-5
                  appearance-none
                  rounded-md
                  bg-accent
                "
          />
          <label
            htmlFor="spicyCheck"
            className="
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
                peer-checked/spicyCheck:before:block
              "
          >
            Show only spicy
          </label>
        </div>
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
            id="promoCheck"
            type="checkbox"
            className="
                  peer/promoCheck
                  mr-2
                  h-5
                  w-5
                  appearance-none
                  rounded-md
                  bg-accent
                "
          />
          <label
            htmlFor="promoCheck"
            className="
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
                peer-checked/promoCheck:before:block
              "
          >
            Show only promo
          </label>
        </div>
        <div className="mt-2 flex w-full justify-between text-text-grey">
          <label htmlFor="priceFilter">Max price:</label>
          <input
            className="lg w-16 rounded border-2 border-separation-line text-text-dark"
            id="priceFilter"
            type="number"
          />
        </div>
        <div className="mt-2 flex w-full justify-between text-text-grey">
          <label htmlFor="calorFilter">Max calories:</label>
          <input
            className="lg w-16 rounded border-2 border-separation-line text-text-dark"
            id="calorFilter"
            type="number"
          />
        </div>
        <div className="mt-2 flex w-full justify-between text-text-grey">
          <label htmlFor="weightFilter">Max weight:</label>
          <input
            className="lg w-16 rounded border-2 border-separation-line text-text-dark"
            id="weightFilter"
            type="number"
          />
        </div>
      </div>
    </div>
  );
}
