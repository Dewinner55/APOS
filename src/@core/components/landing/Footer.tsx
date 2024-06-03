import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from 'next/router';

const logoStyle = {
  width: '140px',
  height: 'auto',
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link href="http://localhost:3009/">Global Joy Lab&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

interface FooterProps {
  includeHomePageLink?: boolean;
}

export default function ({ includeHomePageLink = false }: FooterProps) {
  const router = useRouter();


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
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <Box sx={{ ml: '-15px' }}>
              <img
                src="/images/misc/GJ.png"
                style={logoStyle}
                alt="logo of sitemark"
              />
            </Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Global Joy Lab
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Subscribe to our newsletter for weekly updates and promotions.
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Enter your email address"
                placeholder="Your email address"
                inputProps={{
                  autoComplete: 'off',
                  'aria-label': 'Enter your email address',
                }}
              />
              <Button variant="contained" color="primary" sx={{ flexShrink: 0 }}>
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600} sx={{ marginLeft: '14px' }}>
            Продукт
          </Typography>
          <MenuItem
            onClick={() => {
              if (includeHomePageLink) {
                router.push('/#features');
              } else {
                scrollToSection('features');
              }
            }}
            sx={{
              py: '6px',
              px: '12px',
              "&:hover": {
                '& > *': {
                  color: 'text.primary'
                }
              }
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Основные функции
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (includeHomePageLink) {
                router.push('/#testimonials');
              } else {
                scrollToSection('testimonials');
              }
            }}
            sx={{
              py: '6px',
              px: '12px',
              "&:hover": {
                '& > *': {
                  color: 'text.primary'
                }
              }
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Отзывы наших клиентов
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (includeHomePageLink) {
                router.push('/#highlights');
              } else {
                scrollToSection('highlights');
              }
            }}
            sx={{
              py: '6px',
              px: '12px',
              "&:hover": {
                '& > *': {
                  color: 'text.primary'
                }
              }
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Основные моменты
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (includeHomePageLink) {
                router.push('/#pricing');
              } else {
                scrollToSection('pricing');
              }
            }}
            sx={{
              py: '6px',
              px: '12px',
              "&:hover": {
                '& > *': {
                  color: 'text.primary'
                }
              }
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Стоимость
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (includeHomePageLink) {
                router.push('/#faq');
              } else {
                scrollToSection('faq');
              }
            }}
            sx={{
              py: '6px',
              px: '12px',
              "&:hover": {
                '& > *': {
                  color: 'text.primary'
                }
              }
            }}
          >
            <Typography variant="body2" color="text.secondary">
              FAQ
            </Typography>
          </MenuItem>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Company
          </Typography>
          <MenuItem
            onClick={() => {
              router.push('/blogAboutUs');
            }}
            sx={{
              py: '6px',
              px: '12px',
              "&:hover": {
                '& > *': {
                  color: 'text.primary'
                }
              }
            }}
          >
            <Typography variant="body2" color="text.secondary">
              О нас
            </Typography>
          </MenuItem>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Юридический права
          </Typography>
          <MenuItem
            onClick={() => {
              router.push('/working');
            }}
            sx={{
              py: '6px',
              px: '12px',
              "&:hover": {
                '& > *': {
                  color: 'text.primary'
                }
              }
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Условия
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push('/сonfidentiality');
            }}
            sx={{
              py: '6px',
              px: '12px',
              "&:hover": {
                '& > *': {
                  color: 'text.primary'
                }
              }
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Конфиденциальность
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push('/contacts');
            }}
            sx={{
              py: '6px',
              px: '12px',
              "&:hover": {
                '& > *': {
                  color: 'text.primary'
                }
              }
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Контакты
            </Typography>
          </MenuItem>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link color="text.secondary" href="#">
            Privacy Policy
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" href="#">
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: 'text.secondary',
          }}
        >
          <IconButton
            color="inherit"
            href="https://github.com"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://twitter.com"
            aria-label="X"
            sx={{ alignSelf: 'center' }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.linkedin.com"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
