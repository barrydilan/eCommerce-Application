import { stagger, useAnimate } from 'framer-motion';
import { Link } from 'react-router-dom';

import LogOutBtn from '../../features/LogOutBtn/LogOutBtn';
import SearchInput from '../../features/SearchInput/SearchInput';
import UserProfileLink from '../../features/UserProfileLink/UserProfileLink';
import Logo from '../ui/Logo';

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
      className={`
        fixed
        z-30
        col-span-full
        flex
        h-16
        w-full
        items-center
        justify-end
        bg-primary
        bg-opacity-50
        backdrop-blur-lg
        backdrop-saturate-200
        transition-all
        duration-300
        before:pointer-events-none
        before:absolute
        before:h-full
        before:w-full
        before:bg-[url('/src/assets/img/noise.svg')]
        before:bg-[length:100px_100px]
        before:opacity-10
        dark:bg-dark-bg-primary
        dark:bg-opacity-50
        md:border-b-2
        md:border-separation-line
        dark:md:border-dark-separation-line
        lg:h-20
        lg:w-[1536px]
        lg:justify-start
      `}
    >
      <div
        className="
          mr-auto
          flex
          w-40
          select-none
          items-center
          pb-2
          pl-1
          pt-2
          md:h-20
          md:w-44
          md:border-r-2
          md:border-separation-line
          dark:md:border-dark-separation-line
          lg:mr-0
          xl:w-89
          xl:pl-9
        "
      >
        <Link to="/">
          <Logo
            onAnimationEnd={() => {
              animationEndHandler();
            }}
          />
        </Link>
        <Link to="/">
          <h1
            ref={scope}
            className="
            relative
            -translate-y-1
            text-xl
            tracking-tight
            text-text-dark
            dark:text-primary
            md:mb-2
            md:pt-2
            xl:text-2xl
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
        </Link>
      </div>

      <SearchInput isHeader />
      <LogOutBtn isHeader />
      <UserProfileLink isHeader />
    </header>
  );
}

export default Header;
