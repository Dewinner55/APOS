type PaletteMode = 'light' | 'dark';

interface UserSettings {
  theme?: PaletteMode;
  system_language: string;
  products_language: string;
}

export interface User {
  user_settings?: UserSettings;
  email: string;
  first_name?: string;
  display_name?: string;
  created_at?: string;
  iat?: number;
}
