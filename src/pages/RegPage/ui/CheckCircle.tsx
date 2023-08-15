export default function CheckCircle(props: { numb: number; isChecked: boolean }) {
  const { numb, isChecked } = props;
  const addClasses = isChecked
    ? 'bg-accent before:content-[""] before:absolute before:left-3 before:top-3 before:h-3 before:w-5 before:-rotate-45 before:rounded-sm before:border-b-6 before:border-l-6 before:border-b-primary before:border-l-primary before:block'
    : 'bg-primary text-accent text-center text-xl font-bold';

  return (
    <div
      className={`
      relative
      h-11 
      w-11 
      rounded-full 
      border-2
      border-accent
      leading-10
      ${addClasses}
      `}
    >
      {numb && !isChecked ? numb : ''}
    </div>
  );
}
