import { useState } from 'react';

import { motion } from 'framer-motion';

import moon from '../../../assets/icons/moon.svg';
import sun from '../../../assets/icons/sun.svg';

const themeToggleVariants = {
  light: { x: 0 },
  dark: { x: '190%' },
};

export default function ThemeSelector() {
  const [defTheme, setDefTheme] = useState(localStorage.sushiDefThemeUsage === 'true');
  const [theme, setTheme] = useState(localStorage.sushiTheme === 'light');

  function handleThemeSelect() {
    if (theme) {
      setTheme(false);
      localStorage.sushiTheme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      setTheme(true);
      localStorage.sushiTheme = 'light';
      document.documentElement.classList.remove('dark');
    }
  }

  function handleDefTheme() {
    setDefTheme((prev: boolean) => {
      if (prev === false) {
        localStorage.sushiDefThemeUsage = true;
        localStorage.removeItem('sushiTheme');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
          setTheme(false);
        } else {
          document.documentElement.classList.remove('dark');
          setTheme(true);
        }
      } else {
        localStorage.sushiDefThemeUsage = false;
        localStorage.sushiTheme = 'light';
        document.documentElement.classList.remove('dark');
        setTheme(true);
      }
      return !prev;
    });
  }

  return (
    <div>
      <div className="text-md mt-10 flex w-full flex-col items-center justify-around gap-6 font-medium dark:text-primary sm:flex-row sm:gap-0">
        <div className="flex items-center">
          <input
            onChange={handleDefTheme}
            id="defTheme"
            type="checkbox"
            checked={defTheme}
            className="
                  peer/passToggler
                  mr-2
                  h-5
                  w-5
                  appearance-none
                  rounded-md
                  bg-accent
                "
          />
          <label
            htmlFor="defTheme"
            className="
                relative
                before:absolute
                before:-left-6
                before:top-1.5
                before:hidden
                before:h-2
                before:w-3
                before:-rotate-45
                before:rounded-sm
                before:border-b-4
                before:border-l-4
                before:border-b-primary
                before:border-l-primary
                peer-checked/passToggler:before:block
              "
          >
            Use default OS color theme
          </label>
        </div>
        <div className="flex items-center">
          <button
            aria-label="Theme selector"
            type="button"
            disabled={defTheme}
            onClick={handleThemeSelect}
            className={`relative h-6 w-14 rounded-full ${
              theme ? 'border-text-grey bg-separation-line' : 'border-primary bg-text-grey'
            } border-1 px-1`}
          >
            <img src={sun} alt="light theme" className="absolute left-1.5 top-[18%]" />
            <img src={moon} alt="dark theme" className="absolute right-1.5 top-[20%]" />
            <motion.span
              variants={themeToggleVariants}
              animate={theme ? themeToggleVariants.light : themeToggleVariants.dark}
              transition={{
                type: 'spring',
                stiffness: 700,
                damping: 30,
              }}
              className={`
                relative
                z-10
                block
                h-4
                w-4
                rounded-full
                ${theme ? 'bg-text-dark' : 'bg-primary'}
                disabled:bg-inactive-icons-grey
              `}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
