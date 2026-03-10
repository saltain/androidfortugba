import React, { createContext, useContext, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  colors: {
    bg: string;
    text: string;
    muted: string;
    border: string;
    cardBg: string;
  };
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
  colors: {
    bg: '#0A0E27',
    text: '#FAFAF8',
    muted: 'rgba(250,250,248,0.5)',
    border: 'rgba(250,250,248,0.15)',
    cardBg: 'rgba(250,250,248,0.07)',
  },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  const colors = theme === 'dark'
    ? {
        bg: '#0A0E27',
        text: '#FAFAF8',
        muted: 'rgba(250,250,248,0.5)',
        border: 'rgba(250,250,248,0.15)',
        cardBg: 'rgba(250,250,248,0.07)',
      }
    : {
        bg: '#FAFAF8',
        text: '#0A0E27',
        muted: 'rgba(10,14,39,0.5)',
        border: 'rgba(10,14,39,0.15)',
        cardBg: 'rgba(10,14,39,0.06)',
      };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
