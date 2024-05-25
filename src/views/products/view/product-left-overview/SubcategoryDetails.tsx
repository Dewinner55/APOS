// React Imports
import React, {useEffect, useState} from "react";

// Next Imports
import {useTranslations} from "next-intl";
import Link from "next/link";

// MUI Imports
import Box from "@mui/material/Box";
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import type {ButtonProps} from '@mui/material/Button'
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";

// Type Imports
import {ThemeColor} from "src/@core/types";

// Component Imports
import ConfirmationDialog from "src/views/subcategory/view/subcategory-left-overview/ConfirmationDialog";
import EditSubcategoryInfo from "src/views/subcategory/view/subcategory-left-overview/EditSubcategoryInfo";
import OpenDialogOnElementClick from 'src/@core/components/dialogs/OpenDialogOnElementClick'

// Filters Imports
import LanguageFilter from "src/views/subcategory/list/filter/LanguageFilter";

// Styles Imports
import {StyledSnackbar} from "src/views/subcategory/styles/styles";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Subcategory} from "src/@core/interface/subcategory/interface";
import {Language} from "src/@core/interface/language/interface";
import {Category} from "src/@core/interface/category/interface";
import {axiosClassic} from "src/api/interseptor";

type Props = {
  userProfile: User;
  subcategory: Subcategory;
  languages: Language[];
};

const SubcategoryDetails = ({userProfile, subcategory, languages}: Props) => {
  // const router = useRouter();
  const t = useTranslations('categoryList');

  // Функция для создания объекта с параметрами кнопки
  const buttonProps = (children: string, color: ThemeColor, variant: ButtonProps['variant']): ButtonProps => ({
    children,
    color,
    variant
  });

  // Состояния для сообщений об изменениях и удалении
  const [editMessage, setEditMessage] = useState<string>('');
  const [deleteMessage, setDeleteMessage] = useState<string>('');

  // Выбранный язык для отображения деталей категории
  const [selectedLang, setSelectedLang] = useState<string>(
    userProfile?.user_settings?.products_language || ''
  );

  // Состояния для категорий
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClassic.get('/category-admin?page=1&page_size=100');
        setCategories(response.data.items);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);


  const getTitleForLanguage = (subcategory: Subcategory, langCode: string): string => {
    const title = subcategory.translate_content?.find(item => item.lang_code === langCode)?.content.title;

    return title ? title : t("noDataAvailable");
  };

  const getDescriptionForLanguage = (subcategory: Subcategory, langCode: string): string => {
    const description = subcategory.translate_content?.find(item => item.lang_code === langCode)?.content.description;

    return description ? description : t("noDataAvailable");
  };

  const categoryTitle = categories.find(cat => cat.id === subcategory?.category_id)
    ?.translate_content?.find(content => content.lang_code === selectedLang)?.content.title || 'Translation not available';

  return (
    <>
      <Card>
        <CardContent className='flex flex-col pbs-4 gap-6'>
          <div className='flex flex-col gap-6'>
            <CardMedia
              className='rounded-lg'
              component="img"
              height="300"
              image={subcategory.image}
              alt="Category Image"
            />
          </div>
          <div>
            <Typography variant='h5' sx={{marginBottom: 2}}>{t("detailedView")}</Typography>
            <Divider className='mlb-4'/>
            <LanguageFilter
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
              sx={{marginBottom: 4, marginTop: 4}}
            />
            <TextField
              label={t("title")}
              fullWidth
              value={getTitleForLanguage(subcategory, selectedLang)}
              InputProps={{
                style: {pointerEvents: 'none'}
              }}
              sx={{marginBottom: 4}}
            />
            <TextField
              label={t("description")}
              fullWidth
              multiline
              rows={4}
              value={getDescriptionForLanguage(subcategory, selectedLang)}
              InputProps={{
                style: {pointerEvents: 'none'}
              }}
            />
          </div>
          <div className='flex gap-4 justify-center'>
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps(t("Edit"), 'primary', 'contained')}
              dialog={EditSubcategoryInfo}
              dialogProps={{
                subcategory: subcategory,
                languages: languages,
                categories: categories,
                showSuccessMessage: setEditMessage
              }}
            />
            {editMessage && (
              <StyledSnackbar
                color='orange'
                open={true}
                autoHideDuration={6000}
                onClose={() => setEditMessage('')}
                message={editMessage}
              />
            )}
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps(t('Delete'), 'error', 'outlined')}
              dialog={ConfirmationDialog}
              dialogProps={{
                subcategory: subcategory,
                languages: languages,
                categories: categories,
                showSuccessMessage: setDeleteMessage
              }}
            />
            {deleteMessage && (
              <StyledSnackbar
                color='orange'
                open={true}
                autoHideDuration={6000}
                onClose={() => setDeleteMessage('')}
                message={deleteMessage}
              />
            )}
          </div>
        </CardContent>
      </Card>
      <Box sx={{padding: 4}}>
        <Link href={`http://localhost:3009/subcategory/list`}>
          <Button variant='contained' color='primary' type='submit'>{t("back")}</Button>
        </Link>
      </Box>
    </>
  )
}

export default SubcategoryDetails
