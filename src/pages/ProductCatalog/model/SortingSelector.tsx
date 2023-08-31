export default function SortingSelector(props: {
  sortOrder: string;
  setSortOrder: (value: React.SetStateAction<string>) => void;
}) {
  const { sortOrder, setSortOrder } = props;
  return (
    <div className="relative text-sm font-light text-text-grey lg:h-8 lg:border-b-2 lg:border-separation-line lg:text-base">
      Sort by:
      <select
        name="sortSelect"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="appearance-none px-1 text-text-dark"
      >
        <option value="rateDesc" className="text-right">
          Rate ▼
        </option>
        <option value="rateAsc" className="text-right">
          Rate ▲
        </option>
        <option value="priceDesc" className="text-right">
          Price ▼
        </option>
        <option value="priceAsc" className="text-right">
          Price ▲
        </option>
        <option value="alphDesc" className="text-right">
          ABC ▼
        </option>
        <option value="alphAsc" className="text-right">
          ABC ▲
        </option>
      </select>
    </div>
  );
}
