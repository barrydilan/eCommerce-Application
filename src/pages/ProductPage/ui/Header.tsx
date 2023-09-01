interface IHeaderProps {
  children: React.ReactElement;
}

function Header({ children }: IHeaderProps) {
  return <div className="flex items-baseline justify-between pt-6 sm:pt-10">{children}</div>;
}

export default Header;
