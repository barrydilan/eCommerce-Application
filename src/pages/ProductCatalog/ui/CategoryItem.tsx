import React from 'react';

import { motion } from 'framer-motion';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface ICategoryItemProps {
  item: string;
  activeCat: string;
  children?: React.ReactNode | null;
  index: number;
}

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

  function handleClick() {
    if (activeCat === item) return;

    if (isPrevCategory) {
      goBack();
    } else {
      goForward();
    }
  }

  return (
    <motion.li
      initial={{ y: isPrevCategory ? '0' : '100%' }}
      animate={{ y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 560,
        damping: 23,
        delay: 0.05 * index,
      }}
      className="flex items-center gap-3 whitespace-nowrap px-1"
    >
      <button
        className={`${isActive ? 'text-text-dark dark:text-primary' : ''} relative`}
        onClick={handleClick}
        data-user-select={item}
        type="button"
      >
        {item}
        {isActive ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 160,
              damping: 23,
            }}
            className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-accent md:-bottom-1"
          />
        ) : null}
      </button>
      {children}
    </motion.li>
  );
}

CategoryItem.defaultProps = {
  children: null,
};

export default CategoryItem;
