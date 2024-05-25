// Расширение типов Palette и PaletteOptions для MUI
import { Palette, PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    customColors: {
      bodyBg: string;
      chatBg: string;
      greyLightBg: string;
      inputBorder: string;
      tableHeaderBg: string;
      tooltipText: string;
      trackBg: string;
      primaryGradient: string;
    };
  }

  interface PaletteOptions {
    customColors?: {
      bodyBg?: string;
      chatBg?: string;
      greyLightBg?: string;
      inputBorder?: string;
      tableHeaderBg?: string;
      tooltipText?: string;
      trackBg?: string;
    };
  }
}
