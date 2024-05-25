// ** MUI Imports
import { PaletteMode } from '@mui/material'

// ** Types
import { ContentWidth } from 'src/@core/layouts/types'

// ** interface Import
import {User} from "src/@core/interface/user/interface";

// ** Theme configuration type
export type ThemeConfig = {
  mode: PaletteMode;
  templateName: string;
  routingLoader: boolean;
  disableRipple: boolean;
  navigationSize: number;
  menuTextTruncate: boolean;
  contentWidth: ContentWidth;
  responsiveFontSizes: boolean;
};

// ** Function to create theme config from user settings
export const getThemeConfig = (user?: User): ThemeConfig => {
  const theme = user?.user_settings?.theme || 'light'; // Значение по умолчанию, если тема не задана

  return {
    templateName: 'Global Joy',
    mode: theme,
    contentWidth: 'boxed',
    routingLoader: true,
    menuTextTruncate: true,
    navigationSize: 260,
    responsiveFontSizes: true,
    disableRipple: false
  };
};

export default getThemeConfig;
