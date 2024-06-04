'use client'

// React Imports
import { useRef, useState } from 'react'

// Next Imports

// MUI Imports
import IconButton from '@mui/material/IconButton'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'

// Type Imports


// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

import { US, RU, KG, TR } from 'country-flag-icons/react/3x2'
import CircularProgress from "@mui/material/CircularProgress";
import {useRouter} from "next/router";

type LanguageDataType = {
  langCode: string;
  langName: string;
  countryCode: string;
};

// Vars
const languageData: LanguageDataType[] = [
  { langCode: 'en', langName: 'English', countryCode: 'gb' },
  { langCode: 'ru', langName: 'Russian', countryCode: 'ru' },
  { langCode: 'kgz', langName: 'Kyrgyzstan', countryCode: 'kg' },
  { langCode: 'ty', langName: 'Turkey', countryCode: 'tr' }
];

const LanguageLending = () => {
  // States
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { locale } = router;

  // Refs
  const anchorRef = useRef<HTMLButtonElement>(null);

  // Hooks
  const { settings } = useSettings();

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleLocaleChange = (newLocale: string) => {
    setIsLoading(true);
    router.push(router.asPath, router.asPath, { locale: newLocale }).then(() => {
      setIsLoading(false);
      setOpen(false);
    });
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleToggle}
      >
        <i className='ri-translate-2' />
      </IconButton>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-start'
        anchorEl={anchorRef.current}
        className='min-is-[160px] !mbs-4 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top' }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList onKeyDown={handleClose}>
                  {languageData.map(language => (
                    <MenuItem
                      key={language.langCode}
                      onClick={() => handleLocaleChange(language.langCode)}
                      selected={locale === language.langCode}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                      {language.langCode === 'en' && <US title="United States" style={{ marginRight: 10, width: '24px' }} />}
                      {language.langCode === 'ru' && <RU title="Russia" style={{ marginRight: 10, width: '24px' }} />}
                      {language.langCode === 'kgz' && <KG title="Kyrgyzstan" style={{ marginRight: 10, width: '24px' }} />}
                      {language.langCode === 'ty' && <TR title="Turkey" style={{ marginRight: 10, width: '24px' }} />}
                      {language.langName}
                      {isLoading && locale === language.langCode && <CircularProgress size={24} style={{ marginLeft: 10, color: 'inherit' }} />}
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

export default LanguageLending;
