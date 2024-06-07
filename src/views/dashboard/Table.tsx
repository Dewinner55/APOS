import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import {
  Box,
  Card,
  CardHeader,
  Chip,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  CircularProgress,
  Button,
  Avatar,
  TableSortLabel,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Divider,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { axiosClassic } from "../../api/interseptor";
import { blue } from '@mui/material/colors';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ThemeColor } from "src/@core/types";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useVisibility } from "src/@core/context/VisibilityContext";

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
    color: ThemeColor;
    icon: JSX.Element;
  };
}

const ButtonStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginRight: 10,
  marginTop: 5,
};

const StyledCard = styled(Card)(({ theme }) => ({
  fontFamily: '"General Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: '15px',
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  height: 24,
  fontSize: '0.75rem',
  textTransform: 'capitalize',
  '& .MuiChip-label': { fontWeight: 500 },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  minHeight: 312,
  maxHeight: 312,
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.default,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const PlaceholderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 312,
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
}));

const PlaceholderText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
}));

const DashboardTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Order | 'customer.first_name' | 'customer.phone'>('created_at');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const isSmallScreen = useMediaQuery('(max-width:1400px)');
  const isPhoneScreen = useMediaQuery('(max-width:600px)');
  const { isHidden, toggleVisibility } = useVisibility();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClassic.get('/order-admin?page=1&page_size=5', { timeout: 3000 });
        setOrders(response.data.items);
        setTotalOrders(response.data.total);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statusObj: StatusObj = {
    applied: { color: 'info', icon: <HourglassEmptyIcon /> },
    rejected: { color: 'error', icon: <ErrorIcon /> },
    current: { color: 'primary', icon: <LocalShippingIcon /> },
    resigned: { color: 'warning', icon: <HourglassEmptyIcon /> },
    professional: { color: 'success', icon: <CheckCircleIcon /> },
    pending: { color: 'info', icon: <HourglassEmptyIcon /> },
  };

  const handleRequestSort = (property: keyof Order | 'customer.first_name' | 'customer.phone') => {
    const isAscending = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredOrders = statusFilter === 'all' ? orders : orders.filter(order => order.status === statusFilter);

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aValue: any;
    let bValue: any;
    if (orderBy === 'customer.first_name') {
      aValue = a.customer.first_name;
      bValue = b.customer.first_name;
    } else if (orderBy === 'customer.phone') {
      aValue = a.customer.phone;
      bValue = b.customer.phone;
    } else {
      aValue = a[orderBy];
      bValue = b[orderBy];
    }

    if (aValue < bValue) {
      return orderDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return orderDirection === 'asc' ? 1 : -1;
    }

    return 0;
  });

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <StyledCard>
      <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader
            title={
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ bgcolor: blue[500], mr: 2 }}>
                    <AssignmentIcon />
                  </Avatar>
                  <Typography variant="h5" component="div">
                    Список ордеров
                  </Typography>
                </Box>
                <IconButton onClick={toggleVisibility}>
                  {isHidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </Box>
            }
            subheader={
              <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                <Typography variant='body2' sx={{ fontFamily: '"General Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}>
                  <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Всего {totalOrders} ордеров
                  </Box>
                </Typography>
                <Box display="flex" alignItems="center">
                  <FormControl variant="outlined" size="small" sx={{ minWidth: 200, mr: 2 }}>
                    <InputLabel id="status-filter-label">Статус</InputLabel>
                    <Select
                      labelId="status-filter-label"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      label="Статус"
                    >
                      <MenuItem value="all">Все</MenuItem>
                      {Object.keys(statusObj).map((status) => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            }
            titleTypographyProps={{
              sx: {
                mb: 2.5,
                lineHeight: '2rem !important',
                letterSpacing: '0.15px !important'
              }
            }}
          />
          {loading ? (
            <PlaceholderContainer>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <CircularProgress color="primary" size={80} />
                  <PlaceholderText>Загрузка данных...</PlaceholderText>
                </Box>
              </motion.div>
            </PlaceholderContainer>
          ) : error ? (
            <PlaceholderContainer>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <PlaceholderText>На сервере идут технические работы. Пожалуйста, попробуйте позже.</PlaceholderText>
              </motion.div>
            </PlaceholderContainer>
          ) : (
            <StyledTableContainer>
              <Table stickyHeader>
                <StyledTableHead>
                  <TableRow>
                    <TableCell onClick={() => handleRequestSort('id')} style={{ cursor: 'pointer' }}>
                      <Box display="flex" alignItems="center">
                        <AssignmentIcon sx={{ mr: 1 }} />
                        Id
                        <TableSortLabel
                          active={orderBy === 'id'}
                          direction={orderBy === 'id' ? orderDirection : 'asc'}
                        />
                      </Box>
                    </TableCell>
                    <TableCell onClick={() => handleRequestSort('customer.first_name')} style={{ cursor: 'pointer' }}>
                      <Box display="flex" alignItems="center">
                        <PersonIcon sx={{ mr: 1 }} />
                        First Name
                        <TableSortLabel
                          active={orderBy === 'customer.first_name'}
                          direction={orderBy === 'customer.first_name' ? orderDirection : 'asc'}
                        />
                      </Box>
                    </TableCell>
                    <TableCell onClick={() => handleRequestSort('address')} style={{ cursor: 'pointer' }}>
                      <Box display="flex" alignItems="center">
                        <HomeIcon sx={{ mr: 1 }} />
                        Address
                        <TableSortLabel
                          active={orderBy === 'address'}
                          direction={orderBy === 'address' ? orderDirection : 'asc'}
                        />
                      </Box>
                    </TableCell>
                    <TableCell onClick={() => handleRequestSort('customer.phone')} style={{ cursor: 'pointer' }}>
                      <Box display="flex" alignItems="center">
                        <PhoneIcon sx={{ mr: 1 }} />
                        Phone
                        <TableSortLabel
                          active={orderBy === 'customer.phone'}
                          direction={orderBy === 'customer.phone' ? orderDirection : 'asc'}
                        />
                      </Box>
                    </TableCell>
                    <TableCell onClick={() => handleRequestSort('total_price')} style={{ cursor: 'pointer' }}>
                      <Box display="flex" alignItems="center">
                        <AttachMoneyIcon sx={{ mr: 1 }} />
                        Price
                        <TableSortLabel
                          active={orderBy === 'total_price'}
                          direction={orderBy === 'total_price' ? orderDirection : 'asc'}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell onClick={() => handleRequestSort('created_at')} style={{ cursor: 'pointer' }}>
                      <Box display="flex" alignItems="center">
                        <EventIcon sx={{ mr: 1 }} />
                        Created at
                        <TableSortLabel
                          active={orderBy === 'created_at'}
                          direction={orderBy === 'created_at' ? orderDirection : 'asc'}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center">Details</TableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {sortedOrders.map((order) => (
                    <TableRow key={order.id} hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.875rem' }}>
                          {isHidden ? '****' : order.id.substring(0, 6)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.875rem' }}>{isHidden ? '****' : order.customer.first_name}</TableCell>
                      <TableCell sx={{ fontSize: '0.875rem' }}>{isHidden ? '****' : order.address}</TableCell>
                      <TableCell sx={{ fontSize: '0.875rem' }}>{isHidden ? '****' : order.customer.phone}</TableCell>
                      <TableCell sx={{ fontSize: '0.875rem' }}>{isHidden ? '****' : order.total_price}</TableCell>
                      <TableCell>
                        <StatusChip
                          label={isHidden ? '****' : order.status}
                          color={statusObj[order.status].color}
                          icon={statusObj[order.status].icon}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.875rem' }}>
                          {isHidden ? '****' : format(new Date(order.created_at), 'yyyy-MM-dd HH:mm:ss')}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          startIcon={<InfoIcon />}
                          sx={{ minWidth: 'auto', padding: '4px 8px' }}
                        >
                          {isHidden ? '****' : 'Подробнее'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          )}
          <Divider />
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2} flexDirection={isSmallScreen ? 'column' : 'row'}>
            {!isPhoneScreen && (
              <Typography variant="caption" color="textSecondary">
                <ul>
                  <li>Здесь выдаются 5 последних ордеров.</li>
                  <li>Вы можете воспользоваться фильтрацией, чтобы выбрать интересующий вас статус платежа.</li>
                  <li>Вы можете воспользоваться сортировкой нажав на интересующий вас столбец.</li>
                </ul>
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontFamily: '"General Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                ml: 2,
                mr: 8
              }}
            >
              Список ордеров
            </Button>
          </Box>
        </Card>
      </motion.div>
    </StyledCard>
  );
};

export default DashboardTable;
