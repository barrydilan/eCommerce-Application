import CheckCircle from './CheckCircle';

export default function CirclesWrapper(props: { currStep: number; quantity: number }) {
  const titles = ['Email & Password', 'Name & Birth', 'Country & City', 'PC & Street'];

  const { currStep, quantity } = props;
  const circles = Array.from(Array(quantity - 1)).map((_, i) => (
    <CheckCircle numb={i} title={titles[i]} currStep={currStep} key={titles[i]} />
  ));
  return <div className="mt-9 flex w-full justify-between pl-4 pr-4 sm:w-128">{circles}</div>;
}
