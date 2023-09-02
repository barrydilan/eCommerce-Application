/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import FilterModal from './model/FilterModal';
import SortingSelector from './model/SortingSelector';
import CategoryItem from './ui/CategoryItem.tsx';
import ProductPageHeader from './ui/ProductPageHeader';
import filterIcon from '../../assets/icons/FiltersIcon.svg';
import { correctPrice, ProductAttributeNames, useLazyGetProductListQuery } from '../../entities/product';
import { useGetCategoriesQuery } from '../../entities/product/api/productApi.ts';
import { ProductSortingFields, ProductSortOrders } from '../../entities/product/types/enums.ts';
import MenuItem from '../../widgets/MenuItem/MenuItem.tsx';
import getAttribute from '../ProductPage/lib/helpers/getAttribute.ts';

export type FiltersFields = {
  vegan: boolean;
  spicy: boolean;
  promo: boolean;
  price: string;
  calories: string;
  weight: string;
};

export default function ProductCatalogue() {
  const [activeCat, setActiveCat] = useState('All');
  const [filtersState, setFiltersState] = useState({
    vegan: false,
    spicy: false,
    promo: false,
    price: '',
    calories: '',
    weight: '',
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('price desc');
  const [getProductList, { data: rawData }] = useLazyGetProductListQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const data = { ...rawData };

  let categories;

  if (categoryData) {
    categories = categoryData.results.filter(({ ancestors }) => ancestors.length <= 1);
  }

  if (data && rawData && filtersState.calories !== '' && !isFiltersOpen) {
    data.results = rawData.results.filter(
      (product) =>
        Number(getAttribute(product.masterVariant.attributes, ProductAttributeNames.CALORIES)) <
        Number(filtersState.calories),
    );
  }

  if (data && rawData && filtersState.weight !== '' && !isFiltersOpen) {
    data.results = rawData.results.filter(
      (product) =>
        Number(getAttribute(product.masterVariant.attributes, ProductAttributeNames.WEIGHT)) <
        Number(filtersState.weight),
    );
  }

  function changeActiveCat(e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    const { userSelect } = (e.target as HTMLElement).dataset;
    if (userSelect && userSelect !== activeCat) setActiveCat(userSelect);
  }

  function fetchProducts() {
    const [currField, order] = sortOrder.split(' ') as [ProductSortingFields, ProductSortOrders];
    const field = ProductSortingFields[currField as unknown as keyof typeof ProductSortingFields];

    getProductList({
      limit: 5,
      sort: {
        field,
        order,
      },
      filter: {
        isVegan: filtersState.vegan,
        isSpicy: filtersState.spicy,
        isPromo: filtersState.promo,
        calories: filtersState.calories,
        weight: filtersState.weight,
        price: filtersState.price,
      },
    });
  }

  useEffect(() => {
    fetchProducts();
  }, [sortOrder]);

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
      <ProductPageHeader />
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
          fetchProducts={fetchProducts}
        />
        <SortingSelector sortOrder={sortOrder} setSortOrder={setSortOrder} />
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
          {categories
            ? categories.map(({ name: { en } }) => <CategoryItem key={en} item={en} activeCat={activeCat} />)
            : null}
        </ul>
      </div>
      <div
        className="
        lg:rows-[3/4]
          mt-8
          grid
          gap-6
          lg:col-start-1
          lg:col-end-3
        "
        onClick={() => {
          setIsFiltersOpen(false);
        }}
      >
        {data
          ? data.results?.map(({ id, name, masterVariant }) => (
              <MenuItem
                key={id}
                id={id}
                name={name.en}
                price={correctPrice(masterVariant.prices[0].value.centAmount)}
                image={masterVariant.images[0].url}
                weight={getAttribute(masterVariant.attributes, ProductAttributeNames.WEIGHT)}
                calories={getAttribute(masterVariant.attributes, ProductAttributeNames.CALORIES)}
              />
            ))
          : null}
      </div>
    </div>
  );
}
