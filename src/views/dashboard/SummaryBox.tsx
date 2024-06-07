import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface SummaryBoxProps {
  title: string;
  value: string;
  percentage: string;
  icon: React.ReactNode;
  change: string;
  changeColor: string;
  changeIcon: React.ReactNode;
  avatarColor: string;
  sx?: object; // Добавляем свойство sx
}

const SummaryBox: React.FC<SummaryBoxProps> = ({
                                                 title,
                                                 value,
                                                 percentage,
                                                 icon,
                                                 change,
                                                 changeColor,
                                                 changeIcon,
                                                 avatarColor,
                                                 sx
                                               }) => (
  <Box display="flex" alignItems="center" sx={sx}>
    <Avatar sx={{ bgcolor: avatarColor, mr: 2 }}>
      {icon}
    </Avatar>
    <Box>
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>{title}</Typography>
      <Typography variant="h6" sx={{ fontSize: 16 }}>{value}</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ fontSize: 10 }}>
        {percentage}%
      </Typography>
      <Box display="flex" alignItems="center" color={changeColor}>
        {changeIcon}
        <Typography variant="body2" color="inherit" sx={{ fontSize: 10 }}>
          {change}%
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default SummaryBox;
