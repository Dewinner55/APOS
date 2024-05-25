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
import AddProductDrawer from "src/views/products/list/drawer/AddProductDrawer";
import EditProductDrawer from "src/views/products/list/drawer/EditProductDrawer";
import DeleteProductDrawer from "src/views/products/list/drawer/DeleteProductDrawer";

// Component Filters Imports
import {fuzzyFilter} from "src/views/products/list/filter/fuzzyFilter";

// SSR Imports
import {checkAndRefreshToken} from "src/@core/SSR/cookie/getTokenExpiry";

// Snackbar Imports
import {renderSnackbar} from "src/views/products/list/snackbar/renderSnackbar";

// Debounced Imports
import {DebouncedInput} from "src/views/products/list/filter/debouncedInput";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";
import {Category} from "src/@core/interface/category/interface";
import {Subcategory} from "src/@core/interface/subcategory/interface";
import {Product} from "src/@core/interface/products/interface";

// @ts-ignore


// Styles Imports
import {StyledPagination, StyledTable} from "src/views/products/styles/styles";
import {createColumns} from "src/views/products/list/table/column/columns";
import LanguageFilter from "src/views/products/list/filter/LanguageFilter";
import CategoryFilter from "src/views/products/list/filter/CategoryFilter";

interface Props {
  userProfile: User;
  languages: Language[];
}

