// React Imports
import {useEffect, useState} from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import {axiosClassic} from "src/api/interseptor";
import {CircularProgress} from "@mui/material";

// Component Imports
import TableFilters from "src/views/category/list/filter/TableFilters";

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
} from "src/views/category/styles/styles";

// Types Imports
import {FormDataType} from "src/@core/types/category/types";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";
import {Category} from "src/@core/interface/category/interface";
import {useTranslations} from "next-intl";

type Props = {
  open: boolean
  handleClose: () => void
  fetchData: (page: number, pageSize: number) => Promise<void>;
  category: Category | null;
  languages: Language[];
  page: number;
  pageSize: number;
  showSuccessMessage: (message: string) => void;
  userProfile: User;
}

const EditCategoryDrawer = ({ userProfile, open, handleClose, fetchData, category, languages, page, pageSize, showSuccessMessage }: Props) => {
  const t = useTranslations('categoryList');

  // Состояния для данных формы
  const initialData: FormDataType = Object.fromEntries(
    languages.map((lang) => [
      lang.language_code,
      { lang_code: lang.language_code, image: '', content: { title: '', description: '' } }
    ])
  );
  const [formData, setFormData] = useState<FormDataType>(initialData);

  // Состояние для изображения категории
  const [editCategoryImage, setEditCategoryImage ] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Состояние для отображения загрузки
  const [loading, setLoading] = useState<boolean>(false);

  // Состояние для отображения сообщения о пустых полях
  const [showEmptyFieldsMessage, setShowEmptyFieldsMessage] = useState<boolean>(false);

  // Выбранный язык для редактирования
  const [selectedLang, setSelectedLang] = useState<string>(
    userProfile?.user_settings?.products_language || ''
  );

  useEffect(() => {
    if (category && category.image) {
      setPreviewImage(category.image);
    }
  }, [category]);

  useEffect(() => {
    if (category) {
      const newData: FormDataType = { ...initialData };

      const updateDataForLanguage = (langCode: string) => {
        const langData = category.translate_content.find((content) => content.lang_code === langCode) || {
          content: { title: '', description: '' },
        };

        newData[langCode] = {
          lang_code: langCode,
          content: {
            title: langData.content.title,
            description: langData.content.description,
          },
          image: category.image || '',
        };
      };

      languages.forEach((lang) => {
        updateDataForLanguage(lang.language_code);
      });

      setFormData(newData);
    } else {
      setFormData(initialData);
    }
  }, [category, open, languages]);

  const currentData = formData[selectedLang] || { title: '', description: '' };

  const handleEditImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setEditCategoryImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentLangData = formData[selectedLang];

    // Проверка на наличие заполненных полей
    if (!currentLangData.content.title && !currentLangData.content.description) {
      setShowEmptyFieldsMessage(true);

      return;
    }

    const dataToSend = { translate_content: [] };

    // Формируем данные для отправки
    Object.entries(formData).forEach(([langCode, langData]) => {
      if (langData.content.title.trim().length > 0 || langData.content.description.trim().length > 0) {
        // @ts-ignore
        dataToSend.translate_content.push({
          lang_code: langCode,
          content: langData.content
        });
      }
    });

    setLoading(true);
    let fileUploadSuccess = false;
    let createdSuccess = false;

    try {
      // Проверка и обновление токена
      const isTokenValid = await checkAndRefreshToken();

      if (!isTokenValid) {
        alert('Токен недействителен, пожалуйста, повторно авторизуйтесь.');

        return;
      }

      const categoryId = category?.id;

      // Обновляем категорию
      await axiosClassic.patch(`/category-admin?category_id=${categoryId}`, dataToSend);
      createdSuccess = true;

      const fileExtension = editCategoryImage?.name.split('.').pop()?.toLowerCase();

      // Проверка на валидность файла изображения
      if (editCategoryImage && (!fileExtension || !['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension))) {
        throw new Error(t('errorFile'));
      }

      const formDataFile = new FormData();

      if (editCategoryImage) {
        formDataFile.append('image', editCategoryImage, editCategoryImage.name);
        await axiosClassic.patch(`/category-admin/add-file?id=${categoryId}`, formDataFile, {
          headers: { 'Content-Type': 'multipart/form-data' },
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
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <StyledDiv>
        <StyledTypography variant='h5'>{t("editCategory")}</StyledTypography>
        <IconButton onClick={handleReset}>
          <i className='ri-close-line' />
        </IconButton>
      </StyledDiv>
      <Divider />
      <StyledButtonContainer className='p-5'>
        <StyledForm onSubmit={handleEditSubmit}>
          <TableFilters
            selectedLang={selectedLang}
            onLanguageChange={setSelectedLang}
            languages={languages} />
          <TextField
            label={t("title")}
            fullWidth
            value={currentData?.content?.title || ''}
            onChange={(event) =>
              setFormData((prev) => {
                const selectedLangData = prev[selectedLang] || { content: { title: '', description: '' } };

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
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label={t("description")}
            fullWidth
            value={currentData?.content?.description || ''}
            onChange={(event) =>
              setFormData((prev) => {
                const selectedLangData = prev[selectedLang] || { content: { title: '', description: '' } };

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
            <input
              type='file'
              id='image-upload-edit'
              accept='image/*'
              onChange={handleEditImageChange}
              style={{display: 'none'}}
            />
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
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={() => setPreviewImage(null)}
                >
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
            {loading && <CircularProgress />}
          </StyledButtonContainer>
        </StyledForm>
      </StyledButtonContainer>
    </StyledDrawer>
  );
};

export default EditCategoryDrawer;
