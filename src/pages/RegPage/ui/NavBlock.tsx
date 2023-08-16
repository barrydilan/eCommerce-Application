import { Link } from 'react-router-dom';

type PropsType = {
  isBackBtn: boolean;
  backFunc: undefined | (() => void);
  nextFunc: undefined | (() => void);
};

export default function NavBlock(props: PropsType) {
  const { isBackBtn, backFunc, nextFunc } = props;
  return (
    <div
      className={`mt-6 flex items-center ${
        isBackBtn ? 'justify-between' : 'justify-around'
      } font-poppins text-text-grey`}
    >
      {isBackBtn && (
        <button type="button" className="h-10 p-2" onClick={backFunc}>
          Back
        </button>
      )}
      <p className="text-center text-xs sm:leading-10">
        Already have an account?{' '}
        <Link className="font-bold text-accent" to="/login">
          Log in
        </Link>
      </p>
      <button type="submit" className="h-10 rounded-lg bg-accent p-2 text-primary" onClick={nextFunc}>
        Continue
      </button>
    </div>
  );
}
