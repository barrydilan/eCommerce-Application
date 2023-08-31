export default function FilterModalNumberInput(props: {
  id: string;
  value: string;
  universalFilterChanger: (value: string | boolean, field: string) => void;
  text: string;
}) {
  const { id, value, universalFilterChanger, text } = props;
  return (
    <div className="mt-2 flex w-full justify-between text-text-grey">
      <label className="font-light" htmlFor={id}>
        {text}
      </label>
      <input
        className="lg w-16 rounded border-2 border-separation-line pl-1 text-text-dark"
        id={id}
        type="number"
        value={value}
        onChange={(e) => universalFilterChanger(e.target.value, id)}
      />
    </div>
  );
}
