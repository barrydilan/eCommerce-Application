import React, { useCallback, useEffect, useRef } from 'react';

import { AnimatePresence, Cycle, motion } from 'framer-motion';

import FilterModalCheckbox from './FilterModalCheckbox';
import FilterModalNumberInput from './FilterModalNumberInput';
import { FiltersFields, filtersInitialState } from './filtersInitialState.ts';
import { ProductAttributeNames, useLazyGetProductListQuery } from '../../../entities/product';
import { MOBILE_WIDTH } from '../const/constants.ts';

const initialDesktop = { y: '-63%', x: '40%', scale: 0, opacity: 0 };
const initialMobile = { y: '-60%', x: '-40%', scale: 0, opacity: 0 };

export default function FilterModal(props: {
  isFiltersOpen: boolean;
  filtersState: FiltersFields;
  onFilterOpen: Cycle;
  setFiltersState: React.Dispatch<React.SetStateAction<FiltersFields>>;
  onApplyFilters: () => void;
}) {
  const { isFiltersOpen, onFilterOpen, filtersState, setFiltersState, onApplyFilters } = props;
  const [getProducts, { data: productData }] = useLazyGetProductListQuery();
  const veganResults = useRef(0);
  const spicyResults = useRef(0);
  const promoResults = useRef(0);

  const clientWidth = window.innerWidth;
  const isMobile = clientWidth > MOBILE_WIDTH;
  const initial = isMobile ? initialDesktop : initialMobile;

  const universalFilterChanger = (value: string | boolean, field: string) => {
    setFiltersState((prev) => {
      return { ...prev, [field]: value };
    });
  };

  if (productData && (!veganResults.current || !spicyResults.current)) {
    productData.results.forEach(({ masterVariant: { attributes, prices } }) => {
      if (prices.at(0)?.discounted) {
        promoResults.current += 1;
      }

      attributes.forEach(({ name, value }) => {
        if (name === ProductAttributeNames.IS_VEGAN && value) {
          veganResults.current += 1;
        }

        if (name === ProductAttributeNames.IS_SPICY && value) {
          spicyResults.current += 1;
        }
      });
    });
  }

  const getProductList = useCallback(() => {
    getProducts(
      {
        limit: 100,
        withTotal: false,
      },
      true,
    );
  }, [getProducts]);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  return (
    <AnimatePresence>
      {isFiltersOpen ? (
        <motion.div
          key="filter"
          initial={initial}
          animate={{ y: 0, x: 0, scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 660,
            damping: 28,
          }}
          exit={initial}
          className={`
          absolute
          top-[4.6rem]
          z-40 flex 
          h-96
          w-72
          flex-col
          items-start 
          overflow-auto
          rounded-[32px] 
          border-2 
          border-separation-line
          bg-primary
          p-5
          dark:border-dark-separation-line
          dark:bg-dark-bg-primary
          md:w-[475px]
      `}
        >
          <h4 className="w-full text-center text-base font-normal dark:text-primary">Filters</h4>
          <button
            type="button"
            onClick={() => onFilterOpen()}
            className="absolute right-4 top-4 cursor-pointer text-2xl font-semibold text-text-grey transition-all ease-in hover:text-text-dark"
          >
            ×
          </button>
          <motion.div
            initial={isMobile ? { y: -100 } : { y: 0 }}
            animate={{ y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 660,
              damping: 28,
              delay: 0.05,
            }}
            className="flex w-full flex-col md:mt-6 md:flex-row md:justify-between md:gap-6"
          >
            <div className="mt-6 w-full border-b-2 border-t-2 border-separation-line pb-6 md:mt-0 md:w-[55.5%] md:border-b-0 md:border-r-2 md:border-t-0 md:pb-0 md:pr-6">
              <h5 className="my-6 text-text-grey md:mt-0">Show only:</h5>
              <FilterModalCheckbox
                id="isVegan"
                checked={filtersState.isVegan}
                universalFilterChanger={universalFilterChanger}
                text="Vegan"
                itemsNum={veganResults.current}
                peer="peer-checked/isVegan:before:block"
              />
              <FilterModalCheckbox
                id="isSpicy"
                checked={filtersState.isSpicy}
                universalFilterChanger={universalFilterChanger}
                text="Spicy"
                itemsNum={spicyResults.current}
                peer="peer-checked/isSpicy:before:block"
              />
              <FilterModalCheckbox
                id="isPromo"
                checked={filtersState.isPromo}
                universalFilterChanger={universalFilterChanger}
                text="Promo"
                itemsNum={promoResults.current}
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
          </motion.div>
          <div className="my-6 flex w-full justify-between gap-5 font-medium md:mt-10">
            <button
              onClick={() => {
                setFiltersState(filtersInitialState);
              }}
              type="button"
              className="w-1/2 rounded-lg border-1 bg-primary px-1.5 py-2 text-text-grey transition-all
          hover:bg-separation-line"
            >
              Reset
            </button>
            <button
              onClick={onApplyFilters}
              type="button"
              className="w-1/2 rounded-lg bg-accent px-1.5 py-2 text-accent-lightest transition-all
          hover:bg-accent-lightest hover:text-accent"
            >
              Apply
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
