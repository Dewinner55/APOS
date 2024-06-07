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
  IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import { axiosClassic } from "../../api/interseptor";
import { blue } from '@mui/material/colors';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useVisibility } from "src/@core/context/VisibilityContext";
import { ThemeColor } from "src/@core/types";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from '@mui/icons-material/Email';
import GroupIcon from '@mui/icons-material/Group';

interface User {
  email: string;
  first_name: string;
  created_at: string;
  is_staff: boolean;
  is_active: boolean;
  group: string;
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor;
    icon: JSX.Element;
  };
}

interface ToggleItemProps {
  active: boolean;
}

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

const ToggleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
  cursor: 'pointer',
}));

const ToggleItem = styled(motion.div)<ToggleItemProps>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: active ? theme.palette.primary.main : theme.palette.background.paper,
  color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  boxShadow: active ? `0 4px 20px rgba(0, 0, 0, 0.3)` : `0 2px 10px rgba(0, 0, 0, 0.1)`,
  flex: 1,
  transition: 'box-shadow 0.3s, transform 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 25px rgba(0, 0, 0, 0.2)`,
  },
}));

const MotionCard = motion(StyledCard);
const MotionBox = motion(Box);

const StaffAndClientTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof User>('created_at');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [staffStatusFilter, setStaffStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'staff' | 'client'>('staff');
  const isSmallScreen = useMediaQuery('(max-width:1400px)');
  const isPhoneScreen = useMediaQuery('(max-width:600px)');
  const { isHidden, toggleVisibility } = useVisibility();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClassic.get('/user-admin/get-users?page=1&page_size=5', { timeout: 3000 });
        setUsers(response.data.items);
        setTotalUsers(response.data.total);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRequestSort = (property: keyof User) => {
    const isAscending = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredUsers = users.filter(user => {
    const statusMatch = statusFilter === 'all' || user.is_active.toString() === statusFilter;
    const staffStatusMatch = staffStatusFilter === 'all' || (staffStatusFilter === 'true' ? user.is_staff : !user.is_staff);
    const viewMatch = viewMode === 'staff' ? user.is_staff : !user.is_staff;

    return statusMatch && staffStatusMatch && viewMatch;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return orderDirection === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return orderDirection === 'asc' ? 1 : -1;
    }

    return 0;
  });

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <MotionCard ref={ref} initial={{ opacity: 0, y: 50 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }} transition={{ duration: 0.5 }}>
      <ToggleBox>
        <ToggleItem active={viewMode === 'staff'} onClick={() => setViewMode('staff')}>
          <Avatar sx={{ bgcolor: blue[500], mr: 2 }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h6">Список персонала</Typography>
        </ToggleItem>
        <ToggleItem active={viewMode === 'client'} onClick={() => setViewMode('client')}>
          <Avatar sx={{ bgcolor: blue[500], mr: 2 }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h6">Список клиентов</Typography>
        </ToggleItem>
      </ToggleBox>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: blue[500], mr: 2 }}>
                <PersonIcon />
              </Avatar>
              <Typography variant="h5" component="div">
                {viewMode === 'staff' ? 'Список персонала' : 'Список клиентов'}
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
                Всего {totalUsers} {viewMode === 'staff' ? 'сотрудников' : 'клиентов'}
              </Box>
            </Typography>
            <Box display="flex" alignItems="center">
              <FormControl variant="outlined" size="small" sx={{ minWidth: 150, mr: 2 }}>
                <InputLabel id="staff-status-filter-label">Статус персонала</InputLabel>
                <Select
                  labelId="staff-status-filter-label"
                  value={staffStatusFilter}
                  onChange={(e) => setStaffStatusFilter(e.target.value)}
                  label="Статус персонала"
                >
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="true">Персонал</MenuItem>
                  <MenuItem value="false">Не персонал</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                <InputLabel id="status-filter-label">Активность</InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Активность"
                >
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="true">Активные</MenuItem>
                  <MenuItem value="false">Неактивные</MenuItem>
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
        <MotionBox display="flex" justifyContent="center" alignItems="center" minHeight={312} borderRadius={1} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CircularProgress color="primary" size={80} />
            <PlaceholderText>Загрузка данных...</PlaceholderText>
          </Box>
        </MotionBox>
      ) : error ? (
        <MotionBox display="flex" justifyContent="center" alignItems="center" minHeight={312} borderRadius={1} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <PlaceholderText>На сервере идут технические работы. Пожалуйста, попробуйте позже.</PlaceholderText>
        </MotionBox>
      ) : (
        <StyledTableContainer>
          <Table stickyHeader>
            <StyledTableHead>
              <TableRow>
                <TableCell onClick={() => handleRequestSort('email')} style={{ cursor: 'pointer' }}>
                  <Box display="flex" alignItems="center">
                    <EmailIcon sx={{ mr: 1 }} />
                    Email
                    <TableSortLabel
                      active={orderBy === 'email'}
                      direction={orderBy === 'email' ? orderDirection : 'asc'}
                    />
                  </Box>
                </TableCell>
                <TableCell onClick={() => handleRequestSort('first_name')} style={{ cursor: 'pointer' }}>
                  <Box display="flex" alignItems="center">
                    <PersonIcon sx={{ mr: 1 }} />
                    Имя
                    <TableSortLabel
                      active={orderBy === 'first_name'}
                      direction={orderBy === 'first_name' ? orderDirection : 'asc'}
                    />
                  </Box>
                </TableCell>
                <TableCell onClick={() => handleRequestSort('created_at')} style={{ cursor: 'pointer' }}>
                  <Box display="flex" alignItems="center">
                    <EventIcon sx={{ mr: 1 }} />
                    Дата создания
                    <TableSortLabel
                      active={orderBy === 'created_at'}
                      direction={orderBy === 'created_at' ? orderDirection : 'asc'}
                    />
                  </Box>
                </TableCell>
                {viewMode === 'staff' && (
                  <TableCell>Статус персонала</TableCell>
                )}
                <TableCell>Активность</TableCell>
                {viewMode === 'staff' && (
                  <TableCell onClick={() => handleRequestSort('group')} style={{ cursor: 'pointer' }}>
                    <Box display="flex" alignItems="center">
                      <GroupIcon sx={{ mr: 1 }} />
                      Группа
                      <TableSortLabel
                        active={orderBy === 'group'}
                        direction={orderBy === 'group' ? orderDirection : 'asc'}
                      />
                    </Box>
                  </TableCell>
                )}
                <TableCell align="center">Подробнее</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow key={user.email} hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      {isHidden ? '****' : user.email}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{isHidden ? '****' : user.first_name}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{isHidden ? '****' : format(new Date(user.created_at), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
                  {viewMode === 'staff' && (
                    <TableCell>
                      <StatusChip
                        label={isHidden ? '****' : (user.is_staff ? 'Персонал' : 'Не персонал')}
                        color={user.is_staff ? 'success' : 'default'}
                        icon={user.is_staff ? <CheckCircleIcon /> : <ErrorIcon />}
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <StatusChip
                      label={isHidden ? '****' : (user.is_active ? 'Активен' : 'Неактивен')}
                      color={user.is_active ? 'success' : 'default'}
                      icon={user.is_active ? <CheckCircleIcon /> : <ErrorIcon />}
                    />
                  </TableCell>
                  {viewMode === 'staff' && (
                    <TableCell sx={{ fontSize: '0.875rem' }}>{isHidden ? '****' : user.group}</TableCell>
                  )}
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
              <li>Здесь выдаются 5 последних {viewMode === 'staff' ? 'сотрудников' : 'клиентов'}.</li>
              <li>Вы можете воспользоваться фильтрацией, чтобы выбрать активных или неактивных {viewMode === 'staff' ? 'сотрудников' : 'клиентов'}.</li>
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
          Список {viewMode === 'staff' ? 'сотрудников' : 'клиентов'}
        </Button>
      </Box>
    </MotionCard>
  );
};

export default StaffAndClientTable;
