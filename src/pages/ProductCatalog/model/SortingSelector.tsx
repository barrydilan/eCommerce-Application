export default function SortingSelector(props: {
  sortOrder: string;
  onSort: (value: React.SetStateAction<string>) => void;
}) {
  const { sortOrder, onSort } = props;
  return (
    <div className="relative text-sm font-light text-text-grey lg:h-8 lg:border-b-2 lg:border-separation-line lg:text-base">
      Sort by:
      <select
        name="sortSelect"
        value={sortOrder}
        onChange={(e) => onSort(e.target.value)}
        className="appearance-none px-1 text-text-dark"
      >
        {/* <option value="rate desc" className="text-right"> */}
        {/*  Rate ▼ */}
        {/* </option> */}
        {/* <option value="rate asc" className="text-right"> */}
        {/*  Rate ▲ */}
        {/* </option> */}
        <option value="price desc" className="text-right">
          Price ▼
        </option>
        <option value="price asc" className="text-right">
          Price ▲
        </option>
        <option value="name desc" className="text-right">
          ABC ▼
        </option>
        <option value="name asc" className="text-right">
          ABC ▲
        </option>
      </select>
    </div>
  );
}
