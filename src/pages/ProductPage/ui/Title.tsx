interface ITitleProps {
  image: string;
  name: string;
  children: React.ReactElement;
  onClick: () => void;
}

function Title({ image, name, children, onClick }: ITitleProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={onClick} className="relative h-full max-h-[320px] md:max-h-[400px]">
      <img className="h-full w-full object-cover brightness-[83%] md:rounded-t-2xl" src={image} alt={name} />
      {children}
    </div>
  );
}

export default Title;
