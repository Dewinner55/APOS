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
import AddBrandsDrawer from "src/views/brands/list/drawer/AddBrandsDrawer";
import EditBrandsDrawer from "src/views/brands/list/drawer/EditBrandsDrawer";
import DeleteBrandsDrawer from "src/views/brands/list/drawer/DeleteBrandsDrawer";

// Component Filters Imports
import TableFilters from "src/views/brands/list/filter/TableFilters";

// Snackbar Imports
import {renderSnackbar} from "src/views/brands/list/snackbar/renderSnackbar";

// Debounced Imports
import {DebouncedInput} from "src/views/brands/list/filter/debouncedInput";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";
import { Brands } from 'src/@core/interface/brands/interface';

// Util Imports
import {axiosClassic} from "src/api/interseptor";

// @ts-ignore


// Styles Imports
import {StyledPagination, StyledTable} from "src/views/brands/styles/styles";
import {createColumns} from "src/views/brands/list/table/column/columns";
import {fuzzyFilter} from "src/views/brands/list/filter/fuzzyFilter";

interface Props {
  userProfile: User;
  languages: Language[];
}

const BrandsListTable = ({ userProfile, languages }: Props) => {
  const t = useTranslations('categoryList');

  // Состояния для категорий
  const [brands, setBrands] = useState<Brands[]>([]);

  // Состояния для общего количества категорий и выбора строки
  const [totalBrands, setTotalBrands] = useState<number>(0);
  const [rowSelection, setRowSelection] = useState({});

  // Состояния для глобального фильтра и отфильтрованных категорий
  const [globalFilter, setGlobalFilter] = useState('');
  const [filteredBrands, setFilteredBrands] = useState<Brands[]>([]);

  // Состояния для выбранной категории и выбранного языка из настроек профиля пользователя
  const [selectedBrands, setSelectedBrands] = useState<Brands | null>(null);
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
  const [addBrandsOpen, setAddBrandsOpen] = useState(false);
  const [editBrandsOpen, setEditBrandsOpen] = useState(false);
  const [deleteBrandsOpen, setDeleteBrandsOpen] = useState(false);

  // Состояние для загрузки данных
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (page: number, pageSize: number) => {
    try {
      const response = await axiosClassic.get(`/brand-admin?page=${page}&page_size=${pageSize}`);
      setBrands(response.data.items);
      setTotalBrands(response.data.total);
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
    setFilteredBrands(
      brands?.filter(cat =>
        cat.translate_content && (cat.translate_content.some(tc => tc.lang_code === selectedLang) || !cat.translate_content.some(tc => tc.lang_code === selectedLang))
      )
    );
  }, [brands, selectedLang]);

  const handleEditBrands = useCallback((brands: Brands) => {
    setSelectedBrands(brands);
    setEditBrandsOpen(true);
  }, []);

  const handleDeleteBrands = useCallback((brands: Brands) => {
    setSelectedBrands(brands);
    setDeleteBrandsOpen(true);
  }, []);

  const columns = useMemo(
    () => createColumns(selectedLang, languages, handleEditBrands, handleDeleteBrands, t),
    [selectedLang, languages]
  );

  const table = useReactTable({
    data: filteredBrands,
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
            <Button variant='contained' onClick={() => setAddBrandsOpen(!addBrandsOpen)} className='is-full sm:is-auto'>
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
          count={totalBrands}
          rowsPerPage={pageSize}
          page={page - 1}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' }
          }}
          labelRowsPerPage={t("rowsPerPage")}
          onPageChange={(_, newPage) => handlePageChange(newPage)}
          onRowsPerPageChange={event => handlePageSizeChange(parseInt(event.target.value, 10))}
          nextIconButtonProps={{ style: { display: 'none' } }}
          backIconButtonProps={{ style: { display: 'none' } }}
        />
        <StyledPagination
          count={Math.ceil(totalBrands / pageSize)}
          page={page}
          color="primary"
          onChange={(_, newPage) => {
            setPage(newPage);
          }}
        />
      </Card>
      <>
        <AddBrandsDrawer
          open={addBrandsOpen}
          userProfile={userProfile}
          handleClose={() => setAddBrandsOpen(!addBrandsOpen)}
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
        <EditBrandsDrawer
          userProfile={userProfile}
          open={editBrandsOpen}
          handleClose={() => setEditBrandsOpen(!editBrandsOpen)}
          fetchData={fetchData}
          brands={selectedBrands}
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
        <DeleteBrandsDrawer
          userProfile={userProfile}
          open={deleteBrandsOpen}
          handleClose={() => setDeleteBrandsOpen(!deleteBrandsOpen)}
          fetchData={fetchData}
          brands={selectedBrands}
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

export default BrandsListTable
