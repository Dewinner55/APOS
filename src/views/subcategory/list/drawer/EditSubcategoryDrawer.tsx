// React Imports
import React, {useEffect, useState} from 'react'

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
import LinearProgress from "@mui/material/LinearProgress";

// Component Imports
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
import {Subcategory} from "src/@core/interface/subcategory/interface";
import {Category} from "src/@core/interface/category/interface";
import LanguageFilter from "src/views/subcategory/list/filter/LanguageFilter";


type Props = {
  open: boolean
  handleClose: () => void
  fetchData: (page: number, pageSize: number) => Promise<void>;
  subcategory: Subcategory | null;
  languages: Language[];
  page: number;
  pageSize: number;
  showSuccessMessage: (message: string) => void;
  userProfile: User;
  categories: Category[];
}

const EditSubcategoryDrawer = ({
                                 categories,
                                 userProfile,
                                 open,
                                 handleClose,
                                 fetchData,
                                 subcategory,
                                 languages,
                                 page,
                                 pageSize,
                                 showSuccessMessage,
                               }: Props) => {
  const t = useTranslations('subcategoryList');
  const initialData: FormDataType = Object.fromEntries(
    languages.map((lang) => [
      lang.language_code,
      {lang_code: lang.language_code, image: '', content: {title: '', description: ''}},
    ])
  );

  const [formData, setFormData] = useState<FormDataType>(initialData);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editSubcategoryImage, setEditSubcategoryImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showEmptyFieldsMessage, setShowEmptyFieldsMessage] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<string>(
    userProfile?.user_settings?.products_language || ''
  );

  // Изменение: Сброс состояния при закрытии окна
  const resetFormState = () => {
    setFormData(initialData);
    setSelectedCategory('');
    setEditSubcategoryImage(null); // Сброс изображения
    setPreviewImage(null); // Сброс превью изображения
  };

  useEffect(() => {
    if (subcategory) {
      setSelectedCategory(subcategory.category_id);
      setPreviewImage(subcategory.image || '');
      const newData: FormDataType = {...initialData};
      const updateDataForLanguage = (langCode: string) => {
        const langData = subcategory.translate_content.find((content) => content.lang_code === langCode) || {
          content: {
            title: '',
            description: ''
          }
        };
        newData[langCode] = {
          lang_code: langCode,
          content: {title: langData.content.title, description: langData.content.description},
          image: subcategory.image || '',
        };
      };
      languages.forEach((lang) => {
        updateDataForLanguage(lang.language_code);
      });
      setFormData(newData);
    } else {
      resetFormState(); // Изменение: вызов resetFormState
    }
  }, [subcategory, open, languages]);

  const currentData = formData[selectedLang] || {title: '', description: ''};

  const handleEditImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setEditSubcategoryImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentLangData = formData[selectedLang];

    // Проверяем, что хотя бы одно из полей не пустое
    if (!currentLangData.content.title && !currentLangData.content.description) {
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
    const dataToSend = {translate_content: []};
    Object.entries(formData).forEach(([langCode, langData]) => {
      if (langData.content.title.trim().length > 0 || langData.content.description.trim().length > 0) {
        // @ts-ignore
        dataToSend.translate_content.push({lang_code: langCode, content: langData.content});
      }
    });

    setLoading(true);
    let fileUploadSuccess = false;
    let createdSuccess = false;

    try {
      const subcategoryId = subcategory?.id;

      // Патчинг данных контента
      await axiosClassic.patch(`/subcategory-admin?subcategory_id=${subcategoryId}`, dataToSend);
      createdSuccess = true;

      if (editSubcategoryImage) {
        const fileExtension = editSubcategoryImage?.name.split('.').pop()?.toLowerCase();
        if (!fileExtension || !['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
          throw new Error(t('errorFile'));
        }

        const formDataFile = new FormData();
        formDataFile.append('image', editSubcategoryImage, editSubcategoryImage.name);
        await axiosClassic.patch(`/subcategory-admin/add_file?id=${subcategoryId}`, formDataFile, {
          headers: {'Content-Type': 'multipart/form-data'}
        });
        fileUploadSuccess = true;
      }
    } catch (error) {
      console.error(t('errorUpdate'), error);
    } finally {
      setLoading(false);
      if (fileUploadSuccess || createdSuccess) {
        showSuccessMessage(t("successUpdate"));
        await fetchData(page, pageSize);
        resetFormState(); // Изменение: вызов resetFormState для сброса формы
        handleClose();
      }
    }
  }

  const handleReset = () => {
    resetFormState(); // Изменение: вызов resetFormState
    handleClose();
  };

  return (
    <StyledDrawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset} // Изменение: привязка метода handleReset к onClose
      ModalProps={{keepMounted: true}}
      sx={{'& .MuiDrawer-paper': {width: {xs: 300, sm: 400}}}}
    >
      <StyledDiv>
        <StyledTypography variant='h5'>{t("editCategory")}</StyledTypography>
        <IconButton onClick={handleReset}>
          <i className='ri-close-line'/>
        </IconButton>
      </StyledDiv>
      <Divider/>
      {loading && <LinearProgress/>}
      <StyledButtonContainer className='p-5'>
        <StyledForm onSubmit={handleEditSubmit}>
          <LanguageFilter
            selectedLang={selectedLang}
            onLanguageChange={setSelectedLang}
            languages={languages}
          />
          <SubcategoryFilters selectedLang={selectedLang} categories={categories} selectedCategory={selectedCategory}
                           setSelectedCategory={setSelectedCategory} selectStyle={{textAlign: 'left', width: '100%'}}/>
          <TextField
            label={t("title")}
            fullWidth
            value={currentData?.content?.title || ''}
            onChange={(event) =>
              setFormData((prev) => {
                const selectedLangData = prev[selectedLang] || {content: {title: '', description: ''}};

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
            onChange={(event) =>
              setFormData((prev) => {
                const selectedLangData = prev[selectedLang] || {content: {title: '', description: ''}};

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
            <input type='file' id='image-upload-edit' accept='image/*' onChange={handleEditImageChange}
                   style={{display: 'none'}}/>
            <label htmlFor='image-upload-edit' style={{width: '100%', textAlign: 'center'}}>
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
                  cursor: 'pointer',
                }}
              >
                {previewImage ? (
                  <img
                    key={previewImage}
                    src={previewImage}
                    alt='Uploaded'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  />
                ) : (
                  t('addImage')
                )}
              </Button>
            </label>
            {previewImage && (
              <div style={{textAlign: 'center', marginTop: '10px'}}>
                **Изменение: сброс состояния при удалении изображения**
                <Button variant='outlined' color='primary' onClick={() => {
                  setEditSubcategoryImage(null);
                  setPreviewImage(null);
                }}>
                  {t('removeImage')}
                </Button>
              </div>
            )}
          </FormControl>
          <StyledButtonContainer style={{display: 'flex'}}>
            <StyledButton variant='contained' type='submit'>
              {t('Edit')}
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
          </StyledButtonContainer>
        </StyledForm>
      </StyledButtonContainer>
    </StyledDrawer>
  );
};

export default EditSubcategoryDrawer;
