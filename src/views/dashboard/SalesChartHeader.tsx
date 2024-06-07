import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, Divider, Box, Avatar, IconButton } from '@mui/material';
import MonthSelector from './MonthSelector';
import SalesChart from './SalesChart';
import BalanceSummary from './BalanceSummary';
import BarChartIcon from '@mui/icons-material/BarChart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { blue } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion } from 'framer-motion';
import {useVisibility} from "src/@core/context/VisibilityContext";

const timeframes = ['Day', 'Month', 'Year'];

type Timeframe = 'Day' | 'Month' | 'Year';
type Units = 'April' | 'Monday' | '2022' | 'May' | '2023' | 'January' | 'February' | 'March' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const SalesChartHeader: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('Month');
  const [selectedUnit, setSelectedUnit] = useState<Units>('April'); // Значение по умолчанию для месяца
  const [balanceData, setBalanceData] = useState({ totalBalance: 20000, income: 2200, expense: 1000 });

  const isSmallScreen = useMediaQuery('(max-width:1400px)');
  const isPhoneScreen = useMediaQuery('(max-width:600px)');
  const { isHidden, toggleVisibility } = useVisibility();

  const handleTimeframeChange = (timeframe: Timeframe) => {
    setSelectedTimeframe(timeframe);
    switch (timeframe) {
      case 'Day':
        setSelectedUnit('Monday');
        break;
      case 'Month':
        setSelectedUnit('April');
        break;
      case 'Year':
        setSelectedUnit('2022');
        break;
      default:
        setSelectedUnit('April');
    }
  };

  const handleUnitChange = (unit: Units) => {
    setSelectedUnit(unit);
  };

  const handleBalanceUpdate = (data: { totalBalance: number, income: number, expense: number }) => {
    setBalanceData(data);
  };

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}>
      <Card sx={{minWidth: 275, borderRadius: '15px', mb: 3}}>
        <CardContent>
          <Box display="flex" alignItems="center" sx={{mb: 2}}>
            <Avatar sx={{bgcolor: blue[500], mr: 2}}>
              <BarChartIcon/>
            </Avatar>
            <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
              График продаж
            </Typography>
            <IconButton onClick={toggleVisibility}>
              {isHidden ? <VisibilityOffIcon/> : <VisibilityIcon/>}
            </IconButton>
          </Box>
          <Grid container spacing={1}>
            {timeframes.map((timeframe) => (
              <Grid item xs={4} key={timeframe}>
                <Button
                  fullWidth
                  onClick={() => handleTimeframeChange(timeframe as Timeframe)}
                  sx={{
                    borderBottom: selectedTimeframe === timeframe ? '2px solid' : 'none',
                    borderRadius: 0,
                  }}
                >
                  {timeframe}
                </Button>
              </Grid>
            ))}
          </Grid>
          <MonthSelector selectedTimeframe={selectedTimeframe} selectedUnit={selectedUnit}
                         onSelectUnit={handleUnitChange}/>
          <Divider sx={{my: 3}}/>
          <Grid container spacing={3} sx={{mt: 3}} direction={isSmallScreen ? 'column' : 'row'}>
            <Grid item xs={12} md={8}>
              <SalesChart selectedTimeframe={selectedTimeframe} selectedUnit={selectedUnit}
                          onBalanceUpdate={handleBalanceUpdate}/>
              {!isPhoneScreen && (
                <Box mt={2}>
                  <Typography variant="caption" color="textSecondary">
                    * Значения на оси Y представляют собой количество продаж:
                    <ul>
                      <li>Для дней: 0, 25, 50, 75, 100 - количество продаж за час.</li>
                      <li>Для месяцев: 0, 250, 500, 750, 1000 - количество продаж за неделю.</li>
                      <li>Для годов: 0, 200, 400, 600, 800 - количество продаж за месяц.</li>
                    </ul>
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <BalanceSummary {...balanceData} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalesChartHeader;
