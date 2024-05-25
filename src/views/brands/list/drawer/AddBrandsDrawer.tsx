// React Imports
import {useState} from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import {axiosClassic} from "src/api/interseptor";
import {CircularProgress} from "@mui/material";

// Filters Imports
import TableFilters from "src/views/brands/list/filter/TableFilters";

// Styled Components Imports
import {
  StyledButton,
  StyledButtonContainer,
  StyledDiv,
  StyledDrawer,
  StyledForm,
  StyledSnackbar,
  StyledTypography
} from "src/views/brands/styles/styles";

// Types Imports
import {FormDataType} from "src/@core/types/brands/types";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";
import {useTranslations} from "next-intl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {knownBrands} from "src/views/brands/logoBrand/logoBrand";
import Typography from "@mui/material/Typography";


type Props = {
  open: boolean
  handleClose: () => void
  fetchData: (page: number, pageSize: number) => Promise<void>;
  languages: Language[];
  userProfile: User;
  page: number;
  pageSize: number;
  showSuccessMessage: (message: string) => void;
}

const AddBrandsDrawer = ({ open, handleClose, fetchData, languages, userProfile, page, pageSize, showSuccessMessage }: Props) => {
  const t = useTranslations('categoryList');

  const initialData: FormDataType = Object.fromEntries(
    languages.map((lang) => [
      lang.language_code,
      { lang_code: lang.language_code, icon: '', content: { name: '', description: '' } }
    ])
  );

  const [formData, setFormData] = useState<FormDataType>(initialData);
  const [selectedLang, setSelectedLang] = useState<string>(
    userProfile?.user_settings?.products_language || ''
  );
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [showEmptyFieldsMessage, setShowEmptyFieldsMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const currentData = formData[selectedLang];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentLangData = formData[selectedLang];

    if (!selectedLang || !currentLangData || !currentLangData.content || (!currentLangData.content.name && !currentLangData.content.description)) {
      setShowEmptyFieldsMessage(true);

      return;
    }

    const dataToSend = {
      translate_content: [],
      icon: selectedBrand
    };

    Object.entries(formData).forEach(([langCode, langData]) => {
      if (langData.content.name.trim().length > 0 || langData.content.description.trim().length > 0) {
        dataToSend.translate_content.push({ lang_code: langCode, content: langData.content });
      }
    });

    setLoading(true);

    try {
      await axiosClassic.post('/brand-admin', dataToSend);
      setFormData(initialData);
      showSuccessMessage(t("successCreated"));
      await fetchData(page, pageSize);
      handleClose();
    } catch (error) {
      console.error(t('errorCreated'), error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setSelectedBrand('');
    handleClose();
  };

  const handleBrandSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedBrand = event.target.value as string;
    setSelectedBrand(selectedBrand);
    const selectedBrandImage = knownBrands[selectedBrand] || '';

    setFormData((prev) => ({
      ...prev,
      [selectedLang]: {
        ...prev[selectedLang],
        icon: selectedBrandImage,
        content: {
          ...prev[selectedLang].content,
          name: selectedBrand,
        },
      },
    }));
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    const selectedBrandImage = knownBrands[selectedBrand] || '';

    setFormData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        icon: selectedBrandImage,
      },
    }));
  };

  return (
    <StyledDrawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <StyledDiv>
        <StyledTypography variant='h5'>{t("addNewCategory")}</StyledTypography>
        <IconButton onClick={handleReset}>
          <i className='ri-close-line' />
        </IconButton>
      </StyledDiv>
      <Divider />
      <StyledButtonContainer className='p-5'>
        <StyledForm onSubmit={handleSubmit}>
          <TableFilters
            selectedLang={selectedLang}
            onLanguageChange={handleLanguageChange}
            languages={languages}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Select
              value={selectedBrand}
              onChange={handleBrandSelect}
              displayEmpty
            >
              <MenuItem value="">
                <em>{t('selectBrand')}</em>
              </MenuItem>
              {Object.keys(knownBrands).map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label={t("name")}
            fullWidth
            value={currentData?.content?.name || ''}
            onChange={event =>
              setFormData(prev => {
                const selectedLangData = prev[selectedLang] || { content: {} };

                return {
                  ...prev,
                  [selectedLang]: {
                    ...selectedLangData,
                    content: {
                      ...selectedLangData.content,
                      name: event.target.value,
                    },
                  },
                };
              })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label={t("description")}
            fullWidth
            value={currentData?.content?.description || ''}
            onChange={event =>
              setFormData(prev => {
                const selectedLangData = prev[selectedLang] || { content: {} };

                return {
                  ...prev,
                  [selectedLang]: {
                    ...selectedLangData,
                    content: {
                      ...selectedLangData.content,
                      description: event.target.value,
                    },
                  },
                };
              })
            }
            sx={{ marginBottom: 2 }}
          />
          <FormControl fullWidth>
            <div
              style={{
                width: '100%',
                height: '250px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px dashed grey',
              }}
            >
              {currentData.icon ? (
                <img
                  src={currentData.icon}
                  alt='Brand'
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Typography variant='subtitle1'>
                  {t('noImage')}
                </Typography>
              )}
            </div>
          </FormControl>
          <StyledButtonContainer style={{ 'display': 'flex' }}>
            <StyledButton variant='contained' type='submit'>
              {t('Created')}
            </StyledButton>
            <StyledButton variant='outlined' color='error' type='reset' onClick={handleReset}>
              {t('Cancel')}
            </StyledButton>
            <StyledSnackbar
              open={showEmptyFieldsMessage}
              autoHideDuration={6000}
              onClose={() => setShowEmptyFieldsMessage(false)}
              message={t("empty")}
            />
            {loading && <CircularProgress />}
          </StyledButtonContainer>
        </StyledForm>
      </StyledButtonContainer>
    </StyledDrawer>
  );
};

export default AddBrandsDrawer;
