import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { CATEGORIES_ALL_PATH, CATEGORIES_PATH, ENTER_KEY, ESK_KEY, SEARCH_QUERY } from './constants/constants.ts';
import search from '../../assets/icons/search.svg';
import { useLazyGetProductListQuery } from '../../entities/product';
import { IGetProductListParams } from '../../entities/product/types/interfaces.ts';

export default function SearchInput(props: { isHeader: boolean }) {
  const { isHeader } = props;
  const [query, setQuery] = useSearchParams('');
  const [searchValue, setSearchValue] = useState(query.get(SEARCH_QUERY) ?? '');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [getProductList, { data }] = useLazyGetProductListQuery();

  const resultNames = searchValue ? data?.results.map((res) => res.name.en) : null;

  const queryProductList = useCallback(
    (args: IGetProductListParams) => {
      return getProductList(args);
    },
    [getProductList],
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== ENTER_KEY && e.key !== ESK_KEY) return;
    searchInputRef?.current?.blur();

    setIsActive(false);

    if (!pathname.includes(CATEGORIES_PATH))
      navigate({
        pathname: CATEGORIES_ALL_PATH,
        search: query.toString(),
      });
  }

  function handleSubmit(e: React.FocusEvent<HTMLInputElement>) {
    const val = e.target.value;

    if ((e?.relatedTarget as HTMLButtonElement)?.type !== 'button') setIsActive(false);

    if (val === query.get(SEARCH_QUERY)) return;

    query.set(SEARCH_QUERY, val);
    setQuery(query);
  }

  function handleResultClick(e: React.MouseEvent<HTMLButtonElement>) {
    const val = (e.target as HTMLElement).textContent ?? '';

    setIsActive(false);

    if (val === query.get(SEARCH_QUERY)) return;

    setSearchValue(val);
    query.set(SEARCH_QUERY, val);
    setQuery(query);
  }

  useEffect(() => {
    const request = searchValue ? queryProductList({ searchQuery: searchValue, withTotal: false, limit: 5 }) : null;

    return () => request?.abort();
  }, [searchValue, queryProductList]);

  return (
    <div className={`${isHeader ? 'ml-12 hidden w-2/5 sm:block' : 'mt-4 block w-full sm:hidden'} relative z-[25]`}>
      <label
        htmlFor="searchInput"
        className={`
          peer
          relative
          ${isHeader ? 'sm:flex' : 'flex'}
          w-full
          p-2
          pr-1
          sm:flex
          md:leading-10
          lg:flex-row-reverse
        `}
      >
        <input
          id="searchInput"
          type="text"
          placeholder="Search"
          ref={searchInputRef}
          onKeyDown={handleKeyDown}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsActive(true)}
          onBlur={handleSubmit}
          className={`
            peer
            h-12
            w-full 
            rounded-3xl
            border-1
            border-text-grey
            border-opacity-30
            from-separation-line/50
            to-separation-line
            bg-clip-text
            pl-14
            pr-6
            transition-[transform,background-color]
            duration-300
            focus:-translate-y-0.5
            focus:border-none focus:bg-gradient-to-br focus:bg-clip-padding
            focus:shadow-md
            focus:outline-none
            dark:text-primary
            xs:border-none
            lg:transition-all
            ${isHeader ? 'dark:bg-dark-bg-primary' : 'dark:bg-separation-line/30 dark:placeholder:text-primary'}
            md:leading-10
            lg:pl-16
            `}
        />
        <img
          src={search}
          alt=""
          className="absolute left-8 top-1/2 -translate-y-2.5 duration-300 peer-focus:-translate-y-3 lg:left-10"
        />
      </label>
      {isActive && !!resultNames?.length && (
        <ul className="absolute left-0 grid w-full gap-2 rounded-xl bg-secondary px-6 py-8 peer-focus:bg-accent">
          {resultNames.map((res) => (
            <li className="w-full cursor-pointer rounded-md p-2 transition-all hover:bg-primary" key={res}>
              <button className="w-full text-left" type="button" onClick={handleResultClick}>
                {res}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
