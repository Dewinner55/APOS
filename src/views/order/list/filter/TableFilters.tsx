// React Imports
import {US, RU, CN, KG, KZ} from 'country-flag-icons/react/3x2'

// MUI Imports
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import {capitalize, SelectChangeEvent} from '@mui/material';

// Styled Components Imports
import {iconStyle} from "src/views/order/styles/styles";

// Interface Imports
import {Language} from "src/@core/interface/language/interface";
import {useTranslations} from "next-intl";

interface Props {
  selectedLang: string;
  onLanguageChange: (lang: string) => void;
  languages: Language[];
}

const TableFilters = ({ selectedLang, onLanguageChange, languages }: Props) => {
  const t = useTranslations('categoryList');

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value;
    onLanguageChange(newLanguage);
  };

  return (
    <FormControl fullWidth sx={{marginBottom: 2}}>
      <InputLabel id='lang-select'>{t('selectLanguage')}</InputLabel>
      <Select
        fullWidth
        id='select-lang'
        value={selectedLang}
        onChange={handleSelectChange}
        label='Select Language'
        labelId='lang-select'
        inputProps={{placeholder: 'Select Language'}}
        style={{textAlign: 'left', width: '200px'}}
      >
        {languages?.map((lang, index) => (
          <MenuItem key={`${lang.language_code}_${index}`} value={lang.language_code}
                    style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>{capitalize(lang.name)}</span>
            {lang.language_code === 'ru' ? <RU style={{...iconStyle, float: 'right'}}/> :
              lang.language_code === 'en' ? <US style={{...iconStyle, float: 'right'}}/> :
                lang.language_code === 'kz' ? <KZ style={{...iconStyle, float: 'right'}}/> :
                  lang.language_code === 'cn' ? <CN style={{...iconStyle, float: 'right'}}/> :
                    lang.language_code === 'kgz' && <KG style={{...iconStyle, float: 'right'}}/>}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

  );
};

export default TableFilters;
