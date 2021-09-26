import { TailwindConfig } from 'tailwindcss/tailwind-config';

export type Theme = TailwindConfig['theme'] & {
  colors: TailwindConfig['theme']['colors'] & {
    primary: {
      darker: string;
      dark: string;
      main: string;
      light: string;
      lighter: string;
    };
    secondary: {
      darker: string;
      dark: string;
      main: string;
      light: string;
      lighter: string;
    };
    background: {
      dark: string;
      main: string;
    };
    text: {
      main: string;
      light: string;
      lighter: string;
      contrast: string;
    };
    success: {
      dark: string;
      main: string;
      light: string;
      lighter: string;
    };
    error: {
      dark: string;
      main: string;
      light: string;
      lighter: string;
    };
    disabled: {
      dark: string;
      main: string;
    };
    overlay: {
      main: string;
      light: string;
    };
    scrollbar: {
      thumb: string;
      thumbHover: string;
    };
  };
};
