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
          text-text-grey
          lg:mt-11
        "
    >
      <ul
        onClick={(e: React.MouseEvent<HTMLUListElement, MouseEvent>) => changeActiveCat(e)}
        className="
            flex
            h-8
            gap-2
            overflow-y-scroll
            border-b-[2px]
            border-separation-line
            md:h-9
          "
      >
        {children}
      </ul>
    </div>
  );
}

export default CategoriesList;
