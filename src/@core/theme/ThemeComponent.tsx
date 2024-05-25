// ** React Imports

// ** MUI Imports
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'

// ** Type Imports
import {SettingsContext} from 'src/@core/context/settingsContext'

// ** Theme Config


// ** Theme Override Imports


// ** Theme

// ** Global Styles

import themeOptions from "./ThemeOptions";
import {useContext, useEffect} from "react";


interface ThemeComponentProps {
  children: React.ReactNode;
}

const ThemeComponent: React.FC<ThemeComponentProps> = ({ children }) => {
  // Использование контекста для получения текущих настроек темы
  const { settings } = useContext(SettingsContext);

  // Создание объекта темы с использованием текущих настроек
  let theme = createTheme(themeOptions(settings));

  // Применение адаптивных размеров шрифтов, если это включено в настройках
  if (settings.contentWidth === 'responsive') {
    theme = responsiveFontSizes(theme);
  }

  // Обновление класса корневого элемента при изменении темы
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${settings.mode}`);
  }, [settings.mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeComponent;
