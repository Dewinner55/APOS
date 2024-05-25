// ** Format
import format from 'date-fns/format';

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// interface Import
import {axiosClassic} from "../../api/interseptor";
import {useEffect, useState} from "react";
import CardHeader from "@mui/material/CardHeader";

interface Customer {
  id: string;
  email: string;
  first_name: string;
  display_name: string;
  phone: string;
}

interface Order {
  address: string;
  customer: Customer;
  id: string;
  total_price: number;
  status: string;
  created_at: string;
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

// ** Style
const ButtonStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginRight: 10,
  marginTop: 5,
};

const DashboardTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClassic.get('/order-admin?page=1&page_size=5');
        setOrders(response.data.items);
        setTotalOrders(response.data.total);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, []);

  const statusObj: StatusObj = {
    applied: { color: 'info' },
    rejected: { color: 'error' },
    current: { color: 'primary' },
    resigned: { color: 'warning' },
    professional: { color: 'success' },
    pending: { color: 'info' },
  };

  return (
    <Card>
      <CardHeader
        title='Список ордеров'
        action={
          <Box sx={ButtonStyle}>
            <Button
              variant="contained"
              color="primary"
            >
              Весь список ордеров
            </Button>
          </Box>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Всего {totalOrders} ордеров
            </Box>{' '}
            😎
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      {loading ? ( // Если данные загружаются, отображаем Placeholder
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 312 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : ( // Если данные загружены, отображаем таблицу
        <TableContainer className="table-container" sx={{ minHeight: 312, maxHeight: 312 }} aria-label='table in dashboard'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Addres</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>
                    <Typography>
                      {order.id.substring(0, 6)}
                    </Typography>
                  </TableCell>
                  <TableCell>{order.customer.first_name}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.customer.phone}</TableCell>
                  <TableCell>{order.total_price}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={statusObj[order.status].color}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {format(new Date(order.created_at), 'yyyy-MM-dd HH:mm:ss')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  )
}

export default DashboardTable
