/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      accent: 'hsl(126deg, 55%, 47%)',
      'accent-light': 'hsl(0deg, 0%, 97%)',
      'accent-lightest': 'hsl(134deg, 73%, 90%)',
      primary: 'hsl(0deg, 0%, 100%)',
      secondary: 'hsl(0deg, 0%, 96%)',
      'text-dark': 'hsl(126deg, 0%, 20%)',
      'text-grey': 'hsl(0deg, 0%, 57%)',
      'border-black': 'hsl(0deg, 0%, 0%)',
      'inactive-icons-grey': 'hsl(199deg, 13%, 66%)',
      'shop-cart-red': 'hsl(0deg, 88%, 65%)',
      'separation-line': 'hsl(0deg, 0%, 95%)',
      'rating-star': 'hsl(50deg, 96%, 63%)',
      'modal-overlay': 'hsl(0deg, 0%, 0%)',
      'modal-bg': 'hsl(0deg, 0%, 100%)',
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
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
        tabGridCols: '11rem 1fr',
        deskGridCols: '22rem 1fr',
      },
      gridTemplateRows: {
        mobGridRows: 'auto 1fr auto',
        tabGridRows: 'auto 1fr',
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
