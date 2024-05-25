'use client'

// React Imports
import {useRef, useState} from 'react'

// Next Imports
import {useRouter} from 'next/router';

// MUI Imports
import IconButton from '@mui/material/IconButton'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import Translate from 'mdi-material-ui/Translate';
import CircularProgress from '@mui/material/CircularProgress';

// Type Imports
import {useSettings} from "../../../hooks/useSettings";
import {axiosClassic} from "../../../../api/interseptor";

import { US, RU, KG, TR } from 'country-flag-icons/react/3x2'

type LanguageDataType = {
  langCode: string
  langName: string
  countryCode: string
}

// Vars
const languageData: LanguageDataType[] = [
  { langCode: 'en', langName: 'English', countryCode: 'gb' },
  { langCode: 'ru', langName: 'Russian', countryCode: 'ru' },
  { langCode: 'kgz', langName: 'Kyrgyzstan', countryCode: 'kg' },
  { langCode: 'ty', langName: 'Turkey', countryCode: 'ty' }
]

const LanguageDropdown = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { settings } = useSettings();

  const handleClose = () => setOpen(false);
  const handleToggle = () => setOpen(prevOpen => !prevOpen);

  const [isLoading, setIsLoading] = useState(false);
  const [lastClicked, setLastClicked] = useState(Date.now());

  const handleLocaleChange = async (langCode: string) => {
    const now = Date.now();
    if (isLoading || now - lastClicked < 1000) return; // Debounce requests to once per second

    setLastClicked(now);
    setIsLoading(true);

    try {
      const response = await axiosClassic.patch('/auth/user-settings', {
        system_language: langCode
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('langCode updated:', response.data);

      if (response.status === 200 || response.status === 201) {

        const systemResponse = await fetch('/api/updateSystemLanguages', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ system_language: langCode }),
        });

        if (systemResponse.ok) {
          window.location.href = `/api/changeLanguages?currentUrl=${encodeURIComponent(window.location.href)}`;
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleToggle} style={{ color: 'inherit' }}>
        <Translate /> {/* Используем иконку Translate */}
      </IconButton>
      <Popper open={open} transition disablePortal placement="bottom-start" anchorEl={anchorRef.current} style={{ minWidth: '160px', marginBottom: '4px', zIndex: 1 }}>
        {({ TransitionProps, placement }) => (
          <Fade {...TransitionProps} style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top' }}>
            <Paper style={{ border: settings.skin === 'bordered' ? '1px solid' : 'none', boxShadow: '0px 2px 10px rgba(0,0,0,0.1)' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList onKeyDown={handleClose}>
                  {languageData.map(locale => (
                    <MenuItem
                      key={locale.langCode}
                      onClick={() => handleLocaleChange(locale.langCode)}
                      selected={router.locale === locale.langCode}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                      {locale.langCode === 'en' && <US title="United States" style={{ marginRight: 10, width: '24px' }} />}
                      {locale.langCode === 'ru' && <RU title="Russia" style={{ marginRight: 10, width: '24px' }} />}
                      {locale.langCode === 'kgz' && <KG title="Kyrgyzstan" style={{ marginRight: 10, width: '24px' }} />}
                      {locale.langCode === 'ty' && <TR title="Turkey" style={{ marginRight: 10, width: '24px' }} />}
                      {locale.langName}
                      {isLoading && router.locale === locale.langCode && <CircularProgress size={24} style={{ marginLeft: 10, color: 'inherit' }} />}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default LanguageDropdown;
