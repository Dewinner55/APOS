import React, { useState, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Units = 'April' | 'Monday' | '2022' | 'May' | '2023' | 'January' | 'February' | 'March' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = ['2022', '2023'];

interface TimeUnitsSelectorProps {
  units: Units[];
  selectedUnit: Units;
  onSelectUnit: (unit: Units) => void;
}

const TimeUnitsSelector: React.FC<TimeUnitsSelectorProps> = ({ units, selectedUnit, onSelectUnit }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Box display="flex" alignItems="center" mt={2}>
      <IconButton onClick={() => (containerRef.current!.scrollLeft -= 100)}>
        <ArrowBackIosIcon />
      </IconButton>
      <Box
        ref={containerRef}
        display="flex"
        overflow="auto"
        flexGrow={1}
        sx={{
          gap: 2,
          whiteSpace: 'nowrap',
          justifyContent: 'space-evenly', // Добавляем justifyContent: 'space-evenly'
          '&::-webkit-scrollbar': { display: 'none' }, // Скрываем полосу прокрутки
        }}
      >
        {units.map((unit) => (
          <Typography
            key={unit}
            variant="body2"
            onClick={() => onSelectUnit(unit)}
            sx={{
              color: selectedUnit === unit ? 'primary.main' : 'text.secondary',
              cursor: 'pointer',
              padding: '0 8px',
              textAlign: 'center',
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
          >
            {unit}
          </Typography>
        ))}
      </Box>
      <IconButton onClick={() => (containerRef.current!.scrollLeft += 100)}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

interface MonthSelectorProps {
  selectedTimeframe: string;
  selectedUnit: Units;
  onSelectUnit: (unit: Units) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedTimeframe, selectedUnit, onSelectUnit }) => {
  let units: Units[];

  switch (selectedTimeframe) {
    case 'Day':
      units = days as Units[];
      break;
    case 'Month':
      units = months as Units[];
      break;
    case 'Year':
      units = years as Units[];
      break;
    default:
      units = months as Units[];
  }

  return (
    <TimeUnitsSelector units={units} selectedUnit={selectedUnit} onSelectUnit={onSelectUnit} />
  );
};

export default MonthSelector;
