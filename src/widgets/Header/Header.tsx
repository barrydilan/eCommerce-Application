import logoIcon from '../../assets/icons/logo.svg';
import UserProfileLink from '../../features/UserProfileLink/UserProfileLink';

function Header(props: { isLogged: boolean }) {
  const { isLogged } = props;
  return (
    <header
      className="
        lg:
        relative
        col-span-full
        flex
        w-full
        items-center
        justify-end
        md:border-b-2
        md:border-separation-line lg:justify-start
      "
    >
      <div
        className="
          mr-auto 
          flex
          w-40
          select-none
          pb-2
          pl-2
          pt-2
          md:h-16
          md:w-44
          md:border-r-2
          md:border-separation-line
          lg:mr-0
          lg:w-89
          lg:pl-8
        "
      >
        <img
          src={logoIcon}
          alt="company logo"
          className="
            mr-2
            w-8
          "
        />
        <h1
          className="
            text-2xl 
            font-light
            tracking-tight 
            text-text-dark
            md:pt-2
          "
        >
          Good&nbsp;food
        </h1>
      </div>
      <label
        htmlFor="searchInput"
        className="
          relative
          flex
          w-2/5
          p-2
          pr-1
          before:absolute 
          before:right-2 
          before:top-3 
          before:w-5 
          before:content-searchIcon
          md:leading-10
          lg:before:left-4
        "
      >
        <input
          id="searchInput"
          type="text"
          className="
            w-full 
            rounded 
            pl-2
            focus:bg-separation-line 
            focus:outline-none 
            md:leading-10
            lg:pl-10
            "
        />
      </label>
      <UserProfileLink isHeader isLogged={isLogged} />
    </header>
  );
}

export default Header;
