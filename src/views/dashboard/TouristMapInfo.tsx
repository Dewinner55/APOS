import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, useMediaQuery, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {blue, green, red} from '@mui/material/colors';
import { motion } from 'framer-motion';

const TouristMapInfo: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLearnMore = () => {
    // Логика для кнопки "Узнать подробнее"
    console.log('Узнать подробнее о туристической карте Бишкека');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card
        sx={{
          minWidth: 275,
          borderRadius: '20px',
          mt: 4,
          ml: 6,
          background: 'none',
          boxShadow: 'none'
        }}
      >
        <CardContent sx={{ pl: 2 }}>
          <Box display="flex" alignItems="center" justifyContent='center' mb={3}>
            <Avatar sx={{ bgcolor: blue[500], mr: 2 }}>
              <LocationOnIcon />
            </Avatar>
            <Typography variant="h5" component="div">
              <h1 style={{ color: red[500] }}>SClub</h1>
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
            Туристическая карта Бишкека предлагает множество интересных мест для посещения. Включает музеи, парки, исторические достопримечательности и многое другое.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
            Карта включает в себя <span style={{ color: green[500] }}>10% скидку</span> на <span style={{ color: blue[500] }}>туризм</span>, <span style={{ color: blue[500] }}>еду</span>, <span style={{ color: blue[500] }}>развлечения</span>, <span style={{ color: blue[500] }}>медицину</span> и многое другое.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
            Используйте карту для навигации по городу и открытия новых интересных мест. Карта включает в себя маршруты общественного транспорта и пешие маршруты.
          </Typography>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button variant="contained" color="primary" onClick={handleLearnMore}>
              Узнать подробнее
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TouristMapInfo;
