import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles'
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useVisibility } from "src/@core/context/VisibilityContext";
import useTimeframe from "src/@core/hooks/useTimeframe";
import {StyledButton} from "src/views/dashboard/styles/styles";

type ProductType = {
  name: string;
  price: number;
  views: number;
  sales: number;
  growth: number;
  image: string;
};

type DataType = {
  year: ProductType[];
  month: ProductType[];
  week: ProductType[];
  day: ProductType[];
};

const data: DataType = {
  year: [
    {
      name: 'Product 1',
      price: 100,
      views: 2000,
      sales: 1000,
      growth: 15,
      image: 'https://source.unsplash.com/random/200x200?product1'
    },
    {
      name: 'Product 2',
      price: 80,
      views: 1500,
      sales: 800,
      growth: 20,
      image: 'https://source.unsplash.com/random/200x200?product2'
    },
    {
      name: 'Product 3',
      price: 60,
      views: 1200,
      sales: 600,
      growth: 10,
      image: 'https://source.unsplash.com/random/200x200?product3'
    },
    {
      name: 'Product 4',
      price: 90,
      views: 1800,
      sales: 900,
      growth: 25,
      image: 'https://source.unsplash.com/random/200x200?product4'
    },
    {
      name: 'Product 5',
      price: 70,
      views: 1600,
      sales: 700,
      growth: 12,
      image: 'https://source.unsplash.com/random/200x200?product5'
    },
  ],
  month: [
    {
      name: 'Product 1',
      price: 100,
      views: 200,
      sales: 100,
      growth: 15,
      image: 'https://source.unsplash.com/random/200x200?product1'
    },
    {
      name: 'Product 2',
      price: 80,
      views: 150,
      sales: 80,
      growth: 20,
      image: 'https://source.unsplash.com/random/200x200?product2'
    },
    {
      name: 'Product 3',
      price: 60,
      views: 120,
      sales: 60,
      growth: 10,
      image: 'https://source.unsplash.com/random/200x200?product3'
    },
    {
      name: 'Product 4',
      price: 90,
      views: 180,
      sales: 90,
      growth: 25,
      image: 'https://source.unsplash.com/random/200x200?product4'
    },
    {
      name: 'Product 5',
      price: 70,
      views: 160,
      sales: 70,
      growth: 12,
      image: 'https://source.unsplash.com/random/200x200?product5'
    },
  ],
  week: [
    {
      name: 'Product 1',
      price: 100,
      views: 50,
      sales: 30,
      growth: 15,
      image: 'https://source.unsplash.com/random/200x200?product1'
    },
    {
      name: 'Product 2',
      price: 80,
      views: 40,
      sales: 25,
      growth: 20,
      image: 'https://source.unsplash.com/random/200x200?product2'
    },
    {
      name: 'Product 3',
      price: 60,
      views: 30,
      sales: 20,
      growth: 10,
      image: 'https://source.unsplash.com/random/200x200?product3'
    },
    {
      name: 'Product 4',
      price: 90,
      views: 45,
      sales: 28,
      growth: 25,
      image: 'https://source.unsplash.com/random/200x200?product4'
    },
    {
      name: 'Product 5',
      price: 70,
      views: 35,
      sales: 22,
      growth: 12,
      image: 'https://source.unsplash.com/random/200x200?product5'
    },
  ],
  day: [
    {
      name: 'Product 1',
      price: 100,
      views: 10,
      sales: 5,
      growth: 15,
      image: 'https://source.unsplash.com/random/200x200?product1'
    },
    {
      name: 'Product 2',
      price: 80,
      views: 8,
      sales: 4,
      growth: 20,
      image: 'https://source.unsplash.com/random/200x200?product2'
    },
    {
      name: 'Product 3',
      price: 60,
      views: 6,
      sales: 3,
      growth: 10,
      image: 'https://source.unsplash.com/random/200x200?product3'
    },
    {
      name: 'Product 4',
      price: 90,
      views: 9,
      sales: 4,
      growth: 25,
      image: 'https://source.unsplash.com/random/200x200?product4'
    },
    {
      name: 'Product 5',
      price: 70,
      views: 7,
      sales: 3,
      growth: 12,
      image: 'https://source.unsplash.com/random/200x200?product5'
    },
  ],
};

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '15px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  transition: 'transform 0.3s',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  alignItems: 'flex-start',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '8px',
  marginRight: theme.spacing(2),
}));

const StyledProductInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 1,
}));

const StyledProductName = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 600,
}));

const StyledProductPrice = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.primary.main,
}));

const StyledProductStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(1),
}));

const StyledStat = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const GrowthStat = styled(Typography)<{ growth: number }>(({ theme, growth }) => ({
  fontSize: '0.875rem',
  color: growth > 0 ? theme.palette.success.main : theme.palette.error.main,
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

type LazyImageProps = {
  src: string;
  alt: string;
};

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box ref={ref} minHeight={80} minWidth={80} display="flex" alignItems="center" justifyContent="center">
      {inView ? <StyledAvatar variant="square" src={src} alt={alt} /> : <CircularProgress />}
    </Box>
  );
};

const TopProducts: React.FC = () => {
  const { timeframe, handleChange } = useTimeframe('month');
  const [loading, setLoading] = useState<boolean>(true);
  const isPhoneScreen = useMediaQuery('(max-width:600px)');
  const { isHidden,  } = useVisibility();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Simulate a delay for loading state
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  const timeframeData = data[timeframe as keyof DataType];

  const handleViewReviews = (productName: string) => {
    console.log(`Просмотр отзывов для ${productName}`);
  };

  const handleViewAllProducts = () => {
    console.log('Просмотр всех продуктов');
  };

  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: yellow[700], mr: 2 }}>
              <StarIcon />
            </Avatar>
            <Typography variant="h5" component="div">
              Топ-продукты
            </Typography>
          </Box>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="timeframe-label">Временной интервал</InputLabel>
            <Select
              labelId="timeframe-label"
              value={timeframe}
              onChange={handleChange}
              label="Временной интервал"
            >
              <MenuItem value="year">Год</MenuItem>
              <MenuItem value="month">Месяц</MenuItem>
              <MenuItem value="week">Неделя</MenuItem>
              <MenuItem value="day">День</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {loading ? (
          <PlaceholderContainer>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CircularProgress color="primary" size={80} />
              <PlaceholderText>Загрузка данных...</PlaceholderText>
            </Box>
          </PlaceholderContainer>
        ) : (
          <List>
            {timeframeData.map((product, index) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
                transition={{ duration: 0.5 }}
                ref={ref}
                key={index}
              >
                <StyledListItem>
                  <ListItemAvatar>
                    <LazyImage src={product.image} alt={product.name} />
                  </ListItemAvatar>
                  <StyledProductInfo>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <StyledProductName>{product.name}</StyledProductName>
                      <StyledButton variant="outlined" onClick={() => handleViewReviews(product.name)}>
                        Отзывы
                      </StyledButton>
                    </Box>
                    <StyledProductPrice>{`Цена: $${isHidden ? '****' : product.price}`}</StyledProductPrice>
                    <StyledProductStats>
                      <StyledStat>{`Просмотров: ${isHidden ? '****' : product.views}`}</StyledStat>
                      <StyledStat>{`Продажи: ${isHidden ? '****' : product.sales}`}</StyledStat>
                      <GrowthStat growth={product.growth}>{`Рост: ${isHidden ? '****' : product.growth}%`}</GrowthStat>
                    </StyledProductStats>
                  </StyledProductInfo>
                </StyledListItem>
              </motion.div>
            ))}
          </List>
        )}
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="textSecondary" >
            {!isPhoneScreen && (
              <Typography variant="caption" color="textSecondary">
                <ul>
                  <li>Здесь выдаются 5 последних ордеров.</li>
                  <li>Топ-товары обновляются в течение 24 часов.</li>
                </ul>
              </Typography>
            )}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewAllProducts}
            sx={{  mt: 4 }}
          >
            Узнать подробнее
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default TopProducts;
