import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

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
        danger: {
          DEFAULT: 'hsl(var(--danger) / <alpha-value>)',
          hover: 'hsl(var(--danger-hover) / <alpha-value>)',
          active: 'hsl(var(--danger-active) / <alpha-value>)',
          foreground: 'hsl(var(--danger-foreground) / <alpha-value>)',
        },
        scrollbar: {
          thumb: 'hsl(var(--scrollbar-thumb) / <alpha-value>)',
          'thumb-hover': 'hsl(var(--scrollbar-thumb-hover) / <alpha-value>)',
        },
        success: 'hsl(var(--success) / <alpha-value>)',
        error: 'hsl(var(--error) / <alpha-value>)',
        overlay: 'hsl(var(--overlay) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        favorite: 'hsl(var(--favorite) / <alpha-value>)',
      },
      // https://tailwindcss.com/docs/hover-focus-and-other-states#aria-states
      aria: {
        invalid: 'invalid="true"',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/unbound-method
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'grid-cols-autofill': (value: string) => {
            return {
              gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${value}), 1fr))`,
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
