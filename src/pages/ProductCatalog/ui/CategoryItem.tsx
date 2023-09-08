import React from 'react';

import { motion } from 'framer-motion';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface ICategoryItemProps {
  item: string;
  activeCat: string;
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode | null;
  index: number;
}

// const greenBorder = 'border-b-2 border-accent';

function CategoryItem({ item, activeCat, index, children = null }: ICategoryItemProps) {
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = activeCat === item;
  const path = decodeURIComponent(pathname);
  const name = item.toLowerCase();
  const isPrevCategory = path.includes(name);

  function goBack() {
    const itemIndex = path.indexOf(name);
    const prevCategory = `${path.slice(0, itemIndex)}${name}`;

    navigate({
      pathname: prevCategory,
      search: query.toString(),
    });
  }

  function goForward() {
    navigate({
      pathname: `${pathname}/${item.toLowerCase()}`,
      search: query.toString(),
    });
  }

  return (
    <motion.li
      initial={{ y: isPrevCategory ? '0' : '100%' }}
      animate={{ y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 660,
        damping: 23,
        delay: 0.03 * index,
      }}
      className="flex items-center gap-3 whitespace-nowrap px-1"
    >
      <button
        className={`${isActive ? 'text-text-dark' : ''} relative`}
        onClick={isPrevCategory ? goBack : goForward}
        data-user-select={item}
        type="button"
      >
        {item}
        {isActive ? <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent" /> : null}
      </button>
      {children}
    </motion.li>
  );
}

export default CategoryItem;
