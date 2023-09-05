import { useNavigate } from 'react-router-dom';

interface ICategoryBackItemProps {
  item: string;
  id: number;
  isActive: boolean;
}

function CategoryBackItem({ item, id, isActive }: ICategoryBackItemProps) {
  const navigate = useNavigate();

  function handleNavigateBack() {
    id && navigate(-id);
  }

  return (
    <li
      className={`whitespace-nowrap px-1 ${
        isActive ? 'border-b-2 border-accent text-text-dark' : 'text-inactive-icons-grey'
      }`}
    >
      <button onClick={handleNavigateBack} data-user-select={item} type="button">
        {item}
      </button>
    </li>
  );
}

export default CategoryBackItem;
