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
  CircularProgress, SelectChangeEvent
} from '@mui/material';
import { styled } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import { blue } from '@mui/material/colors';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useVisibility } from "src/@core/context/VisibilityContext";
import {StyledButton} from "src/views/dashboard/styles/styles";
import useTimeframe from "src/@core/hooks/useTimeframe";

interface TravelCardService {
  name: string;
  usageCount: number;
  totalDiscount: number;
  image: string;
}

interface CompletedService {
  name: string;
  completed: number;
  totalAmount: number;
  image: string;
}

interface PurchasedService {
  name: string;
  purchased: number;
  totalAmount: number;
  image: string;
}

interface ProvidedService {
  name: string;
  provided: number;
  totalAmount: number;
  image: string;
}

type ServiceType = TravelCardService | CompletedService | PurchasedService | ProvidedService;

type DataType = {
  year: ServiceType[];
  halfYear: ServiceType[];
  quarter: ServiceType[];
  month: ServiceType[];
  week: ServiceType[];
  day: ServiceType[];
};

const data: DataType = {
  year: [
    { name: 'Туристическая карта Soyuz.kg', usageCount: 1000, totalDiscount: 50000, image: 'https://source.unsplash.com/random/200x200?travel-card' },
    { name: 'Доставка', completed: 900, totalAmount: 9000, image: 'https://source.unsplash.com/random/200x200?delivery' },
    { name: 'Установка', completed: 400, totalAmount: 20000, image: 'https://source.unsplash.com/random/200x200?installation' },
    { name: 'Гарантия', purchased: 300, totalAmount: 6000, image: 'https://source.unsplash.com/random/200x200?warranty' },
    { name: 'Техническая поддержка', provided: 200, totalAmount: 6000, image: 'https://source.unsplash.com/random/200x200?support' },
  ],
  halfYear: [
    { name: 'Туристическая карта Soyuz.kg', usageCount: 500, totalDiscount: 25000, image: 'https://source.unsplash.com/random/200x200?travel-card' },
    { name: 'Доставка', completed: 450, totalAmount: 4500, image: 'https://source.unsplash.com/random/200x200?delivery' },
    { name: 'Установка', completed: 200, totalAmount: 10000, image: 'https://source.unsplash.com/random/200x200?installation' },
    { name: 'Гарантия', purchased: 150, totalAmount: 3000, image: 'https://source.unsplash.com/random/200x200?warranty' },
    { name: 'Техническая поддержка', provided: 100, totalAmount: 3000, image: 'https://source.unsplash.com/random/200x200?support' },
  ],
  quarter: [
    { name: 'Туристическая карта Soyuz.kg', usageCount: 250, totalDiscount: 12500, image: 'https://source.unsplash.com/random/200x200?travel-card' },
    { name: 'Доставка CDEK', completed: 225, totalAmount: 2250, image: 'https://source.unsplash.com/random/200x200?delivery' },
    { name: 'Установка', completed: 100, totalAmount: 5000, image: 'https://source.unsplash.com/random/200x200?installation' },
    { name: 'Гарантия', purchased: 75, totalAmount: 1500, image: 'https://source.unsplash.com/random/200x200?warranty' },
    { name: 'Техническая поддержка', provided: 50, totalAmount: 1500, image: 'https://source.unsplash.com/random/200x200?support' },
  ],
  month: [
    { name: 'Туристическая карта Soyuz.kg', usageCount: 80, totalDiscount: 4000, image: 'https://source.unsplash.com/random/200x200?travel-card' },
    { name: 'Доставка CDEK', completed: 70, totalAmount: 700, image: 'https://source.unsplash.com/random/200x200?delivery' },
    { name: 'Установка', completed: 30, totalAmount: 1500, image: 'https://source.unsplash.com/random/200x200?installation' },
    { name: 'Гарантия', purchased: 20, totalAmount: 400, image: 'https://source.unsplash.com/random/200x200?warranty' },
    { name: 'Техническая поддержка', provided: 10, totalAmount: 300, image: 'https://source.unsplash.com/random/200x200?support' },
  ],
  week: [
    { name: 'Туристическая карта Soyuz.kg', usageCount: 20, totalDiscount: 1000, image: 'https://source.unsplash.com/random/200x200?travel-card' },
    { name: 'Доставка CDEK', completed: 18, totalAmount: 180, image: 'https://source.unsplash.com/random/200x200?delivery' },
    { name: 'Установка', completed: 10, totalAmount: 500, image: 'https://source.unsplash.com/random/200x200?installation' },
    { name: 'Гарантия', purchased: 8, totalAmount: 160, image: 'https://source.unsplash.com/random/200x200?warranty' },
    { name: 'Техническая поддержка', provided: 5, totalAmount: 150, image: 'https://source.unsplash.com/random/200x200?support' },
  ],
  day: [
    { name: 'Туристическая карта Soyuz.kg', usageCount: 3, totalDiscount: 150, image: 'https://source.unsplash.com/random/200x200?travel-card' },
    { name: 'Доставка CDEK', completed: 2, totalAmount: 20, image: 'https://source.unsplash.com/random/200x200?delivery' },
    { name: 'Установка', completed: 1, totalAmount: 50, image: 'https://source.unsplash.com/random/200x200?installation' },
    { name: 'Гарантия', purchased: 1, totalAmount: 20, image: 'https://source.unsplash.com/random/200x200?warranty' },
    { name: 'Техническая поддержка', provided: 1, totalAmount: 30, image: 'https://source.unsplash.com/random/200x200?support' },
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
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const StyledServiceInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 1,
}));

