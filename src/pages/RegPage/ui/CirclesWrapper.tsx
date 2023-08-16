import CheckCircle from './CheckCircle';

const randomizer = () => {
  return Math.floor(Math.random() * (1000 - 1 + 1) + 1);
};

export default function CirclesWrapper(props: { currStep: number; quantity: number }) {
  const { currStep, quantity } = props;
  const circles = Array.from(Array(quantity - 1)).map((_, i) => (
    <CheckCircle numb={i + 1} isChecked={currStep > i} key={randomizer()} />
  ));
  return <div className="mb-4 flex w-78 justify-between pl-4 pr-4">{circles}</div>;
}
