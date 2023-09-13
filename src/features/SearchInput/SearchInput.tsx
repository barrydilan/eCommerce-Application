import { useRef, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

export default function SearchInput(props: { isHeader: boolean }) {
  const { isHeader } = props;
  const [query, setQuery] = useSearchParams('');
  const [searchValue, setSearchValue] = useState(query.get('search') ?? '');
  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== 'Enter') return;
    searchInputRef?.current?.blur();
  }

  return (
    <label
      htmlFor="searchInput"
      className={`
          relative
          ${isHeader ? 'sm:"flex" hidden w-2/5' : 'mt-4 flex w-full sm:hidden'}
          p-2
          pr-1
          before:absolute
          before:right-2 
          before:top-3 
          before:w-5 
          before:content-searchIcon 
          sm:flex
          md:leading-10
          lg:before:left-4
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
        onBlur={(e) => {
          query.set('search', e.target.value);
          setQuery(query);
        }}
        className={`
            w-full 
            rounded 
            pl-2
            transition-all 
            duration-300 
            focus:bg-separation-line
            focus:outline-none
            dark:text-primary
            ${isHeader ? 'dark:bg-dark-bg-primary' : 'dark:bg-separation-line/30 dark:placeholder:text-primary'}
            md:leading-10
            lg:pl-10
            `}
      />
    </label>
  );
}
