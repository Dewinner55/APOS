import { useState } from 'react';
import {PaletteMode} from "@mui/material";
import { createTheme } from '@mui/material/styles';
import Cookies from 'js-cookie';

export const useThemeMode = (initialMode: PaletteMode) => {
  const [mode, setMode] = useState<PaletteMode>(initialMode);
  const theme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    Cookies.set('theme', newMode, { expires: 365 });
  };

  return { mode, toggleColorMode, theme };
};
