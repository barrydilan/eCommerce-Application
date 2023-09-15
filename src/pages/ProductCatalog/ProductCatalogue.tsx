/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';

import { useCycle } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useSearchParams } from 'react-router-dom';

import { CATEGORIES, QUERY_FILTER, QUERY_SORT } from './const/constants.ts';
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
import ProductNotFound from './ui/ProductNotFound.tsx';
import ProductPageHeader from './ui/ProductPageHeader';
import { useGetCategoriesQuery, useGetCategoryQuery, useLazyGetProductListQuery } from '../../entities/product';
import { ProductAttributeNames, ProductSortingFields, ProductSortOrders } from '../../entities/product/types/enums.ts';
import { CategoryResult, ProductResponse } from '../../entities/product/types/types.ts';
import SearchInput from '../../features/SearchInput/SearchInput.tsx';
import { capitalize } from '../../shared/lib/helpers';
import { useGetPath } from '../../shared/lib/hooks';
import { Blackout } from '../../shared/ui';
import LoadingAnimation from '../../shared/ui/LoadingAnimation.tsx';
import MenuItem from '../../widgets/MenuItem/MenuItem.tsx';
import getAttribute from '../ProductPage/lib/helpers/getAttribute.ts';

export default function ProductCatalogue() {
  const path = useGetPath();
  const urlActiveCat = capitalize(decodeURIComponent(path));

  const { pathname } = useLocation();
  const [query, setQuery] = useSearchParams();
  const [isFiltersOpen, onFilterOpen] = useCycle(false, true);
  const [sortOrder, setSortOrder] = useState(query.get(QUERY_SORT) ?? 'price desc');
  const [productItems, setProductItems] = useState<ProductResponse>();
  const [getProductList, { data: rawProductListData, isSuccess: productsIsSuccess, isLoading: productsIsLoading }] =
    useLazyGetProductListQuery();
  const { data: categoriesList } = useGetCategoriesQuery();
  const [activeCat, setActiveCat] = useState(urlActiveCat ?? 'All');
  const { data: categoryData } = useGetCategoryQuery(urlActiveCat.toLowerCase().replace(' ', '-'));
  const [filtersState, setFiltersState] = useState(parseQueryState(query));

  const productListData = { ...productItems };
  const prevCategories = pathname
    .replace(CATEGORIES, '')
    .split('/')
    .map((elem) => capitalize(decodeURIComponent(elem)))
    .filter(Boolean);
  let categories: CategoryResult[] | null = null;

  if (categoriesList && categoryData) {
    categories = categoriesList.results.filter((res) => res?.parent?.id === categoryData.id);
  }

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

    if (categoryId) setFiltersState((prevState) => ({ ...prevState, categoryId }));

    getProductList(
      {
        limit: 5,
        offset,
        sort: {
          field,
          order,
        },
        filters: { ...filtersState, ...(categoryId && { categoryId }) },
        searchQuery: query.get('search'),
      },
      true,
    );
  }

  function changeActiveCat(e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    const {
      dataset: { userSelect },
    } = e.target as HTMLElement;

    if (userSelect && userSelect !== activeCat) {
      setActiveCat(userSelect);
      setProductItems(undefined);
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
    const encodedState = encodeQueryState(filtersState);

    onFilterOpen();

    if (query.get(QUERY_FILTER) === encodedState) return;

    fetchProducts();
    setProductItems(undefined);
    pushQuery([QUERY_FILTER, encodedState]);
  }

  useEffect(() => {
    if (query.get(QUERY_SORT) !== sortOrder) {
      pushQuery([QUERY_SORT, sortOrder]);
      fetchProducts();
    }
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
    if (categoryData) fetchProducts(categoryData.id);
  }, [categoryData]);

  return (
    <div
      className="
        mt-16
        grid
        grid-cols-1
        grid-rows-prodPageMob
        px-[10px]
        sm:mt-16
        md:px-5
        md:py-[48px]
        lg:grid-cols-prodPageDesk
        lg:grid-rows-prodPageDesk
        lg:pb-10
        "
    >
      <Blackout isBlackout={isFiltersOpen} />
      <ProductPageHeader />
      <SearchInput isHeader={false} />
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
          ? [...prevCategories, ...categories].map((item, i, arr) => {
              const isPrevCat = typeof item === 'string';
              const name = isPrevCat ? item : item.name.en;
              const isLast = i === arr.length - 1;

              return (
                <React.Fragment key={name}>
                  <CategoryItem index={i} item={name} activeCat={activeCat} />
                  {!isLast && (activeCat === name || isPrevCat) ? '/' : ''}
                </React.Fragment>
              );
            })
          : null}
      </CategoriesList>
      <MenuList>
        {productsIsLoading && (
          <div className="flex h-full items-center justify-center">
            <LoadingAnimation />
          </div>
        )}

        {!productListData?.results?.length && !rawProductListData?.results?.length && productsIsSuccess ? (
          <ProductNotFound />
        ) : null}

        {productListData?.results?.length && productListData.total && productListData.offset !== undefined ? (
          <InfiniteScroll
            dataLength={productListData.results.length}
            hasMore={productListData.offset < productListData.total}
            next={handleNextPage}
            loader={
              <div className="flex h-full items-center justify-center overflow-hidden">
                <LoadingAnimation />
              </div>
            }
            endMessage={<p className="text-center text-text-grey">You Reached The End!</p>}
            className="grid items-center gap-5 pb-14 lg:gap-6 lg:pb-0"
          >
            {productListData.results?.map(({ id, name, masterVariant: { prices, images, attributes } }, i) => (
              <MenuItem
                key={`${id}-${i}`}
                id={id}
                name={name.en}
                prices={prices}
                image={images[0].url}
                attributes={attributes}
                isSpicy={Boolean(getAttribute(attributes, ProductAttributeNames.IS_SPICY))}
                isVegan={Boolean(getAttribute(attributes, ProductAttributeNames.IS_VEGAN))}
              />
            ))}
          </InfiniteScroll>
        ) : null}
      </MenuList>
    </div>
  );
}
