// React Imports
import React, {useState} from "react";

// Next Imports
import {useTranslations} from "next-intl";

// MUI Imports
import Box from "@mui/material/Box";
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import type { ButtonProps } from '@mui/material/Button'
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";

// Type Imports
import {ThemeColor} from "src/@core/types";

// Component Imports
import ConfirmationDialog from "src/views/category/view/category-left-overview/ConfirmationDialog";
import EditCategoryInfo from "src/views/category/view/category-left-overview/EditCategoryInfo";
import OpenDialogOnElementClick from 'src/@core/components/dialogs/OpenDialogOnElementClick'


// Filters Imports
import TableFilters from "src/views/category/list/filter/TableFilters";

// Styles Imports
import {StyledSnackbar} from "src/views/category/styles/styles";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Brands} from "src/@core/interface/brands/interface";
import {Language} from "src/@core/interface/language/interface";
import Link from "next/link";

type Props = {
  userProfile: User;
  brand: Brands;
  languages: Language[];
};

const BrandsDetails = ({ userProfile, brand, languages }: Props) => {
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

  const getTitleForLanguage = (brand: Brands, langCode: string): string => {
    const title = brand.translate_content?.find(item => item.lang_code === langCode)?.content.name;

    return title ? title : t("noDataAvailable");
  };

  const getDescriptionForLanguage = (brand: Brands, langCode: string): string => {
    const description = brand.translate_content?.find(item => item.lang_code === langCode)?.content.description;

    return description ? description : t("noDataAvailable");
  };

  return (
    <>
      <Card>
        <CardContent className='flex flex-col pbs-4 gap-6'>
          <div className='flex flex-col gap-6'>
            <CardMedia
              className='rounded-lg'
              component="img"
              height="300"
              image={brand.icon}
              alt="Category Image"
            />
          </div>
          <div>
            <Typography variant='h5' sx={{marginBottom: 2}}>{t("detailedView")}</Typography>
            <Divider className='mlb-4'/>
            <Box sx={{ marginBottom: 4 }}>
              <TableFilters
                selectedLang={selectedLang}
                onLanguageChange={setSelectedLang}
                languages={languages}
              />
            </Box>
            <TextField
              label={t("title")}
              fullWidth
              value={getTitleForLanguage(brand, selectedLang)}
              InputProps={{
                style: {pointerEvents: 'none'}
              }}
              sx={{marginBottom: 6}}
            />
            <TextField
              label={t("description")}
              fullWidth
              value={getDescriptionForLanguage(brand, selectedLang)}
              InputProps={{
                style: {pointerEvents: 'none'}
              }}
            />
          </div>
          <div className='flex gap-4 justify-center'>
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps(t("Edit"), 'primary', 'contained')}
              dialog={EditCategoryInfo}
              dialogProps={{
                brand: brand,
                languages: languages,
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
                brand: brand,
                languages: languages,
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
        <Link href={`http://localhost:3009/category/list`}>
          <Button variant='contained' color='primary' type='submit'>{t("back")}</Button>
        </Link>
      </Box>
    </>
  )
}

export default BrandsDetails
