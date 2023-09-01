interface ITitleProps {
  image: string;
  name: string;
  children: React.ReactElement;
}

function Title({ image, name, children }: ITitleProps) {
  return (
    <div className="relative h-full max-h-[320px] md:max-h-[400px]">
      <img className="h-full w-full object-cover md:rounded-t-2xl" src={image} alt={name} />
      {children}
    </div>
  );
}

export default Title;
