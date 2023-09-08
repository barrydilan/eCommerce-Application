import PrimaryGulp from '../../../assets/icons/PrimaryGulp';

export default function CheckCircle(props: { numb: number; currStep: number; title: string }) {
  const { numb, title, currStep } = props;

  function getStatus() {
    if (numb - currStep < 0) {
      return 'done';
    }
    if (numb - currStep > 0) {
      return 'pending';
    }
    return 'active';
  }
  const status = getStatus();
  const getClasses = () => {
    if (status === 'done') {
      return 'bg-accent border-accent text-accent';
    }
    if (status === 'pending') {
      return 'bg-primary border-inactive-icons-grey text-inactive-icons-grey';
    }
    return 'bg-primary border-accent text-accent';
  };
  const addClasses = getClasses();
  return (
    <div className="flex w-fit flex-col items-center justify-start">
      <div
        className={`
        relative
        flex 
        h-11 
        w-11 
        items-center
        justify-center
        rounded-full 
        border-2 
        text-xl
        font-bold
        ${addClasses}
        `}
      >
        {status === 'done' ? <PrimaryGulp /> : numb + 1}
      </div>
      <p
        className={`mt-1.5 text-center text-xs font-medium text-text-grey ${
          status === 'active' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {title}
      </p>
    </div>
  );
}
