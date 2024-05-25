'use client'

// React Imports
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import Cookies from 'js-cookie';

// Next Imports
import {useTranslations} from "next-intl";

// Axios API
import {axiosClassic} from "src/api/interseptor";

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import TablePagination from '@mui/material/TablePagination'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import {CircularProgress, Table} from '@mui/material'

// Third-party Imports
import classnames from 'classnames'
import {
  flexRender,
  getCoreRowModel, getFacetedMinMaxValues,
  getFacetedRowModel, getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

// Component Imports
import AddSubcategoryDrawer from "src/views/subcategory/list/drawer/AddSubcategoryDrawer";
import EditSubcategoryDrawer from "src/views/subcategory/list/drawer/EditSubcategoryDrawer";
import DeleteSubcategoryDrawer from "src/views/subcategory/list/drawer/DeleteSubcategoryDrawer";

// Component Filters Imports
import {fuzzyFilter} from "src/views/subcategory/list/filter/fuzzyFilter";

// SSR Imports
import {checkAndRefreshToken} from "src/@core/SSR/cookie/getTokenExpiry";

// Snackbar Imports
import {renderSnackbar} from "src/views/subcategory/list/snackbar/renderSnackbar";

// Debounced Imports
import {DebouncedInput} from "src/views/subcategory/list/filter/debouncedInput";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";
import {Category} from "src/@core/interface/category/interface";
import {Subcategory} from "src/@core/interface/subcategory/interface";

// @ts-ignore


// Styles Imports
import {StyledPagination, StyledTable} from "src/views/subcategory/styles/styles";
import {createColumns} from "src/views/subcategory/list/table/column/columns";
import LanguageFilter from "src/views/subcategory/list/filter/LanguageFilter";
import CategoryFilter from "src/views/subcategory/list/filter/CategoryFilter";

interface Props {
  userProfile: User;
  languages: Language[];
}

const SubcategoryListTable = ({userProfile, languages}: Props) => {
  const t = useTranslations('subcategoryList');

  // Состояния для категорий
  const [categories, setCategories] = useState<Category[]>([]);

  // Состояния для подкатегорий
  const [subcategory, setSubcategory] = useState<Subcategory[]>([]);

  // Состояния для общего количества категорий и выбора строки
  const [totalSubcategory, setTotalSubcategory] = useState<number>(0);
  const [rowSelection, setRowSelection] = useState({});

  // Состояния для глобального фильтра и отфильтрованных категорий
  const [globalFilter, setGlobalFilter] = useState('');
  const [filteredSubcategory, setFilteredSubcategory] = useState<Subcategory[]>([]);

  // Состояния для выбранной категории и выбранного языка из настроек профиля пользователя
  const [selectedCategory, setSelectedCategory] = useState<string>('reset'); // или null в зависимости от
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [selectedLang, setSelectedLang] = useState<string>(
    userProfile?.user_settings?.products_language || ''
  );

  // Состояния для текущей страницы и размера страницы
  const [page, setPage] = useState(() => {
    const pageCookie = Cookies.get('page');

    return pageCookie ? parseInt(pageCookie, 10) : 1;
  });
  const [pageSize, setPageSize] = useState(() => {
    const pageSizeCookie = Cookies.get('page_size');

    return pageSizeCookie ? parseInt(pageSizeCookie, 10) : 10;
  });

  useEffect(() => {
    // Обновляем 'page' в куках при изменении 'page'
    Cookies.set('page', String(page), {path: '/'});
  }, [page]);

  useEffect(() => {
    // Обновляем 'pageSize' в куках при изменении 'pageSize'
    Cookies.set('page_size', String(pageSize), {path: '/'});
  }, [pageSize]);

  // Состояния для сообщений об успешном действии, изменении и удалении
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [editMessage, setEditMessage] = useState<string>('');
  const [deleteMessage, setDeleteMessage] = useState<string>('');

  // Состояния для открытия модальных окон добавления, редактирования и удаления категорий
  const [addSubcategoryOpen, setAddSubcategoryOpen] = useState(false);
  const [editSubcategoryOpen, setEditSubcategoryOpen] = useState(false);
  const [deleteSubcategoryOpen, setDeleteSubcategoryOpen] = useState(false);

  // Состояние для загрузки данных
  const [loading, setLoading] = useState<boolean>(false);

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

  const fetchData = async (page: number, pageSize: number) => {
    try {
      // Проверка токена
      const isTokenValid = await checkAndRefreshToken();
      if (!isTokenValid) {
        alert('Токен недействителен. Пожалуйста, войдите снова.');
        setLoading(false);

        return;
      }

      // Выполнение запроса после успешной проверки токена
      const response = await axiosClassic.get(`/subcategory-admin?page=${page}&page_size=${pageSize}`);
      setSubcategory(response.data.items);
      setTotalSubcategory(response.data.total);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Произошла ошибка при загрузке данных. Пожалуйста, попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataOnLoad = async () => {
      await fetchData(page, pageSize);
    };
    fetchDataOnLoad();
  }, [page, pageSize]);

  useEffect(() => {
    setFilteredSubcategory(
      subcategory?.filter(cat => {
        const matchesLang = selectedLang ? cat.translate_content.some(tc => tc.lang_code === selectedLang) : true;
        const matchesCategory = selectedCategory && selectedCategory !== 'reset'
          ? categories.some(category => category.id === selectedCategory && category.subcategories.some(subcat => subcat.id === cat.id))
          : true;

        return matchesLang && matchesCategory;
      })
    );
  }, [subcategory, selectedLang, selectedCategory, categories]);

  const handleEditSubcategory = useCallback((subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    setEditSubcategoryOpen(true);
  }, []);

  const handleDeleteSubcategory = useCallback((subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    setDeleteSubcategoryOpen(true);
  }, []);

  const columns = useMemo(
    () => createColumns(selectedLang, languages, handleEditSubcategory, handleDeleteSubcategory, t),
    [selectedLang, languages]
  );

  const table = useReactTable({
    data: filteredSubcategory,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1);
    Cookies.set('page', String(newPage + 1), {path: '/'});
  };

  // Функция для изменения размера страницы
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    Cookies.set('page_size', String(newPageSize), {path: '/'});
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === 'reset' ? '' : category);
  };

  return (
    <>
      <Card>
        <CardHeader title={t('title')} sx={{padding: '1.25rem'}}/>
        <CardContent sx={{padding: '1.25rem'}}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <LanguageFilter
                selectedLang={selectedLang}
                onLanguageChange={setSelectedLang}
                languages={languages}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                categories={categories} />
            </Grid>
          </Grid>
        </CardContent>
        <Divider/>
        <div className='flex justify-between p-5 gap-4 flex-col items-start sm:flex-row sm:items-center'>
          <Button
            color='secondary'
            variant='outlined'
            startIcon={<i className='ri-upload-2-line text-xl'/>}
            className='is-full sm:is-auto'
          >
            {t('export')}
          </Button>
          <div className='flex items-center gap-x-4 is-full gap-4 flex-col sm:is-auto sm:flex-row'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder={t('search')}
              className='is-full sm:is-auto'
            />
            <Button variant='contained' onClick={() => setAddSubcategoryOpen(!addSubcategoryOpen)}
                    className='is-full sm:is-auto'>
              {t('addNewCategory')}
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <StyledTable>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='ri-arrow-up-s-line text-xl'/>,
                            desc: <i className='ri-arrow-down-s-line text-xl'/>
                          }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
            </thead>
            <tbody>
            {loading ? (
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} style={{textAlign: 'center'}}>
                  <CircularProgress/>
                </td>
              </tr>
            ) : (
              <>
                {table.getFilteredRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={table.getVisibleFlatColumns().length} className={`${Table}`}>
                      {t("noDataAvailable")}
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.slice(0, table.getState().pagination.pageSize).map((row, index) => (
                    <tr key={`${row.id}_${index}`} className={classnames({selected: row.getIsSelected()})}>
                      {row.getVisibleCells().map(cell => (
                        <td key={`${cell.id}_${index}`}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  ))
                )}
              </>
            )}
            </tbody>
          </StyledTable>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component='div'
          className='border-bs'
          count={totalSubcategory}
          rowsPerPage={pageSize}
          page={page - 1}
          SelectProps={{
            inputProps: {'aria-label': 'rows per page'}
          }}
          labelRowsPerPage={t("rowsPerPage")}
          onPageChange={(_, newPage) => handlePageChange(newPage)}
          onRowsPerPageChange={event => handlePageSizeChange(parseInt(event.target.value, 10))}
          nextIconButtonProps={{style: {display: 'none'}}}
          backIconButtonProps={{style: {display: 'none'}}}
        />
        <StyledPagination
          count={Math.ceil(totalSubcategory / pageSize)}
          page={page}
          color="primary"
          onChange={(_, newPage) => {
            setPage(newPage);
          }}
        />
      </Card>
      <>
        <AddSubcategoryDrawer
          open={addSubcategoryOpen}
          userProfile={userProfile}
          handleClose={() => setAddSubcategoryOpen(!addSubcategoryOpen)}
          fetchData={fetchData}
          languages={languages}
          page={page}
          pageSize={pageSize}
          showSuccessMessage={setSuccessMessage}
          categories={categories}
        />
        {successMessage && renderSnackbar({
          color: 'green',
          message: successMessage,
          showMessage: () => setSuccessMessage(''),
          open: true,
          autoHideDuration: 6000,
          onClose: () => setSuccessMessage('')
        })}
        <EditSubcategoryDrawer
          userProfile={userProfile}
          open={editSubcategoryOpen}
          handleClose={() => setEditSubcategoryOpen(!editSubcategoryOpen)}
          fetchData={fetchData}
          subcategory={selectedSubcategory}
          languages={languages}
          page={page}
          pageSize={pageSize}
          showSuccessMessage={setEditMessage}
          categories={categories}
        />
        {editMessage && renderSnackbar({
          color: 'orange',
          message: editMessage,
          showMessage: () => setEditMessage(''),
          open: true,
          autoHideDuration: 6000,
          onClose: () => setEditMessage('')
        })}
        <DeleteSubcategoryDrawer
          userProfile={userProfile}
          open={deleteSubcategoryOpen}
          handleClose={() => setDeleteSubcategoryOpen(!deleteSubcategoryOpen)}
          fetchData={fetchData}
          subcategory={selectedSubcategory}
          languages={languages}
          page={page}
          pageSize={pageSize}
          showSuccessMessage={setDeleteMessage}
          categories={categories}
        />
        {deleteMessage && renderSnackbar({
          color: 'red',
          message: deleteMessage,
          showMessage: () => setDeleteMessage(''),
          open: true,
          autoHideDuration: 6000,
          onClose: () => setDeleteMessage('')
        })}
      </>
    </>
  )
    ;
}

export default SubcategoryListTable
