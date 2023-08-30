import { FiltersFields } from '../ProductPage';

export default function FilterModal(props: {
  isFiltersOpen: boolean;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filtersState: FiltersFields;
  setFiltersState: React.Dispatch<React.SetStateAction<FiltersFields>>;
}) {
  const { isFiltersOpen, setIsFiltersOpen, filtersState, setFiltersState } = props;
  const shownClasses = 'pointer-events-auto translate-x-0 opacity-1';
  const hiddenClasses = 'pointer-events-none -translate-x-52 opacity-0';
  return (
    <div
      className={`
        absolute 
        top-[4.6rem]
        z-10 flex 
        w-52 
        flex-col
        items-start 
        rounded-lg 
        border-2 
        border-separation-line 
        bg-primary 
        p-2
        transition-all
        ease-in
        ${isFiltersOpen ? shownClasses : hiddenClasses}
      `}
    >
      <h4 className="w-full text-center">Filters</h4>
      <button
        type="button"
        onClick={() => setIsFiltersOpen(false)}
        className="absolute right-2 top-1 cursor-pointer text-xl font-semibold transition-all ease-in hover:text-text-grey"
      >
        ×
      </button>
      <div
        className="
                mt-2
                flex
                h-8
                items-center
                justify-center
              "
      >
        <input
          id="veganCheck"
          type="checkbox"
          checked={filtersState.vegan}
          onChange={() => {
            setFiltersState((prev) => {
              return { ...filtersState, vegan: !prev.vegan };
            });
          }}
          className="
                  peer/veganCheck
                  mr-2
                  h-5
                  w-5
                  appearance-none
                  rounded-md
                  bg-accent
                "
        />
        <label
          htmlFor="veganCheck"
          className="
                relative
                text-xs
                text-text-grey
                before:absolute
                before:-left-6
                before:top-0.5
                before:hidden
                before:h-2
                before:w-3
                before:-rotate-45
                before:rounded-sm
                before:border-b-4
                before:border-l-4
                before:border-b-primary
                before:border-l-primary
                peer-checked/veganCheck:before:block
              "
        >
          Show only vegan
        </label>
      </div>
      <div
        className="
                mt-2
                flex
                h-8
                items-center
                justify-center
              "
      >
        <input
          id="spicyCheck"
          type="checkbox"
          checked={filtersState.spicy}
          onChange={() => {
            setFiltersState((prev) => {
              return { ...filtersState, spicy: !prev.spicy };
            });
          }}
          className="
                  peer/spicyCheck
                  mr-2
                  h-5
                  w-5
                  appearance-none
                  rounded-md
                  bg-accent
                "
        />
        <label
          htmlFor="spicyCheck"
          className="
                relative
                text-xs
                text-text-grey
                before:absolute
                before:-left-6
                before:top-0.5
                before:hidden
                before:h-2
                before:w-3
                before:-rotate-45
                before:rounded-sm
                before:border-b-4
                before:border-l-4
                before:border-b-primary
                before:border-l-primary
                peer-checked/spicyCheck:before:block
              "
        >
          Show only spicy
        </label>
      </div>
      <div
        className="
                mt-2
                flex
                h-8
                items-center
                justify-center
              "
      >
        <input
          id="promoCheck"
          type="checkbox"
          checked={filtersState.promo}
          onChange={() => {
            setFiltersState((prev) => {
              return { ...filtersState, promo: !prev.promo };
            });
          }}
          className="
                  peer/promoCheck
                  mr-2
                  h-5
                  w-5
                  appearance-none
                  rounded-md
                  bg-accent
                "
        />
        <label
          htmlFor="promoCheck"
          className="
                relative
                text-xs
                text-text-grey
                before:absolute
                before:-left-6
                before:top-0.5
                before:hidden
                before:h-2
                before:w-3
                before:-rotate-45
                before:rounded-sm
                before:border-b-4
                before:border-l-4
                before:border-b-primary
                before:border-l-primary
                peer-checked/promoCheck:before:block
              "
        >
          Show only promo
        </label>
      </div>
      <div className="mt-2 flex w-full justify-between text-text-grey">
        <label className="font-light" htmlFor="priceFilter">
          Max price:
        </label>
        <input
          className="lg w-16 rounded border-2 border-separation-line pl-1 text-text-dark"
          id="priceFilter"
          type="number"
          value={filtersState.price}
          onChange={(e) => {
            setFiltersState((prev) => {
              return { ...prev, price: e.target.value };
            });
          }}
        />
      </div>
      <div className="mt-2 flex w-full justify-between text-text-grey">
        <label className="font-light" htmlFor="calorFilter">
          Max calories:
        </label>
        <input
          className="lg w-16 rounded border-2 border-separation-line pl-1 text-text-dark"
          id="calorFilter"
          type="number"
          value={filtersState.calories}
          onChange={(e) => {
            setFiltersState((prev) => {
              return { ...prev, calories: e.target.value };
            });
          }}
        />
      </div>
      <div className="mt-2 flex w-full justify-between text-text-grey">
        <label className="font-light" htmlFor="weightFilter">
          Max weight:
        </label>
        <input
          className="lg w-16 rounded border-2 border-separation-line pl-1 text-text-dark"
          id="weightFilter"
          type="number"
          value={filtersState.weight}
          onChange={(e) => {
            setFiltersState((prev) => {
              return { ...prev, weight: e.target.value };
            });
          }}
        />
      </div>
      <div className="my-3 flex w-full justify-around">
        <button
          onClick={() => {
            setFiltersState({
              vegan: false,
              spicy: false,
              promo: false,
              price: '',
              calories: '',
              weight: '',
            });
          }}
          type="button"
          className="xl rounded bg-accent px-1.5 py-1 font-light text-primary"
        >
          Reset
        </button>
        <button
          onClick={() => setIsFiltersOpen(false)}
          type="button"
          className="xl rounded bg-accent px-1.5 py-1 font-light text-primary"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
