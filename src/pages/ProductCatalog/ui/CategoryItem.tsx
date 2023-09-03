interface ICategoryItemProps {
  item: string;
  activeCat: string;
  id: string;
  onCategoryClick: (id: string) => void;
}

const greenBorder = 'border-b-2 border-accent';

function CategoryItem({ item, activeCat, id, onCategoryClick }: ICategoryItemProps) {
  function handleCategoryClick() {
    onCategoryClick(id);
  }

  return (
    <li className={`whitespace-nowrap px-1 ${activeCat === item ? greenBorder : ''}`}>
      <button onClick={handleCategoryClick} data-user-select={item} type="button">
        {item}
      </button>
    </li>
  );
}

export default CategoryItem;
