import { useNavigate, useSearchParams } from 'react-router-dom';

interface ICategoryItemProps {
  item: string;
  activeCat: string;
  id: string;
}

const greenBorder = 'border-b-2 border-accent';

function CategoryItem({ item, activeCat, id }: ICategoryItemProps) {
  const [query] = useSearchParams();
  const navigate = useNavigate();

  const goToCategory = () =>
    navigate({
      pathname: `/categories/${item.toLowerCase()}`,
      search: query.toString(),
    });

  return (
    <li className={`whitespace-nowrap px-1 ${activeCat === item ? greenBorder : ''}`}>
      <button onClick={goToCategory} data-id={id} data-user-select={item} type="button">
        {item}
      </button>
    </li>
  );
}

export default CategoryItem;
