export default function CustomForm(props: {
  children: React.ReactNode;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}) {
  const { children, onSubmit } = props;
  return (
    <form
      onSubmit={onSubmit}
      className=" 
        ml-3 
        mr-3 
        box-border 
        w-128 
        rounded-3xl 
        border-2 
        border-separation-line 
        pb-2 
        pl-4 
        pr-4 
        pt-2
      "
    >
      {children}
    </form>
  );
}
