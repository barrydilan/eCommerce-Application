export default function FilterModalNumberInput(props: {
  id: string;
  value: string;
  universalFilterChanger: (value: string | boolean, field: string) => void;
  text: string;
}) {
  const { id, value, universalFilterChanger, text } = props;
  const placeholder = `${text}...`;
  return (
    <div className="mt-5 h-8 w-full text-text-dark dark:text-primary">
      <input
        className="lg mr-5 h-full w-28 rounded-lg border-1 border-text-grey pl-4 text-text-dark dark:bg-text-grey dark:text-primary dark:placeholder:text-text-dark md:w-[100px] md:pl-2"
        id={id}
        type="number"
        value={value}
        placeholder={placeholder}
        onChange={(e) => universalFilterChanger(e.target.value, id)}
      />
      <label htmlFor={id}>{text}</label>
    </div>
  );
}
