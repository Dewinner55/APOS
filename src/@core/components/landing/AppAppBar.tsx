import * as React from 'react';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import { useRouter } from 'next/router';
import ScrollToTop from "src/@core/components/scroll-to-top";
import Fab from "@mui/material/Fab";
import ArrowUp from "mdi-material-ui/ArrowUp";

interface AppAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
  includeHomePageLink?: boolean; // Новый аргумент для включения перехода на главную страницу
}

function AppAppBar({ mode, toggleColorMode, includeHomePageLink = false }: AppAppBarProps) {
  const router = useRouter(); // Инициализация useRouter

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <img
                src="/images/misc/GJ.png"
                alt="Logo"
                width={90}   // Указываете нужную ширину
                height={80}  // Указываете нужную высоту
                // style={{verticalAlign: 'middle'}} // Убедитесь, что изображение выравнивается по центру, если это необходимо
              />
              <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                <MenuItem
                  onClick={() => {
                    if (includeHomePageLink) {
                      router.push('/#features');
                    } else {
                      scrollToSection('features');
                    }
                  }}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Функции
                  </Typography>
                </MenuItem>
                {/* Пункт меню "Отзывы" */}
                <MenuItem
                  onClick={() => {
                    if (includeHomePageLink) {
                      router.push('/#testimonials');
                    } else {
                      scrollToSection('testimonials');
                    }
                  }}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Отзывы
                  </Typography>
                </MenuItem>
                {/* Пункт меню "Моменты" */}
                <MenuItem
                  onClick={() => {
                    if (includeHomePageLink) {
                      router.push('/#highlights');
                    } else {
                      scrollToSection('highlights');
                    }
                  }}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Моменты
                  </Typography>
                </MenuItem>
                {/* Пункт меню "Цена" */}
                <MenuItem
                  onClick={() => {
                    if (includeHomePageLink) {
                      router.push('/#pricing');
                    } else {
                      scrollToSection('pricing');
                    }
                  }}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Цена
                  </Typography>
                </MenuItem>
                {/* Пункт меню "FAQ" */}
                <MenuItem
                  onClick={() => {
                    if (includeHomePageLink) {
                      router.push('/#faq');
                    } else {
                      scrollToSection('faq');
                    }
                  }}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: {xs: 'none', md: 'flex'},
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode}/>
              <Button
                color="primary"
                variant="text"
                size="small"
                component="a"
                href="/pages/login"
                target="_blank"
              >
                Войти в личный кабинет
              </Button>
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem onClick={() => scrollToSection('features')}>
                    Features
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('testimonials')}>
                    Testimonials
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('highlights')}>
                    Highlights
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('pricing')}>
                    Pricing
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-up/"
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-in/"
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
        {/* Scroll to top button */}
        <ScrollToTop className='mui-fixed'>
          <Fab color='primary' size='small' aria-label='scroll back to top'>
            <ArrowUp />
          </Fab>
        </ScrollToTop>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
