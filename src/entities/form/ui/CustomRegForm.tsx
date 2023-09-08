export default function CustomRegForm(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <form
      className=" 
      absolute
      top-1/2
      ml-3
      mr-3 
      box-border 
      min-h-[184px]
      w-full
      -translate-y-1/2
      font-medium
      text-text-grey
      sm:ml-0
      sm:mr-0
      "
    >
      {children}
    </form>
  );
}
