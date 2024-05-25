// React Imports
import React from 'react';
import {US, RU, CN, KG, KZ} from 'country-flag-icons/react/3x2'

// Next Imports
import { useTranslations } from 'next-intl';

// MUI Imports
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

// Styled Components Imports
import {iconStyle} from "src/views/category/styles/styles";

// Interface Imports
import {Language} from "src/@core/interface/language/interface";

interface LanguageFilterProps {
  selectedLang: string;
  onLanguageChange: (lang: string) => void;
  languages: Language[];
}

const LanguageFilter = ({
                          selectedLang,
                          onLanguageChange,
                          languages
                        }: LanguageFilterProps) => {
  const t = useTranslations('subcategoryList');

  const handleLangChange = (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value;
    onLanguageChange(newLanguage);
  };

  return (
    <FormControl sx={{ minWidth: 250 }}>
      <InputLabel id='lang-select'>{t('selectLanguage')}</InputLabel>
      <Select
        id='select-lang'
        value={selectedLang}
        onChange={handleLangChange}
        label='Select Language'
        labelId='lang-select'
        inputProps={{ placeholder: 'Select Language' }}
        style={{ textAlign: 'left' }}
      >
        {languages?.map((lang, index) => (
          <MenuItem key={`${lang.language_code}_${index}`} value={lang.language_code} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{lang.name}</span>
            {lang.language_code === 'ru' && <RU style={{...iconStyle, float: 'right'}}/>}
            {lang.language_code === 'en' && <US style={{...iconStyle, float: 'right'}}/>}
            {lang.language_code === 'kz' && <KZ style={{...iconStyle, float: 'right'}}/>}
            {lang.language_code === 'cn' && <CN style={{...iconStyle, float: 'right'}}/>}
            {lang.language_code === 'kgz' && <KG style={{...iconStyle, float: 'right'}}/>}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageFilter;
