import React, { FC, useMemo, useEffect } from 'react';
import { Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceDot } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from "@mui/material/styles";
import { useInView } from 'react-intersection-observer';
import {useVisibility} from "src/@core/context/VisibilityContext";

const generateYearData = () => Array.from({ length: 12 }, (_, i) => ({ name: new Date(0, i).toLocaleString('default', { month: 'short' }), sales: Math.random() * 1000 }));

const generateMonthData = () => Array.from({ length: 4 }, (_, i) => ({ name: `Week ${i + 1}`, sales: Math.random() * 1000 }));

const generateDayData = () => Array.from({ length: 24 }, (_, i) => ({ name: `${i}:00`, sales: Math.random() * 100 }));

const data = {
  '2022': generateYearData(),
  '2023': generateYearData(),
  January: generateMonthData(),
  February: generateMonthData(),
  March: generateMonthData(),
  April: generateMonthData(),
  May: generateMonthData(),
  June: generateMonthData(),
  July: generateMonthData(),
  August: generateMonthData(),
  September: generateMonthData(),
  October: generateMonthData(),
  November: generateMonthData(),
  December: generateMonthData(),
  Monday: generateDayData(),
  Tuesday: generateDayData(),
  Wednesday: generateDayData(),
  Thursday: generateDayData(),
  Friday: generateDayData(),
  Saturday: generateDayData(),
  Sunday: generateDayData(),
};

type Timeframe = 'Day' | 'Month' | 'Year';
type Units = keyof typeof data;

interface SalesChartProps {
  selectedTimeframe: Timeframe;
  selectedUnit: Units;
  onBalanceUpdate: (data: { totalBalance: number, income: number, expense: number }) => void;
}

const SalesChart: FC<SalesChartProps> = ({ selectedUnit, onBalanceUpdate }) => {
  // Hooks
  const theme = useTheme();
  const { isHidden } = useVisibility();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timeframeData = useMemo(() => data[selectedUnit], [selectedUnit]);

  useEffect(() => {
    const totalSales = timeframeData.reduce((sum, { sales }) => sum + sales, 0);
    const income = totalSales * 0.1; // Example calculation
    const expense = totalSales * 0.05; // Example calculation

    onBalanceUpdate({
      totalBalance: totalSales,
      income,
      expense,
    });
  }, [timeframeData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      ref={ref}
    >
      <Card sx={{ minWidth: 275, borderRadius: '15px', background: 'transparent', boxShadow: 'none' }}>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={isHidden ? [] : timeframeData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke={theme.palette.text.primary} />
              <YAxis stroke={theme.palette.text.primary} />
              <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, borderColor: '#1f1f1f' }} />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke={theme.palette.primary.main}
                strokeWidth={3}
                dot={{ r: 5, stroke: '#9155FD', strokeWidth: 2 }}
                activeDot={{ r: 8, stroke: '#9155FD', strokeWidth: 2 }}
              />
              {timeframeData.map((entry, index) => (
                <ReferenceDot key={index} x={entry.name} y={entry.sales} r={6} fill={theme.palette.primary.main} stroke={theme.palette.primary.main} isFront />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalesChart;
