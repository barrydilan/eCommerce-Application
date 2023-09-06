interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
}

export default function Input({ id, label, disabled, type = 'text' }: InputProps): React.ReactElement {
  return (
    <div className="relative w-full">
      <input
        id={id}
        disabled={disabled}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          rounded-md 
          border-2 
          p-4 
          pt-6
          outline-none
          transition
          disabled:cursor-not-allowed
          disabled:opacity-70
        `}
      />
      <label
        className={`
          text-md 
          absolute
          left-4
          top-5 
          z-10 
          origin-[0] 
          -translate-y-3 
          transform 
          duration-150 
          peer-placeholder-shown:translate-y-0 
          peer-placeholder-shown:scale-100 
          peer-focus:-translate-y-4
          peer-focus:scale-75
        `}
      >
        {label}
      </label>
    </div>
  );
}

Input.defaultProps = {
  disabled: false,
  type: 'text',
};
