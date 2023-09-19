/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        }
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out"
      },
      colors: {
        accent: 'hsl(126, 55%, 47%)',
        'accent-light': 'hsl(0, 0%, 97%)',
        'accent-lightest': 'hsl(134, 73%, 90%)',
        primary: 'hsl(0, 0%, 100%)',
        secondary: 'hsl(0, 0%, 96%)',
        'text-dark': 'hsl(126, 0%, 20%)',
        'text-grey': 'hsl(0, 0%, 57%)',
        'border-black': 'hsl(0, 0%, 0%)',
        'inactive-icons-grey': 'hsl(199, 13%, 66%)',
        'shop-cart-red': 'hsl(0, 88%, 65%)',
        'separation-line': 'hsl(0, 0%, 95%)',
        'rating-star': 'hsl(50, 96%, 63%)',
        'rating-star-empty': 'hsl(100, 100%, 100%)',
        'modal-overlay': 'hsl(0, 0%, 0%)',
        'modal-bg': 'hsl(0, 0%, 100%)',
        'dark-bg-primary': 'hsl(240, 2%, 24%)',
        'dark-separation-line': 'hsl(252, 3%, 29%)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        aboutMob: "url('assets/img/about_bg_mob.svg')",
      },
      screens: {
        xs: '420px',
      },
      transitionTimingFunction: {
        bounce: 'cubic-bezier(.25,1.55,.65,.97)',
      },
      content: {
        searchIcon: "url('$icons/search.svg')",
        lockIcon: "url('$icons/lockIcon.svg')",
        emailIcon: "url('$icons/emailIcon.svg')",
        emailIconRed: "url('$icons/emailIconRed.svg')",
      },
      gridTemplateColumns: {
        lgGridCols: '174px 1fr 200px',
        xlGridCols: '350px 1fr 360px',
        prodPageDesk: '1fr 130px',
        lgNoCartGrid: '174px 1fr',
        xlNoCartGrid: '350px 1fr',
      },
      gridTemplateRows: {
        mobGridRows: 'auto 1fr auto',
        tabGridRows: 'auto 1fr',
        prodPageMob: 'repeat(3, auto) 1fr',
        prodPageDesk: 'repeat(2, auto) 1fr',
      },
      spacing: {
        30: '7.5rem',
        78: '20rem',
        89: '22rem',
        128: '32rem',
        '2px': '2px',
      },
      borderWidth: {
        1: '1px',
        3: '3px',
        6: '6px',
        12: '12px',
      },
      fontSize: {
        '2xs': '10px',
        '3xs': '8px',
        '5xl': '38px',
      },
    },
    maxHeight: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
    },
  },
  plugins: [],
};
