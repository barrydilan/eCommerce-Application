import { useRef, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import search from '../../assets/icons/search.svg';

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
          ${isHeader ? 'ml-12 hidden w-2/5 sm:flex' : 'mt-4 flex w-full sm:hidden'}
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
        onBlur={(e) => {
          const val = e.target.value;
          if (val === query.get('search')) return;
          query.set('search', val);
          setQuery(query);
        }}
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
  );
}
