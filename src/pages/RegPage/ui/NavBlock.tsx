import { Link } from 'react-router-dom';

type PropsType = {
  backFunc: () => void;
  nextFunc: () => void;
  isNextEnabled: boolean;
  isFirstStep: boolean;
};

export default function NavBlock(props: PropsType) {
  const { backFunc, nextFunc, isNextEnabled, isFirstStep } = props;
  return (
    <div
      className="
        mb-6
        mt-4
        flex 
        w-full
        items-center
        justify-between
        gap-4
        font-poppins
        text-text-grey
      "
    >
      <button
        type="button"
        className="h-10 rounded-lg p-2 disabled:opacity-20"
        onClick={backFunc}
        disabled={isFirstStep}
      >
        Back
      </button>
      <p className="text-center text-xs sm:leading-10">
        Already have an account?{' '}
        <Link className="font-bold text-accent" to="/login">
          Log in
        </Link>
      </p>
      <button
        type="submit"
        className="h-10 rounded-lg bg-accent p-2 text-primary disabled:bg-separation-line disabled:text-text-grey"
        onClick={nextFunc}
        disabled={!isNextEnabled}
      >
        Continue
      </button>
    </div>
  );
}
