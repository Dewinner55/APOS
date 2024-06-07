import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Divider, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import { green, red, blue, orange } from '@mui/material/colors';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SummaryBox from './SummaryBox';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useInView } from 'react-intersection-observer';
import {useVisibility} from "src/@core/context/VisibilityContext";

interface BalanceSummaryProps {
  totalBalance: number;
  income: number;
  expense: number;
}

const BalanceSummary: React.FC<BalanceSummaryProps> = ({ totalBalance, income, expense }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isSmallScreen = useMediaQuery('(max-width:1400px)');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { isHidden, toggleVisibility } = useVisibility();

  const incomePercentage = ((income / totalBalance) * 100).toFixed(2);
  const expensePercentage = ((expense / totalBalance) * 100).toFixed(2);
  const netBalance = totalBalance - expense + income;
  const monthlyChange = income - expense;

  const previousIncome = 2000;
  const previousExpense = 900;
  const incomeChange = ((income - previousIncome) / previousIncome * 100).toFixed(2);
  const expenseChange = ((expense - previousExpense) / previousExpense * 100).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      ref={ref}
    >
      <Card sx={{
        width: '100%',
        height: isSmallScreen ? 'auto' : '590px',  // убираем фиксированную высоту на мобильной версии
        borderRadius: '15px',
        p: 4,
        boxShadow: 'none',
        opacity: 1,
        background: isDarkMode
          ? 'linear-gradient(135deg, #3a3a3a 0%, #1f1f1f 100%)'
          : 'linear-gradient(135deg, #F4F5FA 0%, #F4F5FA 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid lightgrey'
      }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box
            display="flex"
            alignItems="center"
            mb={6}
            sx={isSmallScreen ? { placeContent: 'center' } : {}}
          >
            <Avatar sx={{ bgcolor: blue[500], mr: 2, width: 35, height: 35 }}>
              <AttachMoneyIcon sx={{ fontSize: 35 }} />
            </Avatar>
            <Typography variant="h6" component="div">
              Total Balance
            </Typography>
          </Box>
          <Typography
            variant="h5"
            component="div"
            sx={{ mb: 1, textAlign: isSmallScreen ? '-webkit-center' : 'left' }}
          >
            {isHidden ? '****' : `$${totalBalance.toLocaleString()}`}
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            mt={3}
            sx={{ flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '20px' }}
          >
            <SummaryBox
              title="Income"
              value={isHidden ? '****' : `$${income.toLocaleString()}`}
              percentage={isHidden ? '****' : incomePercentage}
              icon={<TrendingUpIcon />}
              change={isHidden ? '****' : incomeChange}
              changeColor={parseFloat(incomeChange) > 0 ? green[500] : red[500]} // Используем parseFloat
              changeIcon={parseFloat(incomeChange) > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} // Используем parseFloat
              avatarColor={green[500]}
              sx={{ mb: 2 }}
            />
            <SummaryBox
              title="Expense"
              value={isHidden ? '****' : `$${expense.toLocaleString()}`}
              percentage={isHidden ? '****' : expensePercentage}
              icon={<TrendingDownIcon />}
              change={isHidden ? '****' : expenseChange}
              changeColor={parseFloat(expenseChange) > 0 ? red[500] : green[500]} // Используем parseFloat
              changeIcon={parseFloat(expenseChange) > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} // Используем parseFloat
              avatarColor={red[500]}
              sx={{ mb: 2 }}
            />
            <SummaryBox
              title="Net Balance"
              value={isHidden ? '****' : `$${netBalance.toLocaleString()}`}
              percentage={isHidden ? '****' : ((netBalance / totalBalance) * 100).toFixed(2)}
              icon={<SwapHorizIcon />}
              change={isHidden ? '****' : incomeChange}
              changeColor={orange[500]}
              changeIcon={<SwapHorizIcon />}
              avatarColor={orange[500]}
              sx={{ mb: 2 }}
            />
            <SummaryBox
              title="Change"
              value={isHidden ? '****' : `$${monthlyChange.toLocaleString()}`}
              percentage={isHidden ? '****' : ((monthlyChange / totalBalance) * 100).toFixed(2)}
              icon={<TrendingUpIcon />}
              change={isHidden ? '****' : incomeChange}
              changeColor={green[500]}
              changeIcon={<TrendingUpIcon />}
              avatarColor={green[500]}
              sx={{ mb: 1 }}
            />
          </Box>
          <Divider sx={{ my: 4 }} />
          <Box display="flex" justifyContent="center" mt="auto">
            <Button variant="contained" color="primary">
              Узнать подробнее
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BalanceSummary;
