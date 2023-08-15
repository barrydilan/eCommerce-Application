import gulp from '../../../assets/icons/PrimaryGulp.svg';

export default function CheckCircle(props: { numb: number; isChecked: boolean }) {
  const { numb, isChecked } = props;
  const addClasses = isChecked ? 'bg-accent' : 'bg-primary';

  return (
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
      border-accent
      text-xl
      font-bold
      text-accent
      ${addClasses}
      `}
    >
      {isChecked ? <img src={gulp} alt="" /> : numb}
    </div>
  );
}
