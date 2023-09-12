const greenBorder = 'border-b-2 border-accent';
const borderGrey = 'border-b-2 border-separation-line dark:border-dark-separation-line';

export default function TabSelector(props: {
  isAccTabActive: boolean;
  setIsAccTabActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isAccTabActive, setIsAccTabActive } = props;
  return (
    <div className="mt-8 w-full font-medium dark:text-primary">
      <button
        onClick={() => setIsAccTabActive(true)}
        className={`${isAccTabActive ? greenBorder : borderGrey} h-9 w-1/2 transition-all`}
        type="button"
      >
        Account settings
      </button>
      <button
        onClick={() => setIsAccTabActive(false)}
        className={`${isAccTabActive ? borderGrey : greenBorder} h-9 w-1/2 transition-all`}
        type="button"
      >
        Addresses
      </button>
    </div>
  );
}
