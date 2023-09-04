/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

import { QUERY_ACTIVE_CAT, QUERY_FILTER, QUERY_SORT } from './const/constants.ts';
import encodeQueryState from './lib/helpers/encodeQueryState.ts';
import parseQueryState from './lib/helpers/parseQueryState.ts';
import filterCalories from './model/filterCalories.ts';
import FilterModal from './model/FilterModal';
import filterWeight from './model/filterWeight.ts';
import SortingSelector from './model/SortingSelector';
import CategoriesList from './ui/CategoriesList.tsx';
import CategoryItem from './ui/CategoryItem.tsx';
import FilterButton from './ui/FilterButton.tsx';
import MenuList from './ui/MenuList.tsx';
import ProductPageHeader from './ui/ProductPageHeader';
import {
  correctPrice,
  ProductAttributeNames,
  useGetCategoriesQuery,
  useLazyGetProductListQuery,
} from '../../entities/product';
import { ProductSortingFields, ProductSortOrders } from '../../entities/product/types/enums.ts';
import { ProductResponse } from '../../entities/product/types/types.ts';
import LoadingAnimation from '../../shared/ui/LoadingAnimation.tsx';
import MenuItem from '../../widgets/MenuItem/MenuItem.tsx';
import getAttribute from '../ProductPage/lib/helpers/getAttribute.ts';

export default function ProductCatalogue() {
  const [query, setQuery] = useSearchParams();
  const [filtersState, setFiltersState] = useState(parseQueryState(query));
  const [isFiltersOpen, onFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(query.get(QUERY_SORT) ?? 'price desc');
  const [productItems, setProductItems] = useState<ProductResponse>();
  const [getProductList, { data: rawProductListData, isSuccess: productsIsSuccess, isLoading: productsIsLoading }] = useLazyGetProductListQuery({});
  const { data: categories } = useGetCategoriesQuery(7);
  const [activeCat, setActiveCat] = useState(query.get(QUERY_ACTIVE_CAT) ?? 'All');

  const productListData = { ...productItems };

  if (productListData && productItems && !isFiltersOpen) {
    if (filtersState.calories !== '') {
      productListData.results = filterCalories(productItems, Number(filtersState.calories));
    }

    if (filtersState.weight !== '') {
      productListData.results = filterWeight(productItems, Number(filtersState.weight));
    }
  }

  function pushQuery(...data: string[][]) {
    data.forEach(([name, state]) => query.set(name, state));
    setQuery(query);
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
      filters: { ...filtersState, categoryId: categoryId || filtersState.categoryId },
      searchQuery: query.get('search'),
    })
  }

  function setActiveCategory(categoryId: string) {
    fetchProducts(categoryId);
    setFiltersState((prev) => ({ ...prev, categoryId }));
    setProductItems(undefined);
  }

  function changeActiveCat(e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    const {
      dataset: { userSelect, id },
    } = e.target as HTMLElement;

    if (userSelect && userSelect !== activeCat && id) {
      setActiveCat(userSelect);
      setActiveCategory(id);
    }
  }

  function onSort(value: React.SetStateAction<string>) {
    setSortOrder(value);
    setProductItems(undefined);
  }

  function handleNextPage() {
    fetchProducts(undefined, (productListData?.offset ?? 0) + 5);
  }

  function onApplyFilters() {
    onFilterOpen(false);
    fetchProducts();
    setProductItems(undefined);

    const encodedState = encodeQueryState(filtersState);

    if (query.get(QUERY_FILTER) !== encodedState) {
      pushQuery([QUERY_FILTER, encodedState]);
    }
  }

  useEffect(() => {
    if (query.get(QUERY_SORT) !== sortOrder) {
      pushQuery([QUERY_SORT, sortOrder]);
    }

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

  useEffect(() => {
    const encodedState = encodeQueryState(filtersState);

    if (query.get(QUERY_FILTER) !== encodedState) {
      pushQuery([QUERY_ACTIVE_CAT, activeCat], [QUERY_FILTER, encodedState]);
    }
  }, [filtersState.categoryId]);

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
        <FilterButton onFilterOpen={onFilterOpen} />
        <FilterModal
          isFiltersOpen={isFiltersOpen}
          filtersState={filtersState}
          onFilterOpen={onFilterOpen}
          setFiltersState={setFiltersState}
          onApplyFilters={onApplyFilters}
        />
        <SortingSelector sortOrder={sortOrder} onSort={onSort} />
      </div>
      <CategoriesList changeActiveCat={changeActiveCat}>
        {categories
          ? categories.results.map(({ id, name: { en } }) => (
              <CategoryItem key={id} item={en} activeCat={activeCat} id={id} />
            ))
          : null}
      </CategoriesList>
      <MenuList>
        {productsIsLoading ? <div className="flex h-full items-center justify-center">
            <LoadingAnimation />
        </div> : null}
        
        {!productListData?.results?.length && productsIsSuccess ? (
          <p className="self-center justify-self-center text-text-grey">No Products Found :(</p>
        ) : null}

        {productListData?.results?.length && productListData.total && productListData.offset !== undefined ? (
          <InfiniteScroll
            dataLength={productListData.results.length}
            hasMore={productListData.offset < productListData.total}
            next={handleNextPage}
            loader={<LoadingAnimation />}
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