const StyledServiceName = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 600,
}));

const StyledServiceStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(1),
}));

const StyledStat = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
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

const TopServices: React.FC = () => {
  const { timeframe, handleChange } = useTimeframe('month');
  const [loading, setLoading] = useState<boolean>(true);
  const isPhoneScreen = useMediaQuery('(max-width:600px)');
  const { isHidden,  } = useVisibility();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  const timeframeData = data[timeframe as keyof DataType];

  const handleViewAllServices = () => {
    console.log('Просмотр всех услуг');
  };

  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: blue[500], mr: 2 }}>
              <StarIcon />
            </Avatar>
            <Typography variant="h5" component="div">
              Топ-Услуги
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel id="timeframe-label">Временной интервал</InputLabel>
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
            {timeframeData.map((service, index) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
                transition={{ duration: 0.5 }}
                ref={ref}
                key={index}
              >
                <StyledListItem>
                  <ListItemAvatar>
                    <LazyImage src={service.image} alt={service.name} />
                  </ListItemAvatar>
                  <StyledServiceInfo>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <StyledServiceName>{isHidden ? '****' : service.name}</StyledServiceName>
                      <StyledButton variant="outlined" onClick={handleViewAllServices}>
                        Подробнее
                      </StyledButton>
                    </Box>
                    <StyledServiceStats>
                      {'usageCount' in service && (
                        <>
                          <StyledStat>{`Использовано: ${isHidden ? '****' : service.usageCount}`}</StyledStat>
                          <Box display="flex" flexDirection="column" alignItems="flex-end">
                            <StyledStat>{`Общая сумма скидки: ${isHidden ? '****' : `$${service.totalDiscount}`}`}</StyledStat>
                            <StyledStat>{`Средняя сумма скидки: ${isHidden ? '****' : `$${(service.totalDiscount / service.usageCount).toFixed(2)}`}`}</StyledStat>
                          </Box>
                        </>
                      )}
                      {'completed' in service && (
                        <>
                          <StyledStat>{`Реализовано: ${isHidden ? '****' : service.completed}`}</StyledStat>
                          <Box display="flex" flexDirection="column" alignItems="flex-end">
                            <StyledStat>{`Общая сумма: ${isHidden ? '****' : `$${service.totalAmount}`}`}</StyledStat>
                            <StyledStat>{`Средняя сумма: ${isHidden ? '****' : `$${(service.totalAmount / service.completed).toFixed(2)}`}`}</StyledStat>
                          </Box>
                        </>
                      )}
                      {'purchased' in service && (
                        <>
                          <StyledStat>{`Приобретено: ${isHidden ? '****' : service.purchased}`}</StyledStat>
                          <Box display="flex" flexDirection="column" alignItems="flex-end">
                            <StyledStat>{`Общая сумма: ${isHidden ? '****' : `$${service.totalAmount}`}`}</StyledStat>
                            <StyledStat>{`Средняя сумма: ${isHidden ? '****' : `$${(service.totalAmount / service.purchased).toFixed(2)}`}`}</StyledStat>
                          </Box>
                        </>
                      )}
                      {'provided' in service && (
                        <>
                          <StyledStat>{`Предоставлено: ${isHidden ? '****' : service.provided}`}</StyledStat>
                          <Box display="flex" flexDirection="column" alignItems="flex-end">
                            <StyledStat>{`Общая сумма: ${isHidden ? '****' : `$${service.totalAmount}`}`}</StyledStat>
                            <StyledStat>{`Средняя сумма: ${isHidden ? '****' : `$${(service.totalAmount / service.provided).toFixed(2)}`}`}</StyledStat>
                          </Box>
                        </>
                      )}
                    </StyledServiceStats>
                  </StyledServiceInfo>
                </StyledListItem>
              </motion.div>
            ))}
          </List>
        )}
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="textSecondary">
            {!isPhoneScreen && (
              <Typography variant="caption" color="textSecondary">
                <ul>
                  <li>Здесь выдаются ваши активные услуги.</li>
                  <li>Статистика по услугам обновляются в течение 24 часов.</li>
                </ul>
              </Typography>
            )}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewAllServices}
            sx={{ mt: 4 }}
          >
            Узнать подробнее
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default TopServices;
