import { deepmerge } from '@mui/utils';
import { ThemeOptions } from '@mui/material';
import palette from './palette';
import spacing from './spacing';
import shadows from './shadows';
import breakpoints from './breakpoints';
import { ThemeColor } from 'src/@core/types';

interface LocalSettings {
  mode: 'light' | 'dark';
  themeColor: ThemeColor;
}

const themeOptions = (settings: LocalSettings): ThemeOptions => {
  const { mode, themeColor } = settings;

  const themeConfig = {
    palette: {
      ...palette(mode, themeColor),
      customColors: {
        bodyBg: '#F4F5FA',
        chatBg: '#F7F6FA',
        greyLightBg: '#FAFAFA',
        inputBorder: `rgb(var(--mui-mainColorChannels-light) / 0.22)`,
        tableHeaderBg: '#F6F7FB',
        tooltipText: '#FFFFFF',
        trackBg: '#F0F2F8',
        primaryGradient: '#FE6B8B'
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        'sans-serif',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    },
    shadows: shadows(mode),
    ...spacing,
    breakpoints: breakpoints(),
    shape: {
      borderRadius: 6
    },
    mixins: {
      toolbar: {
        minHeight: 64
      }
    }
  };

  const primaryPalette = themeConfig.palette[themeColor as keyof typeof themeConfig.palette];
  const primaryPaletteObj = typeof primaryPalette === 'object' ? primaryPalette : {};

  return deepmerge(themeConfig, {
    palette: {
      primary: {
        ...primaryPaletteObj
      }
    }
  });
};

export default themeOptions;
