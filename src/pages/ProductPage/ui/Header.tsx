interface IHeaderProps {
  children: React.ReactElement;
}

function Header({ children }: IHeaderProps) {
  return <div className="flex items-end justify-between">{children}</div>;
}

export default Header;
