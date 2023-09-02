interface ICategoryItemProps {
  item: string;
  activeCat: string;
}

const greenBorder = 'border-b-2 border-accent';

function CategoryItem({ item, activeCat }: ICategoryItemProps) {
  return (
    <li className={`whitespace-nowrap px-1 ${activeCat === item ? greenBorder : ''}`} key={item}>
      <button data-user-select={item} type="button">
        {item}
      </button>
    </li>
  );
}

export default CategoryItem;
