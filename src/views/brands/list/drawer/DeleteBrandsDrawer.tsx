// React Imports
import {useEffect, useState} from 'react'

// Axios API
import {axiosClassic} from "src/api/interseptor";

// MUI Imports
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import {DialogContentText, Grid} from "@mui/material";
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import LinearProgress from "@mui/material/LinearProgress";

// Component Imports
import TableFilters from "src/views/brands/list/filter/TableFilters";

// Types Imports
import {FormDataType} from "src/@core/types/brands/types";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";
import {useTranslations} from "next-intl";
import {Brands} from "src/@core/interface/brands/interface";

type Props = {
  open: boolean
  handleClose: () => void
  fetchData: (page: number, pageSize: number) => Promise<void>;
  brands: Brands | null;
  languages: Language[];
  page: number;
  pageSize: number;
  showSuccessMessage: (message: string) => void;
  userProfile: User;
}

const DeleteBrandsDrawer = ({ userProfile, open, handleClose, fetchData, brands, languages, page, pageSize, showSuccessMessage }: Props) => {
  const t = useTranslations('categoryList');

  // Состояние для данных формы
  const initialData: FormDataType = Object.fromEntries(
    languages.map((lang) => [
      lang.language_code,
      { lang_code: lang.language_code, icon: '', content: { name: '', description: '' } }
    ])
  );
  const [formData, setFormData] = useState<FormDataType>(initialData);

  // Состояние для изображения категории
  const [, setEditBrandsImage ] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Состояния для отображения загрузки и сообщения о пустых полях
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Состояние для выбранного языка
  const [selectedLang, setSelectedLang] = useState<string>(
    userProfile?.user_settings?.products_language || ''
  );

  useEffect(() => {
    if (brands && brands.icon) {
      setPreviewImage(brands.icon);
    }
  }, [brands]);

  useEffect(() => {
    if (brands) {
      setFormData(prevData => {
        const newData = { ...prevData };

        const updateDataForLanguage = (langCode: string) => {
          const langData = brands.translate_content.find((content) => content.lang_code === langCode) || {
            content: { name: t("noDataAvailable"), description: t("noDataAvailable") },
          };

          newData[langCode] = {
            lang_code: langCode,
            content: {
              name: langData.content.name,
              description: langData.content.description,
            },
            icon: brands.icon || '',
          };
        };

        languages.forEach((lang) => {
          updateDataForLanguage(lang.language_code);
        });

        return newData;
      });
    } else {
      setFormData(initialData);
    }
  }, [brands, open, languages]);

  const currentData = formData[selectedLang] || { name: '', description: '' };

  const handleDeleteImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setEditBrandsImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDeleteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const currentLangData = formData[selectedLang];

    setLoading(true);

    try {
      // Передаем ID категории в URL
      const brandsId = brands?.id;
      const imageId = brands?.icon;

      // Удаляем изображение и категорию одним запросом
      await Promise.all([
        axiosClassic.delete(`/brand-admin/delete-file?id=${brandsId}&file_path=${imageId}`),
        axiosClassic.delete(`/brand-admin?brand_id=${brandsId}`, {
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
      await fetchData(page, pageSize);
      showSuccessMessage(t("successDelete"));
      setSubmitSuccess(true);
    } catch (error) {
      console.error(t('errorDelete'), error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setSubmitSuccess(false);
    setPreviewImage(null);
    handleClose();
  };

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
                label={t("name")}
                fullWidth
                value={currentData?.content?.name || ''}
                InputProps={{
                  style: { pointerEvents: 'none' }
                }}
                onChange={(event) =>
                  setFormData((prev) => {
                    const selectedLangData = prev[selectedLang] || {content: {name: '', description: ''}};

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
                sx={{marginBottom: 4, marginTop: 2}}
              />
              <TextField
                label={t("description")}
                fullWidth
                multiline
                rows={3}
                InputProps={{
                  style: { pointerEvents: 'none' }
                }}
                value={currentData?.content?.description || ''}
                onChange={(event) =>
                  setFormData((prev) => {
                    const selectedLangData = prev[selectedLang] || {content: {name: '', description: ''}};

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
      <Dialog open={submitSuccess} onClose={handleReset}>
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

export default DeleteBrandsDrawer
