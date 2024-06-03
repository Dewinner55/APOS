// ** React Imports
import { createContext, useState, ReactNode } from 'react'

// ** MUI Imports
import { PaletteMode } from '@mui/material'

// ** ThemeConfig Import
import themeConfig from "../../configs/themeConfig";

// ** Types Import
import { ThemeColor, ContentWidth } from 'src/@core/layouts/types'
import {User} from "../interface/user/interface";

export type Settings = {
  mode: PaletteMode;
  themeColor: ThemeColor;
  contentWidth: ContentWidth;
  skin: 'bordered' | 'none';
}

export type SettingsContextValue = {
  settings: Settings;
  saveSettings: (updatedSettings: Settings) => void;
}

interface Props {
  userContext: User;
  children: ReactNode;
}

// ** Create Context with a placeholder initial value
export const SettingsContext = createContext<SettingsContextValue>({
  settings: { mode: 'light', themeColor: 'primary', contentWidth: 'boxed', skin: 'none' },
  saveSettings: () => null,
});

export const SettingsProvider = ({ userContext, children }: Props) => {
  const config = themeConfig(userContext);

  const initialSettings: Settings = {
    themeColor: 'primary',
    mode: config.mode,
    contentWidth: config.contentWidth,
    skin: 'none'
  };

  const [settings, setSettings] = useState<Settings>({ ...initialSettings });

  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
