import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface ICategoryItemProps {
  item: string;
  activeCat: string;
}

const greenBorder = 'border-b-2 border-accent';

function CategoryItem({ item, activeCat }: ICategoryItemProps) {
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = activeCat === item;

  function goToCategory() {
    navigate({
      pathname: `${pathname}/${item.toLowerCase()}`,
      search: query.toString(),
    });
  }

  return (
    <li className={`whitespace-nowrap px-1 ${isActive ? greenBorder : ''}`}>
      <button
        className={`${isActive ? 'text-text-dark' : ''}`}
        onClick={goToCategory}
        data-user-select={item}
        type="button"
      >
        {item}
      </button>
    </li>
  );
}

export default CategoryItem;
