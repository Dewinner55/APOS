// React Imports
import React, {useState} from 'react'

// Next Imports
import {useTranslations} from "next-intl";

// Axios API
import {axiosClassic} from "src/api/interseptor";

// MUI Imports
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import {CircularProgress} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Filters Imports
import CategoryFilter from "src/views/subcategory/list/filter/CategoryFilter";
import SubcategoryFilters from "src/views/subcategory/list/filter/SubcategoryFilters";

// SSR Imports
import {checkAndRefreshToken} from "src/@core/SSR/cookie/getTokenExpiry";

// Styled Components Imports
import {
  StyledButton,
  StyledButtonContainer,
  StyledDiv,
  StyledDrawer,
  StyledForm,
  StyledSnackbar,
  StyledTypography
} from "src/views/subcategory/styles/styles";

// Types Imports
import {FormDataType} from "src/@core/types/subcategory/types";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";
import {Category} from "src/@core/interface/category/interface";
import LanguageFilter from "src/views/subcategory/list/filter/LanguageFilter";

type Props = {
  open: boolean
  handleClose: () => void
  fetchData: (page: number, pageSize: number) => Promise<void>;
  languages: Language[];
  userProfile: User;
  page: number;
  pageSize: number;
  showSuccessMessage: (message: string) => void;
  categories: Category[];
}

const AddProductDrawer = ({
                                categories,
                                open,
                                handleClose,
                                fetchData,
                                languages,
                                userProfile,
                                page,
                                pageSize,
                                showSuccessMessage
                              }: Props) => {
  const t = useTranslations('subcategoryList');

  // Состояния для данных формы
  const initialData: FormDataType = Object.fromEntries(
    languages.map((lang) => [
      lang.language_code,
      {lang_code: lang.language_code, image: '', content: {title: '', description: ''}}
    ])
  )

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Состояния для данных формы
  const [formData, setFormData] = useState<FormDataType>(initialData);
  const [selectedLang, setSelectedLang] = useState<string>(
    userProfile?.user_settings?.products_language || ''
  );
  const [image, setImage] = useState<File | null>(null);
  const currentData = formData[selectedLang];

  // Состояния для отображения сообщения о пустых полях
  const [showEmptyFieldsMessage, setShowEmptyFieldsMessage] = useState<boolean>(false);

  // Состояние для отображения загрузки
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentLangData = formData[selectedLang];

    // Проверяем, что язык выбран и хотя бы одно из полей не пустое
    if (!selectedLang || !currentLangData || !currentLangData.content || (!currentLangData.content.title && !currentLangData.content.description)) {
      setShowEmptyFieldsMessage(true);

      return;
    }

    // Проверка токена
    try {
      const isTokenValid = await checkAndRefreshToken();
      if (!isTokenValid) {
        alert('Токен недействителен. Пожалуйста, войдите снова.');
        setLoading(false);

        return;
      }
    } catch (tokenError) {
      console.error('Ошибка проверки токена:', tokenError);
      alert('Произошла ошибка при проверке токена. Пожалуйста, попробуйте еще раз.');
      setLoading(false);

      return;
    }

    // Формируем данные для отправки
    const dataToSend = { translate_content: [], category_id: selectedCategory };
    Object.entries(formData).forEach(([langCode, langData]) => {
      if (langData.content.title.trim().length > 0 || langData.content.description.trim().length > 0) {
        // @ts-ignore
        dataToSend.translate_content.push({ lang_code: langCode, content: langData.content });
      }
    });

    setLoading(true);
    let fileUploadSuccess = false;
    let createdSuccess = false;

    try {
      const response = await axiosClassic.post('/subcategory-admin', dataToSend);
      const subcategoryId = response.data.id;
      createdSuccess = true;

      // Проверка расширения файла
      const fileExtension = image?.name.split('.').pop()?.toLowerCase();
      if (image && (!fileExtension || !['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension))) {
        throw new Error(t('errorFile'));
      }

      // Загрузка файла, если image не равен null или undefined
      const formDataFile = new FormData();
      if (image) {
        formDataFile.append('image', image, image.name);
        await axiosClassic.patch(`/subcategory-admin/add_file?id=${subcategoryId}`, formDataFile, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        fileUploadSuccess = true;
      }

      setFormData({});
    } catch (error) {
      console.error(t('errorCreated'), error);
    } finally {
      setLoading(false);
      if (fileUploadSuccess || createdSuccess) {
        showSuccessMessage(t("successCreated"));
        await fetchData(page, pageSize);
        handleClose();
      }
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    handleClose();
  };

  return (
    <StyledDrawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{keepMounted: true}}
      sx={{'& .MuiDrawer-paper': {width: {xs: 300, sm: 400}}}}
    >
      <StyledDiv>
        <StyledTypography variant='h5'>{t("addNewCategory")}</StyledTypography>
        <IconButton onClick={handleReset}>
          <i className='ri-close-line'/>
        </IconButton>
      </StyledDiv>
      <Divider/>
      {loading && <LinearProgress/>}
      <StyledButtonContainer className='p-5'>
        <StyledForm onSubmit={handleSubmit}>
          <LanguageFilter
            selectedLang={selectedLang}
            onLanguageChange={setSelectedLang}
            languages={languages}
          />
          <SubcategoryFilters
            selectedLang={selectedLang}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectStyle={{textAlign: 'left', width: '100%'}}
          />
          <TextField
            label={t("title")}
            fullWidth
            value={currentData?.content?.title || ''}
            onChange={event =>
              setFormData(prev => {
                const selectedLangData = prev[selectedLang] || {content: {}};

                return {
                  ...prev,
                  [selectedLang]: {
                    ...selectedLangData,
                    content: {
                      ...selectedLangData.content,
                      title: event.target.value,
                    },
                  },
                };
              })
            }
            sx={{marginBottom: 2}}
          />
          <TextField
            label={t("description")}
            fullWidth
            value={currentData?.content?.description || ''}
            onChange={event =>
              setFormData(prev => {
                const selectedLangData = prev[selectedLang] || {content: {}};

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
            sx={{marginBottom: 2}}
          />
          <FormControl fullWidth>
            <input
              type='file'
              id='image-upload-add'
              accept='image/*'
              onChange={handleImageChange}
              style={{display: 'none'}}
            />
            <label htmlFor='image-upload-add' style={{width: '100%', textAlign: 'center'}}>
              <Button
                component='span'
                variant='outlined'
                color='primary'
                style={{
                  width: '100%',
                  height: '250px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt='Uploaded'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                  />
                )}
                {!image && t('addImage')}
              </Button>
            </label>
            {image && (
              <div style={{textAlign: 'center', marginTop: '10px'}}>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={() => setImage(null)}
                >
                  {t('removeImage')}
                </Button>
              </div>
            )}
          </FormControl>
          <StyledButtonContainer style={{'display': 'flex'}}>
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
            {loading && <CircularProgress/>}
          </StyledButtonContainer>
        </StyledForm>
      </StyledButtonContainer>
    </StyledDrawer>
  );
};

export default AddProductDrawer;
