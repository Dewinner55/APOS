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
import AddOrderDrawer from "src/views/order/list/drawer/AddOrderDrawer";
import EditOrderDrawer from "src/views/order/list/drawer/EditOrderDrawer";
import DeleteOrderDrawer from "src/views/order/list/drawer/DeleteOrderDrawer";

// Component Filters Imports
import TableFilters from "src/views/order/list/filter/TableFilters";

// Snackbar Imports
import {renderSnackbar} from "src/views/order/list/snackbar/renderSnackbar";

// Debounced Imports
import {DebouncedInput} from "src/views/order/list/filter/debouncedInput";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";
import {Order} from "src/@core/interface/order/interface";

// Util Imports
import {axiosClassic} from "src/api/interseptor";

// Styles Imports
import {StyledPagination, StyledTable} from "src/views/order/styles/styles";
import {createColumns} from "src/views/order/list/table/column/columns";
import {fuzzyFilter} from "src/views/order/list/filter/fuzzyFilter";
import {ThemeColor} from "src/@core/layouts/types";

interface Props {
  userProfile: User;
  languages: Language[];
}

const OrderListTable = ({ userProfile, languages }: Props) => {
  const t = useTranslations('categoryList');

  // Состояния для категорий
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const [deleteMessage, setDeleteMessage] = useState('');
  const [addOrderOpen, setAddOrderOpen] = useState(false);
  const [deleteOrderOpen, setDeleteOrderOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await axiosClassic.get(`/order-admin?page=${page}&page_size=${pageSize}`);
      setOrders(response.data.items);
      setTotalOrders(response.data.total);
      setFilteredOrder(response.data.items);
    } catch (error) {
      console.error('Error fetching orders:', error);
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

  const handleDeleteOrder = useCallback((order) => {
    setSelectedOrder(order);
    setDeleteOrderOpen(true);
  }, []);

  const columns = useMemo(() => createColumns(handleDeleteOrder, t), [handleDeleteOrder, t]);

  const table = useReactTable({
    data: filteredOrder,
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
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1);
    Cookies.set('page', String(newPage + 1), { path: '/' });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    Cookies.set('page_size', String(newPageSize), { path: '/' });
  };

  return (
    <>
      <Card>
        <CardHeader title="Список Заказов" sx={{ padding: '1.25rem' }} />
        <Divider />
        <div className="flex justify-between p-5 gap-4 flex-col items-start sm:flex-row sm:items-center">
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<i className="ri-upload-2-line text-xl" />}
            className="is-full sm:is-auto"
          >
            {t('export')}
          </Button>
          <div className="flex items-center gap-x-4 is-full gap-4 flex-col sm:is-auto sm:flex-row">
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder={t('search')}
              className="is-full sm:is-auto"
            />
            <Button variant="contained" onClick={() => setAddOrderOpen(!addOrderOpen)} className="is-full sm:is-auto">
              {t('addNewCategory')}
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <StyledTable>
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort(),
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className="ri-arrow-up-s-line text-xl" />,
                          desc: <i className="ri-arrow-down-s-line text-xl" />,
                        }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
            </thead>
            <tbody>
            {loading ? (
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} style={{ textAlign: 'center' }}>
                  <CircularProgress />
                </td>
              </tr>
            ) : (
              <>
                {filteredOrder.length === 0 ? (
                  <tr>
                    <td colSpan={table.getVisibleFlatColumns().length} className={`${Table}`}>
                      {t('noDataAvailable')}
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.slice(0, table.getState().pagination.pageSize).map((row, index) => (
                    <tr key={`${row.id}_${index}`} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map((cell) => (
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
          component="div"
          className="border-bs"
          count={totalOrders}
          rowsPerPage={pageSize}
          page={page - 1}
          SelectProps={{ inputProps: { 'aria-label': 'rows per page' } }}
          labelRowsPerPage={t('rowsPerPage')}
          onPageChange={(_, newPage) => handlePageChange(newPage)}
          onRowsPerPageChange={(event) => handlePageSizeChange(parseInt(event.target.value, 10))}
          nextIconButtonProps={{ style: { display: 'none' } }}
          backIconButtonProps={{ style: { display: 'none' } }}
        />
        <StyledPagination
          count={Math.ceil(totalOrders / pageSize)}
          page={page}
          color="primary"
          onChange={(_, newPage) => {
            setPage(newPage);
          }}
        />
      </Card>
    </>
  );
};

export default OrderListTable;
