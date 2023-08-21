import { stagger, useAnimate } from 'framer-motion';

import Logo from '../../assets/icons/Logo';
import UserProfileLink from '../../features/UserProfileLink/UserProfileLink';

function Header() {
  const [scope, animate] = useAnimate();
  const logoName = 'SushiSushi'.split('');
  const animationEndHandler = () => {
    if (scope.current) {
      animate([['.letter', { y: 5, opacity: 1 }, { duration: 0.3, delay: stagger(0.1) }]]);
    }
  };

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
          items-center
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
        <Logo
          onAnimationEnd={() => {
            animationEndHandler();
          }}
        />
        <h1
          ref={scope}
          className="
            relative
            -translate-y-1
            text-lg
            font-light
            tracking-tight 
            text-text-dark
            md:pt-2
            md:text-2xl
          "
        >
          {logoName.map((letter, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <span className="letter opacity-3 inline-block translate-y-6 opacity-0" key={`${letter}-${index}`}>
                {letter}
              </span>
            );
          })}
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
      <UserProfileLink isHeader />
    </header>
  );
}

export default Header;
