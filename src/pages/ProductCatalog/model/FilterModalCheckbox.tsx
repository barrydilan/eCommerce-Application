import { AnimateCounter } from '../../../shared/ui';

export default function FilterModalCheckbox(props: {
  id: string;
  checked: boolean;
  universalFilterChanger: (value: string | boolean, field: string) => void;
  text: string;
  peer: string;
  itemsNum: number;
}) {
  const { id, checked, universalFilterChanger, text, peer, itemsNum } = props;
  return (
    <div
      className="
        mt-5
        flex
        h-8
        w-full  
        items-center
        justify-start
      "
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => universalFilterChanger(!checked, id)}
        className={`
                  peer/${id}
                  mr-5
                  h-5
                  w-5
                  cursor-pointer
                  appearance-none
                  rounded-md
                  bg-accent
                `}
      />
      <label
        htmlFor={id}
        className={`
                relative
                cursor-pointer
                text-base
                leading-[15px]
                text-text-dark
                before:absolute
                before:-left-9
                before:top-0.5
                before:hidden
                before:h-2
                before:w-3
                before:-rotate-45
                before:rounded-sm
                before:border-b-4
                before:border-l-4
                before:border-b-primary
                before:border-l-primary
                dark:text-primary
                ${peer}
              `}
      >
        {text}
      </label>
      <div className="ml-auto h-5 w-5 rounded-md bg-accent-lightest text-center text-xs leading-[20px] text-accent">
        <AnimateCounter value={itemsNum} />
      </div>
    </div>
  );
}
