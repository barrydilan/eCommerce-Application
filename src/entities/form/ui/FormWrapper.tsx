export default function FormWrapper(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <div
      className="
        flex 
        h-full 
        w-full 
        items-center 
        justify-center 
        font-poppins 
      "
    >
      {children}
    </div>
  );
}
