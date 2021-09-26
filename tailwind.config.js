const lineClamp = require('@tailwindcss/line-clamp');
const colors = require('tailwindcss/colors');

const primaryColor = colors.purple;
const secondaryColor = colors.teal;
const successColor = colors.green;
const errorColor = colors.red;
const gray = colors.blueGray;

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          darker: primaryColor[800],
          dark: primaryColor[700],
          main: primaryColor[600],
          light: primaryColor[400],
          lighter: primaryColor[100],
        },
        secondary: {
          darker: secondaryColor[700],
          dark: secondaryColor[600],
          main: secondaryColor[500],
          light: secondaryColor[300],
          lighter: secondaryColor[100],
        },
        background: {
          dark: gray[50],
          main: colors.white,
        },
        text: {
          main: 'rgba(0, 0, 0, 0.87)',
          light: 'rgba(0, 0, 0, 0.54)',
          lighter: 'rgba(0, 0, 0, 0.38)',
          contrast: 'rgba(255, 255, 255, 0.87)',
        },
        success: {
          dark: successColor[700],
          main: successColor[500],
          light: successColor[400],
          lighter: successColor[100],
        },
        error: {
          dark: errorColor[700],
          main: errorColor[500],
          light: errorColor[400],
          lighter: errorColor[100],
        },
        disabled: {
          dark: gray[500],
          main: gray[300],
        },
        overlay: {
          main: gray[300],
          light: gray[200],
        },
        scrollbar: {
          thumb: gray[500],
          thumbHover: gray[400],
        },
      },
      gridTemplateColumns: {
        'autofill-44': `repeat(auto-fill, minmax(${44 * 0.25}rem, 1fr))`,
      },
      spacing: {
        'app-header': `${20 * 0.25}rem`,
      },
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
      translate: ['group-hover'],
      opacity: ['group-hover'],
      backgroundColor: ['active'],
    },
  },
  plugins: [lineClamp],
};
