'use client'

// React Imports
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import Cookies from 'js-cookie';

// Next Imports
import {useTranslations} from "next-intl";

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
import AddCategoryDrawer from "src/views/category/list/drawer/AddCategoryDrawer";
import EditCategoryDrawer from "src/views/category/list/drawer/EditCategoryDrawer";
import DeleteCategoryDrawer from "src/views/category/list/drawer/DeleteCategoryDrawer";

// Component Filters Imports
import TableFilters from "src/views/category/list/filter/TableFilters";

// SSR Imports
import {checkAndRefreshToken} from "src/@core/SSR/cookie/getTokenExpiry";

// Snackbar Imports
import {renderSnackbar} from "src/views/category/list/snackbar/renderSnackbar";

// Debounced Imports
import {DebouncedInput} from "src/views/category/list/filter/debouncedInput";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";
import {Category} from "src/@core/interface/category/interface";

// Util Imports
import {axiosClassic} from "src/api/interseptor";

// Styles Imports
import {StyledPagination, StyledTable} from "src/views/category/styles/styles";
import {createColumns} from "src/views/category/list/table/column/columns";
import {fuzzyFilter} from "src/views/category/list/filter/fuzzyFilter";

interface Props {
  userProfile: User;
  languages: Language[];
}

const CategoryListTable = ({ userProfile, languages }: Props) => {
  const t = useTranslations('categoryList');

  // Состояния для категорий
  const [category, setCategory] = useState<Category[]>([]);

  // Состояния для общего количества категорий и выбора строки
  const [totalCategory, setTotalCategory] = useState<number>(0);
  const [rowSelection, setRowSelection] = useState({});

  // Состояния для глобального фильтра и отфильтрованных категорий
  const [globalFilter, setGlobalFilter] = useState('');
  const [filteredCategory, setFilteredCategory] = useState<Category[]>([]);

  // Состояния для выбранной категории и выбранного языка из настроек профиля пользователя
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
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
    Cookies.set('page', String(page), { path: '/' });
  }, [page]);

  useEffect(() => {
    // Обновляем 'pageSize' в куках при изменении 'pageSize'
    Cookies.set('page_size', String(pageSize), { path: '/' });
  }, [pageSize]);

  // Состояния для сообщений об успешном действии, изменении и удалении
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [editMessage, setEditMessage] = useState<string>('');
  const [deleteMessage, setDeleteMessage] = useState<string>('');

  // Состояния для открытия модальных окон добавления, редактирования и удаления категорий
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [deleteCategoryOpen, setDeleteCategoryOpen] = useState(false);

  // Состояние для загрузки данных
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (page: number, pageSize: number) => {
    try {
      const isTokenValid = await checkAndRefreshToken();

      if (isTokenValid) {
        const response = await axiosClassic.get(`/category-admin?page=${page}&page_size=${pageSize}`);
        setCategory(response.data.items);
        setTotalCategory(response.data.total);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Произошла ошибка при загрузке данных. Пожалуйста, попробуйте еще раз.');
    }
  };

  useEffect(() => {
    const fetchDataOnLoad = async () => {
      await fetchData(page, pageSize);
    };
    fetchDataOnLoad();
  }, [page, pageSize]);

  useEffect(() => {
    setFilteredCategory(
      category?.filter(cat =>
        cat.translate_content && (cat.translate_content.some(tc => tc.lang_code === selectedLang) || !cat.translate_content.some(tc => tc.lang_code === selectedLang))
      )
    );
  }, [category, selectedLang]);

  const handleEditCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
    setEditCategoryOpen(true);
  }, []);

  const handleDeleteCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
    setDeleteCategoryOpen(true);
  }, []);

  const columns = useMemo(
    () => createColumns(selectedLang, languages, handleEditCategory, handleDeleteCategory, t),
    [selectedLang, languages]
  );

  const table = useReactTable({
    data: filteredCategory,
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
    setPage(newPage + 1); // Увеличиваем на 1, так как TablePagination начинает с 0, а вам нужен индекс страницы с 1
    // Устанавливаем куки с новым значением страницы
    Cookies.set('page', String(newPage + 1), { path: '/' });
  };

  // Функция для изменения размера страницы
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    Cookies.set('page_size', String(newPageSize), { path: '/' });
  };

  return (
    <>
      <Card>
        <CardHeader title={t('title')} sx={{ padding: '1.25rem' }}/>
        <CardContent sx={{ padding: '1.25rem' }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={6} sm={3}>
              <TableFilters
                selectedLang={selectedLang}
                onLanguageChange={setSelectedLang}
                languages={languages}
              />
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
            <Button variant='contained' onClick={() => setAddCategoryOpen(!addCategoryOpen)} className='is-full sm:is-auto'>
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
          count={totalCategory}
          rowsPerPage={pageSize}
          page={Math.min(page - 1, Math.max(0, Math.ceil(totalCategory / pageSize) - 1))} // корректировка страницы здесь
          SelectProps={{ inputProps: { 'aria-label': 'rows per page' } }}
          labelRowsPerPage={t("rowsPerPage")}
          onPageChange={(_, newPage) => handlePageChange(newPage)}
          onRowsPerPageChange={event => handlePageSizeChange(parseInt(event.target.value, 10))}
          nextIconButtonProps={{ style: { display: 'none' } }}
          backIconButtonProps={{ style: { display: 'none' } }}
        />
        <StyledPagination
          count={Math.ceil(totalCategory / pageSize)}
          page={page}
          color="primary"
          onChange={(_, newPage) => {
            setPage(newPage);
          }}
        />
      </Card>
      <>
        <AddCategoryDrawer
          open={addCategoryOpen}
          userProfile={userProfile}
          handleClose={() => setAddCategoryOpen(!addCategoryOpen)}
          fetchData={fetchData}
          languages={languages}
          page={page}
          pageSize={pageSize}
          showSuccessMessage={setSuccessMessage}
        />
        {successMessage && renderSnackbar({
          color: 'green',
          message: successMessage,
          showMessage: () => setSuccessMessage(''),
          open: true,
          autoHideDuration: 6000,
          onClose: () => setSuccessMessage('')
        })}
        <EditCategoryDrawer
          userProfile={userProfile}
          open={editCategoryOpen}
          handleClose={() => setEditCategoryOpen(!editCategoryOpen)}
          fetchData={fetchData}
          category={selectedCategory}
          languages={languages}
          page={page}
          pageSize={pageSize}
          showSuccessMessage={setEditMessage}
        />
        {editMessage && renderSnackbar({
          color: 'orange',
          message: editMessage,
          showMessage: () => setEditMessage(''),
          open: true,
          autoHideDuration: 6000,
          onClose: () => setEditMessage('')
        })}
        <DeleteCategoryDrawer
          userProfile={userProfile}
          open={deleteCategoryOpen}
          handleClose={() => setDeleteCategoryOpen(!deleteCategoryOpen)}
          fetchData={fetchData}
          category={selectedCategory}
          languages={languages}
          page={page}
          pageSize={pageSize}
          showSuccessMessage={setDeleteMessage}
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
  );
}

export default CategoryListTable
