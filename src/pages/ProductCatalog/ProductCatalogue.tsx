/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

import filterCalories from './model/filterCalories.ts';
import FilterModal from './model/FilterModal';
import { filtersInitialState } from './model/filtersInitialState.ts';
import filterWeight from './model/filterWeight.ts';
import SortingSelector from './model/SortingSelector';
import CategoryItem from './ui/CategoryItem.tsx';
import MenuList from './ui/MenuList.tsx';
import ProductPageHeader from './ui/ProductPageHeader';
import filterIcon from '../../assets/icons/FiltersIcon.svg';
import { correctPrice, ProductAttributeNames, useLazyGetProductListQuery } from '../../entities/product';
import { useGetCategoriesQuery } from '../../entities/product/api/productApi.ts';
import { ProductSortingFields, ProductSortOrders } from '../../entities/product/types/enums.ts';
import { ProductResponse } from '../../entities/product/types/types.ts';
import MenuItem from '../../widgets/MenuItem/MenuItem.tsx';
import getAttribute from '../ProductPage/lib/helpers/getAttribute.ts';

export default function ProductCatalogue() {
  const [activeCat, setActiveCat] = useState('All');
  const [filtersState, setFiltersState] = useState(filtersInitialState);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('price desc');
  const [productItems, setProductItems] = useState<ProductResponse>();
  const [query] = useSearchParams();
  const [getProductList, { data: rawProductListData }] = useLazyGetProductListQuery();
  const { data: categories } = useGetCategoriesQuery(7);

  const productListData = { ...productItems };

  if (productListData && productItems && filtersState.calories !== '' && !isFiltersOpen) {
    productListData.results = filterCalories(productItems, Number(filtersState.calories));
  }

  if (productListData && productItems && filtersState.weight !== '' && !isFiltersOpen) {
    productListData.results = filterWeight(productItems, Number(filtersState.weight));
  }

  function changeActiveCat(e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    const { userSelect } = (e.target as HTMLElement).dataset;
    if (userSelect && userSelect !== activeCat) setActiveCat(userSelect);
  }

  function fetchProducts(categoryId?: string, offset: number = 0) {
    const [currField, order] = sortOrder.split(' ') as [ProductSortingFields, ProductSortOrders];
    const field = ProductSortingFields[currField as unknown as keyof typeof ProductSortingFields];

    getProductList({
      limit: 5,
      offset,
      sort: {
        field,
        order,
      },
      filters: {
        isVegan: filtersState.vegan,
        isSpicy: filtersState.spicy,
        isPromo: filtersState.promo,
        calories: filtersState.calories,
        weight: filtersState.weight,
        price: filtersState.price,
        categoryId: categoryId || filtersState.categoryId,
      },
      searchQuery: query.get('search'),
    });
  }

  function onCategoryClick(categoryId: string) {
    fetchProducts(categoryId);
    setFiltersState((prev) => ({ ...prev, categoryId }));
    setProductItems(undefined);
  }

  function onSort(value: React.SetStateAction<string>) {
    setSortOrder(value);
    setProductItems(undefined);
  }

  function handleNextPage() {
    fetchProducts(undefined, (productListData.offset ?? 0) + 5);
  }

  function handleApplyFilters() {
    setIsFiltersOpen(false);
    fetchProducts();
    setProductItems(undefined);
  }

  useEffect(() => {
    fetchProducts();
  }, [sortOrder]);

  useEffect(() => {
    setProductItems((prev) => {
      if (!rawProductListData) return prev;
      if (!prev?.results) return rawProductListData;

      return {
        ...rawProductListData,
        results: [...prev.results, ...rawProductListData.results],
      };
    });
  }, [rawProductListData]);

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
          filtersState={filtersState}
          setIsFiltersOpen={setIsFiltersOpen}
          setFiltersState={setFiltersState}
          handleApplyFilters={handleApplyFilters}
        />
        <SortingSelector sortOrder={sortOrder} onSort={onSort} />
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
            ? categories.results.map(({ id, name: { en } }) => (
                <CategoryItem key={id} item={en} activeCat={activeCat} id={id} onCategoryClick={onCategoryClick} />
              ))
            : null}
        </ul>
      </div>
      <MenuList>
        {!productListData?.results?.length ? (
          <p className="self-center justify-self-center text-text-grey">No Products Found :(</p>
        ) : null}

        {productListData?.results?.length && productListData.total && productListData.offset !== undefined ? (
          <InfiniteScroll
            dataLength={productListData.results.length}
            hasMore={productListData.offset < productListData.total}
            next={handleNextPage}
            loader={<p className="text-text-grey">Loading...</p>}
            endMessage={<p className="text-text-grey">You Reached The End!</p>}
            className="grid items-center gap-6"
          >
            {productListData.results?.map(({ id, name, masterVariant }, i) => (
              <MenuItem
                key={`${id}-${i}`}
                id={id}
                name={name.en}
                price={correctPrice(masterVariant.prices[0].value.centAmount)}
                image={masterVariant.images[0].url}
                weight={getAttribute(masterVariant.attributes, ProductAttributeNames.WEIGHT)}
                calories={getAttribute(masterVariant.attributes, ProductAttributeNames.CALORIES)}
              />
            ))}
          </InfiniteScroll>
        ) : null}
      </MenuList>
    </div>
  );
}
