// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import {CircularProgress, PaletteMode} from '@mui/material'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import WeatherNight from 'mdi-material-ui/WeatherNight'
import WeatherSunny from 'mdi-material-ui/WeatherSunny'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'
import {axiosClassic} from "../../../../api/interseptor";

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

const ModeToggler = (props: Props) => {
  const { settings, saveSettings } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [lastClicked, setLastClicked] = useState(Date.now());

  const handleModeChange = (mode: PaletteMode) => {
    saveSettings({ ...settings, mode });
  };

  const handleModeToggle = async () => {
    const now = Date.now();
    if (isLoading || now - lastClicked < 1000) return; // Debounce requests to once per second

    setLastClicked(now);
    const currentMode = settings.mode;
    const newMode = currentMode === 'light' ? 'dark' : 'light';

    handleModeChange(newMode);
    setIsLoading(true);

    try {
      const response = await axiosClassic.patch('/auth/user-settings', { theme: newMode }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        const profileResponse = await fetch('/api/updateThemeSettings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ theme: newMode })
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error) {
      console.error('Error:', error);
      handleModeChange(currentMode);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <IconButton color="inherit" aria-haspopup="true" onClick={handleModeToggle} disabled={isLoading}>
      {isLoading ? <CircularProgress size={24} /> : (settings.mode === 'light' ? <WeatherSunny /> : <WeatherNight />)}
    </IconButton>
  )
}

export default ModeToggler
