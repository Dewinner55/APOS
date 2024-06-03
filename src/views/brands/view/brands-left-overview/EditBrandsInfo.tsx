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

// SSR Imports
import {checkAndRefreshToken} from "src/@core/SSR/cookie/getTokenExpiry";

// Types Imports
import {FormDataType} from "src/@core/types/brands/types";

// Interface Imports
import {Brands} from "src/@core/interface/brands/interface";
import {Language} from "src/@core/interface/language/interface";
import {StyledSnackbar} from "src/views/category/styles/styles";
import {useTranslations} from "next-intl";

type Props = {
  brand: Brands;
  languages: Language[];
  open: boolean
  setOpen: (open: boolean) => void
  showSuccessMessage: (message: string) => void;
}

const EditBrandsInfo = ({ brand, languages, open, setOpen, showSuccessMessage }: Props) => {
  const t = useTranslations('categoryList');
  const router = useRouter();

  // Состояние для данных формы
  const initialData: FormDataType = Object.fromEntries(
    languages.map((lang) => [
      lang.language_code,
      { lang_code: lang.language_code, icon: '', content: { name: '', description: '' } }
    ])
  );
  const [formData, setFormData] = useState<FormDataType>(initialData);

  // Состояние для изображения категории
  const [editBrandImage, setEditBrandImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Состояние для отображения загрузки
  const [loading, setLoading] = useState<boolean>(false);

  // Состояния сообщения
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showEmptyFieldsMessage, setShowEmptyFieldsMessage] = useState<boolean>(false);

  // Состояние для выбранного языка
  const [selectedLang, setSelectedLang] = useState<string>('ru');

  useEffect(() => {
    if (brand && brand.icon) {
      setPreviewImage(brand.icon);
    }
  }, [brand]);

  useEffect(() => {
    if (brand) {
      const newData: FormDataType = { ...initialData };

      const updateDataForLanguage = (langCode: string) => {
        const langData = brand.translate_content.find((content) => content.lang_code === langCode) || {
          content: { name: '', description: '' },
        };

        newData[langCode] = {
          lang_code: langCode,
          content: {
            name: langData.content.name,
            description: langData.content.description,
          },
          icon: brand.icon || '',
        };
      };

      languages.forEach((lang) => {
        updateDataForLanguage(lang.language_code);
      });

      setFormData(newData);
    } else {
      setFormData(initialData);
    }
  }, [brand, open, languages]);

  const currentData = formData[selectedLang] || { title: '', description: '' };

  const handleEditImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setEditBrandImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentLangData = formData[selectedLang];
    if (!currentLangData.content.name && !currentLangData.content.description) {
      setShowEmptyFieldsMessage(true);

      return;
    }

    // Добавляем проверку токена
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
    const dataToSend = { translate_content: [] };
    Object.entries(formData).forEach(([langCode, langData]) => {
      if (langData.content.name.trim().length > 0 || langData.content.description.trim().length > 0) {
        // @ts-ignore
        dataToSend.translate_content.push({ lang_code: langCode, content: langData.content });
      }
    });

    setLoading(true);
    let createdSuccess = false;

    try {
      await axiosClassic.post('/brand-admin', dataToSend);
      setFormData(initialData);
      createdSuccess = true;
      showSuccessMessage(t("successCreated"));
    } catch (error) {
      console.error(t('errorUpdate'), error);
    } finally {
      setLoading(false);
      if (createdSuccess) {
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
                value={currentData?.content?.name || ''}
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

export default EditBrandsInfo
