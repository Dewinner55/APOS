import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Banner: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isLargeScreen = useMediaQuery('(min-width:1400px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:900px)');

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (isSmallScreen) {
    return null; // Скрываем баннер на мобильных устройствах
  }

  const filterBrightness = isDarkMode ? 'brightness(30%)' : 'brightness(70%)';

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
        height: isLargeScreen ? '800px' : isMediumScreen ? '300px' : '1135px',
        overflow: 'hidden',
        color: '#fff',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 1.1 }}
        transition={{ duration: 0.5 }}
        ref={ref}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/images/dashboard/730f64a2-3319-4a43-a8f7-8b64483505932.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: filterBrightness,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Special Offer!
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Get 50% off on all products. Limited time offer!
        </Typography>
        <Button variant="contained" color="primary">
          Shop Now
        </Button>
      </Box>
    </Box>
  );
};

export default Banner;
