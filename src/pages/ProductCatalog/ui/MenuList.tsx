import React from 'react';

interface IMenuListProps {
  children: React.ReactNode;
}

function MenuList({ children }: IMenuListProps) {
  return (
    <ul
      className="
          lg:rows-[3/4]
          mt-5
          h-full
          lg:col-start-1
          lg:col-end-3
          lg:mt-6
        "
    >
      {children}
    </ul>
  );
}

export default MenuList;
