import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const primaryColor = colors.purple;
const secondaryColor = colors.teal;
const successColor = colors.green;
const errorColor = colors.red;
const gray = colors.slate;

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
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
          lighter: secondaryColor[50],
        },
        skeleton: gray[200],
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
          'thumb-hover': gray[400],
        },
      },
      spacing: {
        'app-header': defaultTheme.spacing[16],
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
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      const cssVariableKey = '--fixed-line-height';

      matchUtilities(
        {
          'fixed-leading': (value: string) => {
            let lineHeight = value;

            // Some `lineHeight` values does not end with `rem` like `normal: 1.5`.
            // To handle these values, we add `em` at the end of them
            // to calculate `lineHeight * fontSize` value of the current element.
            if (!lineHeight.endsWith('rem')) {
              lineHeight = `${lineHeight}em`;
            }

            return {
              [cssVariableKey]: lineHeight,
              lineHeight,
            };
          },
        },
        {
          values: theme('lineHeight'),
        },
      );

      matchUtilities(
        {
          'fixed-line-clamp': (clamp) => {
            return {
              minHeight: `calc(var(${cssVariableKey}) * ${clamp})`,
              // For line clamp
              overflow: 'hidden',
              display: '-webkit-box',
              '-webkit-box-orient': 'vertical',
              '-webkit-line-clamp': `${clamp}`,
            };
          },
        },
        {
          values: {
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5,
          },
        },
      );
    }),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'grid-cols-autofill': (value: string) => {
            return {
              gridTemplateColumns: `repeat(auto-fill, minmax(${value}, 1fr))`,
            };
          },
        },
        {
          values: theme('spacing'),
        },
      );
    }),
  ],
} satisfies Config;
