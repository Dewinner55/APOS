import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Button, Stack, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Banner = {
  id: number;
  title: string;
  description: string;
  image: string;
  backgroundColor: string;
  buttonText: string;
  badge: string;
  textPosition: 'left' | 'right' | 'center';
};

const banners: Banner[] = [
  {
    id: 1,
    title: 'Подключайте ИИ на свои социальные сети',
    description: 'Instagram, Telegram',
    image: '/images/dashboard/b9d97c2e-68af-47ca-9a77-ae4ba65005b8.jpg',
    backgroundColor: '#9155FD',
    buttonText: 'Поднять продажи',
    badge: 'New',
    textPosition: 'left',
  },
  {
    id: 2,
    title: 'Подключайте туристическую карту № 1 в Бишкек',
    description: 'Лучшие туристические предложения',
    image: '/images/dashboard/10f8463c-35e9-4a18-a36a-ea177dce4494 (1).jpg',
    backgroundColor: '#2196F3',
    buttonText: 'Вступить в SClub',
    badge: 'Exclusive',
    textPosition: 'right',
  },
  {
    id: 3,
    title: 'Поднимаем продажи используя SEO',
    description: 'Эффективные SEO стратегии',
    image: '/images/dashboard/a7e03048786199.58a2113207835.png',
    backgroundColor: '#9155FD',
    buttonText: 'Поднять продажи',
    badge: 'Top',
    textPosition: 'center',
  },
  {
    id: 4,
    title: 'Инструкция по админ панеле',
    description: 'Подробное руководство',
    image: '/images/dashboard/ris.png',
    backgroundColor: '#2196F3',
    buttonText: 'Смотреть',
    badge: 'Sale',
    textPosition: 'center',
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  minHeight: 365,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '15px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  position: 'relative',
  color: '#fff',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
}));

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const PlaceholderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.default,
}));

const BannerContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  color: '#fff',
  backdropFilter: 'blur(3px)',
}));

interface StatusBadgeProps {
  statusColor: string;
}

const StatusBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'statusColor'
})<StatusBadgeProps>(({ theme, statusColor }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  padding: theme.spacing(0.5, 2),
  borderBottomRightRadius: '10px',
  zIndex: 3,
  fontWeight: 'bold',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
  backgroundColor: statusColor,
}));

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'New':
      return '#9155FD';
    case 'Exclusive':
      return '#2196F3';
    case 'Top':
      return '#9155FD';
    case 'Sale':
      return '#2196F3';
    default:
      return '#000';
  }
};

const StyledButton = styled(Button)(({ theme }) => ({
  mt: 2,
  boxShadow: '0px 4px 20px rgba(0,0,0,0.5)',
  transition: 'background-color 0.3s ease',
  backgroundColor: '#2196F3',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1976D2',
  },
}));

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box ref={ref} width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
      {inView ? <Image src={src} alt={alt} /> : <PlaceholderContainer><CircularProgress /></PlaceholderContainer>}
    </Box>
  );
};

const BannerCarousel: React.FC = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Stack spacing={2}>
      <Box position="relative" width="100%">
        <StyledCard>
          {banners.map((banner, index) =>
              index === currentBannerIndex && (
                <ImageContainer key={banner.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 1 }}
                  >
                    <LazyImage src={banner.image} alt={banner.title} />
                  </motion.div>
                </ImageContainer>
              )
          )}
          <StatusBadge statusColor={getStatusColor(banners[currentBannerIndex].badge)}>
            {banners[currentBannerIndex].badge}
          </StatusBadge>
          <BannerContent>
            <Typography
              variant="h2"
              sx={{
                margin: 0,
                fontFamily: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: 700,
                fontSize: '1.2rem',
                lineHeight: 1.5,
                letterSpacing: 0,
                textAlign: 'center',
                mt: 0,
                mb: 0
              }}
            >
              {banners[currentBannerIndex].title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                margin: 0,
                fontFamily: '"General Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: 600,
                fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
                lineHeight: 1.2222222222222223,
                letterSpacing: '-0.2px',
                textAlign: 'center',
                mt: 0,
                mb: 4
              }}
            >
              {banners[currentBannerIndex].description}
            </Typography>
            <StyledButton variant="contained" sx={{ mb: 4 }}>
              {banners[currentBannerIndex].buttonText}
            </StyledButton>
          </BannerContent>
        </StyledCard>
      </Box>
    </Stack>
  );
};

export default BannerCarousel;
