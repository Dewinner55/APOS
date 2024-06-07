import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Avatar, Divider, Grid, Button, Select, MenuItem, FormControl, InputLabel, useMediaQuery, IconButton
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { green, blue, red } from '@mui/material/colors';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useVisibility } from "src/@core/context/VisibilityContext";
import { SelectChangeEvent } from '@mui/material/Select';

type Timeframe = 'year' | 'halfYear' | 'quarter' | 'month' | 'week' | 'day';

interface Data {
  averageOrderValue: number;
  increasePercentage: number;
  totalOrders: number;
  totalRevenue: number;
}

interface TimeframeData {
  [key: string]: Data;
}

const data: TimeframeData = {
  year: {
    averageOrderValue: 70,
    increasePercentage: 15,
    totalOrders: 1500,
    totalRevenue: 100000,
  },
  halfYear: {
    averageOrderValue: 65,
    increasePercentage: 12,
    totalOrders: 1200,
    totalRevenue: 80000,
  },
  quarter: {
    averageOrderValue: 60,
    increasePercentage: 10,
    totalOrders: 900,
    totalRevenue: 60000,
  },
  month: {
    averageOrderValue: 55,
    increasePercentage: 8,
    totalOrders: 500,
    totalRevenue: 40000,
  },
  week: {
    averageOrderValue: 50,
    increasePercentage: 5,
    totalOrders: 200,
    totalRevenue: 15000,
  },
  day: {
    averageOrderValue: 45,
    increasePercentage: 3,
    totalOrders: 50,
    totalRevenue: 5000,
  },
};

const AverageOrderValue: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isHidden, toggleVisibility } = useVisibility();

  const [timeframe, setTimeframe] = useState<Timeframe>('month');

  const handleChange = (event: SelectChangeEvent<Timeframe>) => {
    setTimeframe(event.target.value as Timeframe);
  };

  const downloadDocument = (documentName: string) => {
    if (!isHidden) {
      // Здесь должна быть логика скачивания документа
      console.log(`Downloading ${documentName}`);
    }
  };

  const timeframeData = data[timeframe];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          minWidth: 275,
          borderRadius: '20px',
          boxShadow: isDarkMode
            ? '0 0 20px rgba(0,0,0,0.5)'
            : '0 0 20px rgba(0,0,0,0.1)',
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: green[500], mr: 2 }}>
                <TrendingUpIcon />
              </Avatar>
              <Typography variant="h5" component="div">
                Средний чек
              </Typography>
            </Box>
            <IconButton onClick={toggleVisibility}>
              {isHidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            <Typography variant="h4" component="div">
              {isHidden ? '****' : `$${timeframeData.averageOrderValue}`}
            </Typography>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150, ml: 2 }}>
              <InputLabel sx={{ zIndex: 'unset' }} id="timeframe-label">Временной интервал</InputLabel>
              <Select
                labelId="timeframe-label"
                value={timeframe}
                onChange={handleChange}
                label="Временной интервал"
              >
                <MenuItem value="year">Год</MenuItem>
                <MenuItem value="halfYear">Полгода</MenuItem>
                <MenuItem value="quarter">Квартал</MenuItem>
                <MenuItem value="month">Месяц</MenuItem>
                <MenuItem value="week">Неделя</MenuItem>
                <MenuItem value="day">День</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
            <TrendingUpIcon sx={{ color: green[500] }} />
            <Typography variant="body2" component="div" sx={{ ml: 1, color: green[500] }}>
              {isHidden ? '****' : `${timeframeData.increasePercentage}%`} увеличился за последний {timeframe}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Avatar sx={{ bgcolor: blue[500], mr: 2 }}>
                  <ShoppingCartIcon sx={{ color: '#fff' }} />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Всего заказов
                  </Typography>
                  <Typography variant="h6">
                    {isHidden ? '****' : timeframeData.totalOrders}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Avatar sx={{ bgcolor: red[500], mr: 2 }}>
                  <AttachMoneyIcon sx={{ color: '#fff' }} />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Общий доход
                  </Typography>
                  <Typography variant="h6">
                    {isHidden ? '****' : `$${timeframeData.totalRevenue}`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Typography variant="subtitle1" component="div" gutterBottom sx={{ mt: 4 }}>
            Часто используемые документы:
          </Typography>
          <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={2}>
            <Button
              variant="outlined"
              startIcon={<ReceiptIcon />}
              onClick={() => downloadDocument('invoice.pdf')}
              sx={{
                flex: 1,
                borderColor: '#2196f3',
                color: '#2196f3',
                '&:hover': {
                  borderColor: '#1976d2',
                  color: '#1976d2',
                },
              }}
              disabled={isHidden}
            >
              <Typography variant="body2">Счёт-фактура</Typography>
            </Button>
            <Button
              variant="outlined"
              startIcon={<DescriptionIcon />}
              onClick={() => downloadDocument('act_of_completed_work.pdf')}
              sx={{
                flex: 1,
                borderColor: '#2196f3',
                color: '#2196f3',
                '&:hover': {
                  borderColor: '#1976d2',
                  color: '#1976d2',
                },
              }}
              disabled={isHidden}
            >
              <Typography variant="body2">Акт выполненных работ</Typography>
            </Button>
          </Box>
          <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={2} mt={2}>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={() => downloadDocument('return_document.pdf')}
              sx={{
                flex: 1,
                borderColor: '#2196f3',
                color: '#2196f3',
                '&:hover': {
                  borderColor: '#1976d2',
                  color: '#1976d2',
                },
              }}
              disabled={isHidden}
            >
              <Typography variant="body2">Документ о возврате товара</Typography>
            </Button>
            <Button
              variant="outlined"
              startIcon={<LocalShippingIcon />}
              onClick={() => downloadDocument('shipment_document.pdf')}
              sx={{
                flex: 1,
                borderColor: '#2196f3',
                color: '#2196f3',
                '&:hover': {
                  borderColor: '#1976d2',
                  color: '#1976d2',
                },
              }}
              disabled={isHidden}
            >
              <Typography variant="body2">Документ об отгрузке</Typography>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AverageOrderValue;
