import { useState } from 'react';

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
      <div className="text-md flex w-full items-center justify-around font-medium dark:text-primary">
        <div className="mt-6 flex items-center">
          <input
            onClick={handleDefTheme}
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
          Light
          <div className={`mx-2 h-7 w-16 rounded-full ${theme ? 'bg-separation-line' : 'bg-text-grey'} px-1`}>
            <button
              onClick={handleThemeSelect}
              disabled={defTheme}
              className={`
                h-7 
                w-7 
                scale-90 rounded-full 
                bg-accent 
                transition-all
                duration-300
                disabled:bg-separation-line
                ${
                  theme
                    ? 'translate-x-0 shadow-[inset_2px_-3px_3px_2px_rgba(0,0,0,0.4)]'
                    : 'translate-x-7 shadow-[inset_-2px_2px_5px_2px_rgba(255,255,255,0.8)]'
                }
              `}
              type="button"
              aria-label="Theme selector"
            />
          </div>
          Dark
        </div>
      </div>
    </div>
  );
}
