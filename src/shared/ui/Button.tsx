interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
}

export default function Button({ label, onClick, disabled, outline, small }: ButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      data-testid="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        mb-4
        w-full
        rounded-lg
        transition
        hover:opacity-80
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {label}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  outline: true,
  small: false,
};
