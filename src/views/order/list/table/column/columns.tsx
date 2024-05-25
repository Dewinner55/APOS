// React Imports
import React from "react";
import format from 'date-fns/format';

// Next Imports
import Link from "next/link";

// MUI Imports
import {createColumnHelper, Row, Table} from "@tanstack/react-table";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";

// Styles Imports
import {
  deleteIconStyle,
  downloadIconStyle,
  eyeIconStyle,
} from "src/views/order/styles/styles";

// Component Imports

// Type Imports
type TFunction = (key: string) => string;
type OrderTypeWithAction = Order & { action?: string };

// Interface Imports
import {Order} from "src/@core/interface/order/interface";
import {ThemeColor} from "src/@core/layouts/types";

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const columnHelper = createColumnHelper<OrderTypeWithAction>();

const statusObj: StatusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' },
  pending: { color: 'info' },
};

export const createColumns = (
  handleDeleteOrder: (order: Order) => void,
  t: TFunction
) => [
  {
    id: 'select',
    header: ({table}: { table: Table<OrderTypeWithAction> }) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({row}: { row: Row<OrderTypeWithAction> }) => (
      <Checkbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },
  columnHelper.accessor('customer.email', {
    header: 'Email клиента',
    cell: ({row}) => row.original.customer.email,
  }),
  columnHelper.accessor('address', {
    header: 'Адрес',
    cell: ({row}) => row.original.address,
  }),
  columnHelper.accessor('total_price', {
    header: 'Общая стоимость',
    cell: ({row}) => row.original.total_price,
  }),
  columnHelper.accessor('status', {
    header: 'Статус',
    cell: ({row}) => (
      <Chip
        label={t(row.original.status)}
        color={statusObj[row.original.status].color}
        sx={{
          height: 24,
          fontSize: '0.75rem',
          textTransform: 'capitalize',
          '& .MuiChip-label': {
            fontWeight: 500,
          },
        }}
      />
    ),
  }),
  columnHelper.accessor('created_at', {
    header: 'Дата создания',
    cell: ({row}) => format(new Date(row.original.created_at), 'Pp'),
  }),
  columnHelper.accessor('action', {
    header: 'Действия',
    cell: ({row}) => (
      <div className="flex items-center">
        <Link href={`http://localhost:3009/order/view/${row.original.id}`}>
          <IconButton sx={eyeIconStyle}>
            <i className='ri-eye-line text-[22px] text-textSecondary'/>
          </IconButton>
        </Link>
        <IconButton onClick={() => handleDeleteOrder(row.original)} sx={deleteIconStyle}>
          <i className='ri-delete-bin-7-line text-[22px] text-textSecondary'/>
        </IconButton>
        <IconButton sx={downloadIconStyle}>
          <i className='ri-download-line text-[22px] text-textSecondary'/>
        </IconButton>
      </div>
    ),
    enableSorting: false,
  }),
];
