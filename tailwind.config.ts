import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const gray = colors.slate;

export default {
  // To make Tailwind work with `next-themes`.
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          hover: 'hsl(var(--primary-hover) / <alpha-value>)',
          active: 'hsl(var(--primary-active) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          hover: 'hsl(var(--accent-hover) / <alpha-value>)',
          active: 'hsl(var(--accent-active) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        success: 'hsl(var(--success) / <alpha-value>)',
        error: 'hsl(var(--error) / <alpha-value>)',
        overlay: 'hsl(var(--overlay) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        // TODO: Change these scrollbar colors too
        scrollbar: {
          thumb: gray[500],
          'thumb-hover': gray[400],
        },
      },
      spacing: {
        'app-header': defaultTheme.spacing[16],
      },
      // https://tailwindcss.com/docs/hover-focus-and-other-states#aria-states
      aria: {
        invalid: 'invalid="true"',
      },
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
