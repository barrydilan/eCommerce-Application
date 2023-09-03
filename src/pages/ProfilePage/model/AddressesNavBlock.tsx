export default function AddressesNavBlock() {
  return (
    <div className="my-6 flex h-10 justify-between text-base font-medium text-accent ">
      <button
        className="flex h-full items-center rounded-md px-2 transition-all duration-300 hover:bg-separation-line"
        type="button"
      >
        <span className="mr-2 text-2xl">+</span> Add more
      </button>
      <button
        className="h-full rounded-md bg-accent-lightest px-8 transition-all duration-300 hover:bg-separation-line"
        type="button"
      >
        Save
      </button>
    </div>
  );
}
