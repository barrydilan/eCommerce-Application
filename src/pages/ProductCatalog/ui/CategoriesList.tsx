/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

interface ICategoryList {
  children: React.ReactNode;
  changeActiveCat: (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => void;
}

function CategoriesList({ children, changeActiveCat }: ICategoryList) {
  return (
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
        {children}
      </ul>
    </div>
  );
}

export default CategoriesList;
