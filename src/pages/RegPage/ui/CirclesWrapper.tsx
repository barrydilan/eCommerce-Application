import CheckCircle from './CheckCircle';

export default function CirclesWrapper(props: { currStep: number }) {
  const { currStep } = props;
  return (
    <div className="mb-4 flex w-78 justify-between pl-4 pr-4">
      <CheckCircle numb={1} isChecked={currStep >= 1} />
      <CheckCircle numb={2} isChecked={currStep >= 2} />
      <CheckCircle numb={3} isChecked={currStep >= 3} />
      <CheckCircle numb={4} isChecked={currStep >= 4} />
    </div>
  );
}
