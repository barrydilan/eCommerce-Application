interface ICategoryItemProps {
  item: string;
  activeCat: string;
  id: string;
}

const greenBorder = 'border-b-2 border-accent';

function CategoryItem({ item, activeCat, id }: ICategoryItemProps) {
  return (
    <li className={`whitespace-nowrap px-1 ${activeCat === item ? greenBorder : ''}`}>
      <button data-id={id} data-user-select={item} type="button">
        {item}
      </button>
    </li>
  );
}

export default CategoryItem;
