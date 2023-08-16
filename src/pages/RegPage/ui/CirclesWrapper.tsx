import CheckCircle from './CheckCircle';

const randomizer = () => {
  return Math.floor(Math.random() * (1000 - 1 + 1) + 1);
};

export default function CirclesWrapper(props: { currStep: number; quantity: number }) {
  const titles = ['Email & Password', 'Name & Birth', 'Country & City', 'PC & Street'];

  const { currStep, quantity } = props;
  const circles = Array.from(Array(quantity - 1)).map((_, i) => (
    <CheckCircle numb={i} title={titles[i]} currStep={currStep} key={randomizer()} />
  ));
  return <div className="mb-4 flex w-full justify-between pl-4 pr-4 sm:w-128">{circles}</div>;
}
