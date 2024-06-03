'use client'

// React Imports
import {useEffect, useState} from 'react'

// Next Imports
import {useRouter} from "next/router";

// Axios API
import {axiosClassic} from "src/api/interseptor";

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FormControl from "@mui/material/FormControl";
import {DialogContentText} from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

// Filters Imports
import TableFilters from "src/views/category/list/filter/TableFilters";

// Types Imports
import {FormDataType} from "src/@core/types/category/types";

// Interface Imports
import {Category} from "src/@core/interface/category/interface";
import {Language} from "src/@core/interface/language/interface";
import {StyledSnackbar} from "src/views/category/styles/styles";
import {useTranslations} from "next-intl";

type Props = {
  category: Category;
  languages: Language[];
  open: boolean
  setOpen: (open: boolean) => void
  showSuccessMessage: (message: string) => void;
}

const EditCategoryInfo = ({ category, languages, open, setOpen, showSuccessMessage }: Props) => {
  const t = useTranslations('categoryList');
  const router = useRouter();

  // Состояние для данных формы
  const initialData: FormDataType = Object.fromEntries(
    languages.map((lang) => [
      lang.language_code,
      { lang_code: lang.language_code, image: '', content: { title: '', description: '' } }
    ])
  );
  const [formData, setFormData] = useState<FormDataType>(initialData);

  // Состояние для изображения категории
  const [editCategoryImage, setEditCategoryImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Состояние для отображения загрузки
  const [loading, setLoading] = useState<boolean>(false);

  // Состояния сообщения
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showEmptyFieldsMessage, setShowEmptyFieldsMessage] = useState<boolean>(false);

  // Состояние для выбранного языка
  const [selectedLang, setSelectedLang] = useState<string>('ru');

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

    // Проверяем, что хотя бы одно из полей не пустое
    if (!currentLangData.content.title && !currentLangData.content.description) {
      setShowEmptyFieldsMessage(true);

      return;
    }

    // Формируем данные для отправки
    const dataToSend = {
      translate_content: []
    };

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
      // Передаем ID категории в URL
      const categoryId = category?.id;
      await axiosClassic.patch(`/category-admin?category_id=${categoryId}`, dataToSend);
      createdSuccess = true;

      // Проверка расширения файла
      const fileExtension = editCategoryImage?.name.split('.').pop()?.toLowerCase();
      if (editCategoryImage && (!fileExtension || !['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension))) {
        throw new Error(t('errorFile'));
      }

      // Загрузка файла, если editCategoryImage не равен null или undefined
      const formDataFile = new FormData();
      if (editCategoryImage) {
        formDataFile.append('image', editCategoryImage, editCategoryImage.name);
        await axiosClassic.patch(`/category-admin/add-file?id=${categoryId}`, formDataFile, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        fileUploadSuccess = true;
      }
    } catch (error) {
      console.error(t('errorUpdate'), error);
    } finally {
      setLoading(false);
      if (fileUploadSuccess || createdSuccess) {
        showSuccessMessage(t("successUpdate"));
        setSubmitSuccess(true);
        router.push(router.asPath);
      }
    }
  };

  const handleReset = () => {
    setOpen(false);
    setFormData(initialData);
    setSubmitSuccess(false);
  };

  return (
    <Dialog fullWidth open={open} onClose={handleReset} maxWidth='md' scroll='body'>
      <DialogTitle
        variant='h4'
        className='flex gap-2 flex-col text-center pbs-10 pbe-6 pli-10 sm:pbs-16 sm:pbe-6 sm:pli-16'
      >
        {t("editCategory")}
        <Box sx={{ mt: 2 }}>
          <Typography component='span' className='flex flex-col text-center'>
            {t("informationUpdating")}
          </Typography>
        </Box>
        <IconButton
          onClick={handleReset}
          className='absolute block-start-4 inline-end-4'
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          <i className='ri-close-line text-textSecondary' />
        </IconButton>
      </DialogTitle>
      {loading && <LinearProgress />}
      <form onSubmit={handleEditSubmit}>
        <DialogContent className='overflow-visible pbs-0 pbe-6 pli-10 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TableFilters
                selectedLang={selectedLang}
                onLanguageChange={setSelectedLang}
                languages={languages}
              />
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
                sx={{marginBottom: 6, marginTop: 4}}
              />
              <TextField
                label={t("description")}
                fullWidth
                multiline
                rows={4}
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
                sx={{marginBottom: 6, overflowWrap: 'break-word'}} // Или используйте wordWrap: 'break-word'
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='gap-2 justify-center pbs-0 pbe-10 pli-10 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit'>
            {t('Edit')}
          </Button>
          <Button variant='outlined' color='secondary' type='reset' onClick={handleReset}>
            {t('Cancel')}
          </Button>
          <StyledSnackbar
            open={showEmptyFieldsMessage}
            autoHideDuration={6000}
            onClose={() => setShowEmptyFieldsMessage(false)}
            message={t("empty")}
          />
        </DialogActions>
      </form>
      <Dialog open={submitSuccess}  onClose={handleReset}>
        <DialogTitle>Успешно!</DialogTitle>
        <DialogContent>
          <DialogContentText>Ваша форма успешно отправлена.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} variant='contained' color='success'>
            {t("toClose")}
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}

export default EditCategoryInfo
