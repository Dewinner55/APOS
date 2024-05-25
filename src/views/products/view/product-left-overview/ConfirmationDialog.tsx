'use client'

// React Imports
import React, {useEffect, useState} from 'react'

// Next Imports
import {useRouter} from "next/router";
import {useTranslations} from "next-intl";

// Axios API
import {axiosClassic} from "src/api/interseptor";

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {DialogContentText, Grid} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Components Imports
import TableFilters from "src/views/category/list/filter/TableFilters";

// SSR Imports
import {checkAndRefreshToken} from "src/@core/SSR/cookie/getTokenExpiry";

// Types Imports
import {FormDataType} from "src/@core/types/category/types";

// Interface Imports
import {Category} from "src/@core/interface/category/interface";
import {Subcategory} from "src/@core/interface/subcategory/interface";
import {Language} from "src/@core/interface/language/interface";

type Props = {
  categories: Category[];
  subcategory: Subcategory;
  languages: Language[];
  open: boolean
  setOpen: (open: boolean) => void
  showSuccessMessage: (message: string) => void;
}

const ConfirmationDialog = ({ categories, subcategory, languages, open, setOpen, showSuccessMessage}: Props) => {
  const t = useTranslations('categoryList');
  const router = useRouter();

  // Состояние для данных формы
  const initialData: FormDataType = Object.fromEntries(
    languages.map((lang) => [
      lang.language_code,
      {lang_code: lang.language_code, image: '', content: {title: '', description: ''}}
    ])
  );
  const [formData, setFormData] = useState<FormDataType>(initialData);

  // Состояние для изображения категории
  const [, setEditSubcategoryImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Состояния для отображения загрузки и сообщения о пустых полях
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Состояние для выбранного языка
  const [selectedLang, setSelectedLang] = useState<string>('ru');

  useEffect(() => {
    if (subcategory && subcategory.image) {
      setPreviewImage(subcategory.image);
    }
  }, [subcategory]);

  useEffect(() => {
    if (subcategory) {
      const newData: FormDataType = {...initialData};

      const updateDataForLanguage = (langCode: string) => {
        const langData = subcategory.translate_content?.find((content) => content.lang_code === langCode) || {
          content: {title: t("noDataAvailable"), description: t("noDataAvailable")},
        };

        newData[langCode] = {
          lang_code: langCode,
          content: {
            title: langData.content.title,
            description: langData.content.description,
          },
          image: subcategory.image || '',
        };
      };

      languages.forEach((lang) => {
        updateDataForLanguage(lang.language_code);
      });

      setFormData(newData);
    } else {
      setFormData(initialData);
    }
  }, [subcategory, open, languages]);

  const currentData = formData[selectedLang] || {title: '', description: ''};

  const handleDeleteImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setEditSubcategoryImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDeleteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentLangData = formData[selectedLang];
    setLoading(true);

    try {
      // Проверка токена
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

    try {
      // Передаем ID подкатегории в URL
      const SubcategoryId = subcategory?.id;
      const imageId = subcategory?.image;

      // Удаляем изображение и подкатегорию одним запросом
      await Promise.all([
        axiosClassic.delete(`/subcategory-admin/delete_file?id=${SubcategoryId}&image_path=${imageId}`),
        axiosClassic.delete(`/subcategory-admin?subcategory_id=${SubcategoryId}`, {
          data: {
            translate_content: [
              {
                lang_code: selectedLang,
                content: currentLangData.content,
              },
            ],
          },
        }),
      ]);

      setFormData(initialData);
      showSuccessMessage(t("successDelete"));
      setSubmitSuccess(true);
    } catch (error) {
      console.error(t('errorDelete'), error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOpen(false);
    setFormData(initialData);
    setSubmitSuccess(false);
  };

  const handleSubcategoryList = () => {
    router.push(`/subcategory/list`);
  };

  const categoryTitle = categories.find(cat => cat.id === subcategory?.category_id)
    ?.translate_content?.find(content => content.lang_code === selectedLang)?.content.title || 'Translation not available';

  return (
    <Dialog fullWidth open={open} onClose={handleReset} maxWidth='md' scroll='body'>
      <DialogTitle
        variant='h4'
        className='flex gap-2 flex-col text-center pbs-10 pbe-6 pli-10 sm:pbs-16 sm:pbe-6 sm:pli-16'
      >
        {t("deleteCategory")}
        <Box sx={{mt: 2}}>
          <Typography component='span' className='flex flex-col text-center'>
            {t("informationDelete")}
          </Typography>
        </Box>
        <IconButton
          onClick={handleReset}
          className='absolute block-start-4 inline-end-4'
          style={{position: 'absolute', top: 10, right: 10}}
        >
          <i className='ri-close-line text-textSecondary'/>
        </IconButton>
      </DialogTitle>
      {loading && <LinearProgress />}
      <form onSubmit={handleDeleteSubmit}>
        <DialogContent className='overflow-visible pbs-0 pbe-6 pli-10 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TableFilters
                selectedLang={selectedLang}
                onLanguageChange={setSelectedLang}
                languages={languages}
              />
              <TextField
                label="Категория"
                fullWidth
                value={categoryTitle}
                InputProps={{style: {pointerEvents: 'none'}}}
                onChange={(event) => ((prev) => {
                  const selectedLangData = prev[selectedLang] || {content: {title: '', description: ''}};

                  return {
                    ...prev,
                    [selectedLang]: {
                      ...selectedLangData,
                      content: {...selectedLangData.content, title: event.target.value}
                    }
                  };
                })}
                sx={{marginBottom: 4, marginTop: 2}}
              />
              <TextField
                label={t("title")}
                fullWidth
                value={currentData?.content?.title || ''}
                InputProps={{
                  style: { pointerEvents: 'none' } // не позволяет кликать на поле
                }}
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
                sx={{marginBottom: 4, marginTop: 2}}
              />
              <TextField
                label={t("description")}
                fullWidth
                multiline
                rows={3}
                InputProps={{
                  style: { pointerEvents: 'none' } // не позволяет кликать на поле
                }}
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
                  onChange={handleDeleteImageChange}
                  style={{display: 'none'}}
                  disabled={true}
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
                      t('noImage')
                    )}
                  </Button>
                </label>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='gap-2 justify-center pbs-0 pbe-10 pli-10 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' color='error' type='submit'>
            {t('Delete')}
          </Button>
          <Button variant='outlined' color='secondary' type='reset' onClick={handleReset}>
            {t('Cancel')}
          </Button>
        </DialogActions>
      </form>
      <Dialog open={submitSuccess} onClick={handleSubcategoryList}>
        <DialogTitle>{t("successfully")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("successDelete")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} variant='contained' color='error'>
            {t("toClose")}
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}

export default ConfirmationDialog
