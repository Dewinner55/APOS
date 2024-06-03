import { useState, useEffect } from 'react';
import {PaletteMode} from "@mui/material";
import { createTheme } from '@mui/material/styles';
import Cookies from 'js-cookie';

export const useThemeMode = (initialMode: PaletteMode = 'light') => {
  const [mode, setMode] = useState<PaletteMode>(initialMode);
  const theme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    Cookies.set('theme', newMode, { expires: 365 });
  };

  useEffect(() => {
    const storedTheme = Cookies.get('theme') as PaletteMode;
    if (storedTheme) {
      setMode(storedTheme);
    }
  }, []);

  return { mode, toggleColorMode, theme };
};
