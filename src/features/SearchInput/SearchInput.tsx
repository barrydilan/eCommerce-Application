import React, { useCallback, useEffect, useRef, useState } from 'react';

import { AnimatePresence, Cycle, motion, useCycle } from 'framer-motion';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import {
  BUTTON_TYPE_NAME,
  CATEGORIES_ALL_PATH,
  CATEGORIES_PATH,
  ENTER_KEY,
  ESK_KEY,
  SEARCH_QUERY,
} from './constants/constants.ts';
import findMatch from './helpers/findMatch.ts';
import replaceMatch from './helpers/replaceMatch.ts';
import cross from '../../assets/icons/cross.svg';
import search from '../../assets/icons/search.svg';
import { useLazyGetProductListQuery } from '../../entities/product';
import { IGetProductListParams } from '../../entities/product/types/interfaces.ts';
import { capitalize } from '../../shared/lib/helpers';
import { Blackout } from '../../shared/ui';

export default function SearchInput(props: { isHeader: boolean; setIsSearchActive?: Cycle }) {
  const [query, setQuery] = useSearchParams('');
  const [searchValue, setSearchValue] = useState(query.get(SEARCH_QUERY) ?? '');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useCycle(false, true);
  const [getProductList, { data }] = useLazyGetProductListQuery();

  const { isHeader, setIsSearchActive } = props;
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

    if (!pathname.includes(CATEGORIES_PATH))
      navigate({
        pathname: CATEGORIES_ALL_PATH,
        search: query.toString(),
      });
  }

  function handleSubmit(e: React.FocusEvent<HTMLInputElement>) {
    const val = e.target.value;

    if ((e?.relatedTarget as HTMLButtonElement)?.type !== BUTTON_TYPE_NAME) {
      setIsSearchActive?.();
      setIsActive();
    }

    if (val === query.get(SEARCH_QUERY)) return;

    query.set(SEARCH_QUERY, val);
    setQuery(query);
  }

  function handleResultClick(nameId: number) {
    const val = resultNames?.[nameId] ?? '';

    setIsActive();
    setIsSearchActive?.();

    if (val === query.get(SEARCH_QUERY)) return;

    setSearchValue(val);
    query.set(SEARCH_QUERY, val);
    setQuery(query);
  }

  function handleResetQuery() {
    setSearchValue('');
    if (isActive) {
      setIsActive();
      setIsSearchActive?.();
    }
  }

  useEffect(() => {
    const request = searchValue ? queryProductList({ searchQuery: searchValue, withTotal: false, limit: 5 }) : null;

    return () => request?.abort();
  }, [searchValue, queryProductList]);

  return (
    <>
      <Blackout
        isBlackout={isActive}
        isScrollable
        unlock={() => {
          setIsSearchActive?.();
          setIsActive();
        }}
      />
      <div
        className={`${isHeader ? 'ml-12 hidden w-2/5 sm:block' : 'mt-4 block w-full sm:hidden'} relative ${
          isActive ? 'z-[35]' : ''
        }`}
      >
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
          {searchValue && (
            <button
              onClick={handleResetQuery}
              type="button"
              className={`absolute right-6 top-4 z-10 transition-all lg:right-8 ${
                isActive ? 'translate-y-0' : 'translate-y-0.5'
              }`}
            >
              <img src={cross} alt="" />
            </button>
          )}
          <input
            id="searchInput"
            type="text"
            placeholder="Search"
            ref={searchInputRef}
            onKeyDown={handleKeyDown}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => {
              setIsSearchActive?.();
              setIsActive();
            }}
            onBlur={handleSubmit}
            className={`
            peer
            h-12
            w-full 
            rounded-3xl
            border-1
            border-text-grey
            border-opacity-30
            bg-clip-text
            px-14
            transition-[transform,background-color]
            duration-300
            focus:-translate-y-0.5
            focus:border-none focus:bg-secondary focus:bg-gradient-to-br
            focus:bg-clip-padding
            focus:outline-none
            focus:drop-shadow-md
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

        <AnimatePresence>
          {isActive && !!resultNames?.length && (
            <motion.ul
              initial={{ y: '15%', opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 20,
              }}
              exit={{ y: '15%', opacity: 0, scale: 0.95 }}
              className="absolute left-0 grid w-full rounded-3xl bg-secondary px-6 py-8 drop-shadow-2xl peer-focus:bg-accent dark:bg-dark-bg-primary dark:text-primary"
            >
              {resultNames.map((res, i) => (
                <motion.li
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 480,
                    damping: 18,
                    delay: i * 0.07,
                  }}
                  className="flex w-full cursor-pointer gap-x-5 rounded-xl px-4 py-3 hover:bg-primary dark:hover:bg-dark-separation-line"
                  key={res}
                >
                  <img src={search} alt="" />
                  <button className="w-full text-left" type="button" onClick={() => handleResultClick(i)}>
                    <span>{capitalize(findMatch(res, searchValue))}</span>
                    <span className="text-text-grey">{replaceMatch(res, searchValue)}</span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

SearchInput.defaultProps = {
  setIsSearchActive: null,
};
