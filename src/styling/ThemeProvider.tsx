import resolveConfig from 'tailwindcss/resolveConfig';
import config from '@src/../tailwind.config';
import React, { useContext } from 'react';
import { Theme } from './StylingTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tailwindConfig = resolveConfig(config as any);

type ThemeContextValue = Theme;

const ThemeContext = React.createContext({} as ThemeContextValue);

export const useTheme = () => {
  return useContext(ThemeContext);
};

type ThemeProviderProps = React.PropsWithChildren<{}>;

function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={tailwindConfig.theme as Theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