const ProductsListTable = ({ userProfile, languages }: Props) => {
  // Состояния для категорий, подкатегорий и продуктов
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategory, setSubcategory] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Состояния для общего количества продуктов и выбора строки
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [rowSelection, setRowSelection] = useState({});

  // Состояния для глобального фильтра и отфильтрованных подкатегорий
  const [globalFilter, setGlobalFilter] = useState('');
  const [filteredSubcategory, setFilteredSubcategory] = useState<Subcategory[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Состояния для выбранной категории и выбранного языка из настроек профиля пользователя
  const [selectedCategory, setSelectedCategory] = useState<string>('reset');
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product | null>(null);
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

  // Обновление куков при изменении page и pageSize
  useEffect(() => {
    Cookies.set('page', String(page), { path: '/' });
  }, [page]);

  useEffect(() => {
    Cookies.set('page_size', String(pageSize), { path: '/' });
  }, [pageSize]);

  // Состояния для сообщений об успешном действии, изменении и удалении
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [editMessage, setEditMessage] = useState<string>('');
  const [deleteMessage, setDeleteMessage] = useState<string>('');

  // Состояния для открытия модальных окон добавления, редактирования и удаления продуктов
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [deleteProductOpen, setDeleteProductOpen] = useState(false);

  // Состояние для загрузки данных
  const [loading, setLoading] = useState<boolean>(false);

  // Функция для получения категорий
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

  // Функция для получения подкатегорий
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axiosClassic.get('/subcategory-admin?page=1&page_size=100');
        setSubcategory(response.data.items);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };
    fetchSubcategories();
  }, []);

  // Функция для получения данных продуктов
  const fetchData = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const isTokenValid = await checkAndRefreshToken();
      if (!isTokenValid) {
        alert('Токен недействителен. Пожалуйста, войдите снова.');
        setLoading(false);

        return;
      }
      const response = await axiosClassic.get(`/product-admin?page=${page}&page_size=${pageSize}`);
      setProducts(response.data.items);
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Произошла ошибка при загрузке данных. Пожалуйста, попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Вызов fetchData при изменении page и pageSize
  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize, fetchData]);

  // Фильтрация подкатегорий по выбранному языку и категории
  useEffect(() => {
    setFilteredProducts(
      products?.filter(cat => {
        const matchesLang = selectedLang ? cat.translate_content.some(tc => tc.lang_code === selectedLang) : true;
        const matchesCategory = selectedCategory && selectedCategory !== 'reset'
          ? categories.some(category => category.id === selectedCategory && category.subcategories.some(subcat => subcat.id === cat.id))
          : true;

        return matchesLang && matchesCategory;
      })
    );
  }, [products, selectedLang, selectedCategory, categories]);

  // Обработчики для редактирования и удаления продукта
  const handleEditProduct = useCallback((product: Product) => {
    setSelectedProducts(product);
    setEditProductOpen(true);
  }, []);

  const handleDeleteProduct = useCallback((product: Product) => {
    setSelectedProducts(product);
    setDeleteProductOpen(true);
  }, []);

  // Создание колонок таблицы
  const columns = useMemo(
    () => createColumns(selectedLang, languages, handleEditProduct, handleDeleteProduct),
    [selectedLang, languages, handleEditProduct, handleDeleteProduct]
  );

  // Конфигурация таблицы
  const table = useReactTable({
    data: filteredProducts,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
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
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  // Функции для обработки изменений страницы и размера страницы
  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1);
    Cookies.set('page', String(newPage + 1), { path: '/' });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    Cookies.set('page_size', String(newPageSize), { path: '/' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === 'reset' ? '' : category);
  };

  return (
    <>
      <Card>
        <CardHeader title='title' sx={{padding: '1.25rem'}}/>
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
            'export'
          </Button>
          <div className='flex items-center gap-x-4 is-full gap-4 flex-col sm:is-auto sm:flex-row'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder="search"
              className='is-full sm:is-auto'
            />
            <Button variant='contained' onClick={() => setAddProductOpen(!addProductOpen)}
                    className='is-full sm:is-auto'>
              "addNew"
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
                      "no"
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
          count={totalProducts}
          rowsPerPage={pageSize}
          page={page - 1}
          SelectProps={{
            inputProps: {'aria-label': 'rows per page'}
          }}
          labelRowsPerPage="row per page"
          onPageChange={(_, newPage) => handlePageChange(newPage)}
          onRowsPerPageChange={event => handlePageSizeChange(parseInt(event.target.value, 10))}
          nextIconButtonProps={{style: {display: 'none'}}}
          backIconButtonProps={{style: {display: 'none'}}}
        />
        <StyledPagination
          count={Math.ceil(totalProducts / pageSize)}
          page={page}
          color="primary"
          onChange={(_, newPage) => {
            setPage(newPage);
          }}
        />
      </Card>
      <>
        <AddProductDrawer
          open={addProductOpen}
          userProfile={userProfile}
          handleClose={() => setAddProductOpen(!addProductOpen)}
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
        {/*<EditProductDrawer*/}
        {/*  userProfile={userProfile}*/}
        {/*  open={editProductOpen}*/}
        {/*  handleClose={() => setEditProductOpen(!editProductOpen)}*/}
        {/*  fetchData={fetchData}*/}
        {/*  product={selectedProducts}*/}
        {/*  languages={languages}*/}
        {/*  page={page}*/}
        {/*  pageSize={pageSize}*/}
        {/*  showSuccessMessage={setEditMessage}*/}
        {/*  categories={categories}*/}
        {/*/>*/}
        {editMessage && renderSnackbar({
          color: 'orange',
          message: editMessage,
          showMessage: () => setEditMessage(''),
          open: true,
          autoHideDuration: 6000,
          onClose: () => setEditMessage('')
        })}
        {/*<DeleteProductDrawer*/}
        {/*  userProfile={userProfile}*/}
        {/*  open={deleteProductOpen}*/}
        {/*  handleClose={() => setDeleteProductOpen(!deleteProductOpen)}*/}
        {/*  fetchData={fetchData}*/}
        {/*  product={selectedProducts}*/}
        {/*  languages={languages}*/}
        {/*  page={page}*/}
        {/*  pageSize={pageSize}*/}
        {/*  showSuccessMessage={setDeleteMessage}*/}
        {/*  categories={categories}*/}
        {/*/>*/}
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

export default ProductsListTable
