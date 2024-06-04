import * as React from 'react';
import {alpha} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {useTranslations} from "next-intl";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {keyframes} from '@mui/system';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 15 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h2"
            sx={{
              margin: 0,
              fontFamily: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontWeight: 700,
              fontSize: '0.875rem',
              lineHeight: 1.5,
              scrollSnapMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
              scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
              letterSpacing: 0,
              color: (theme) => theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              textAlign: 'center',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
            }}
          >
            About us
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <Typography
              variant="h1"
              sx={{
                margin: 0,
                fontFamily: '"General Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: 600,
                fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
                lineHeight: 1.2222222222222223,
                scrollSnapMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
                scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
                letterSpacing: '-0.2px',
                color: (theme) => theme.palette.mode === 'light' ? 'black' : 'white',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignSelf: 'center',
                textAlign: 'center',
              }}
            >
              We're on a mission to make
            </Typography>
            <Typography
              variant="h1"
              sx={{
                margin: 0,
                fontFamily: '"General Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: 600,
                fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
                lineHeight: 1.2222222222222223,
                scrollSnapMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
                scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
                letterSpacing: '-0.2px',
                color: (theme) => theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignSelf: 'center',
                textAlign: 'center',
              }}
            >
              building better UIs effortless
            </Typography>
          </Box>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{
              margin: 0,
              fontFamily: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontWeight: 400,
              fontSize: '1rem',
              lineHeight: 1.5,
              scrollSnapMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
              scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
              letterSpacing: 0,
              color: 'var(--muidocs-palette-grey-800)',
              marginTop: '8px',
              marginBottom: '24px',
              maxWidth: '500px',
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: { sm: '100%', md: '80%' },
            }}
          >
            Together, we are enabling developers & designers to bring stunning UIs to life with unrivalled speed and
            ease.
          </Typography>
        </Stack>
      </Container>
      <Container>
        <Slider {...settings} sx={{overflowX: 'hidden', whiteSpace: 'nowrap'}}>
          <motion.div
            initial={{x: 0}}
            animate={{x: '-200%'}}
            transition={{ease: 'linear', duration: 10, repeat: Infinity}}
          >
            <Box>
              <img
                src="/images/pages/GlobalJoy.png"
                alt="Image 1"
                style={{
                  width: '350px',
                  height: '300px',
                  boxSizing: 'content-box',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  transition: 'all 100ms ease 0s',
                }}
              />
            </Box>
          </motion.div>
          <motion.div
            initial={{x: '100%'}}
            animate={{x: '-100%'}}
            transition={{ease: 'linear', duration: 10, repeat: Infinity}}
          >
            <Box>
              <img
                src="/images/cards/iPhone-11-pro.png"
                alt="Image 2"
                style={{
                  width: '350px',
                  height: '300px',
                  boxSizing: 'content-box',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  transition: 'all 100ms ease 0s',
                }}
              />
            </Box>
          </motion.div>
          <motion.div
            initial={{x: '100%'}}
            animate={{x: '-100%'}}
            transition={{ease: 'linear', duration: 10, repeat: Infinity}}
          >
            <Box>
              <img
                src="/images/cards/paypal.png"
                alt="Image 2"
                style={{
                  width: '350px',
                  height: '300px',
                  boxSizing: 'content-box',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  transition: 'all 100ms ease 0s',
                }}
              />
            </Box>
          </motion.div>
          <motion.div
            initial={{x: '100%'}}
            animate={{x: '-100%'}}
            transition={{ease: 'linear', duration: 10, repeat: Infinity}}
          >
            <Box>
              <img
                src="/images/pages/GlobalJoy.png"
                alt="Image 2"
                style={{
                  width: '350px',
                  height: '300px',
                  boxSizing: 'content-box',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  transition: 'all 100ms ease 0s',
                }}
              />
            </Box>
          </motion.div>
          <motion.div
            initial={{x: '100%'}}
            animate={{x: '-100%'}}
            transition={{ease: 'linear', duration: 10, repeat: Infinity}}
          >
            <Box>
              <img
                src="/images/pages/GlobalJoy.png"
                alt="Image 2"
                style={{
                  width: '350px',
                  height: '300px',
                  boxSizing: 'content-box',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  transition: 'all 100ms ease 0s',
                }}
              />
            </Box>
          </motion.div>
          <motion.div
            initial={{x: '200%'}}
            animate={{x: '0%'}}
            transition={{ease: 'linear', duration: 10, repeat: Infinity}}
          >
            <Box>
              <img
                src="/images/pages/GlobalJoy.png"
                alt="Image 3"
                style={{
                  width: '350px',
                  height: '300px',
                  boxSizing: 'content-box',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  transition: 'all 100ms ease 0s',
                }}
              />
            </Box>
          </motion.div>
        </Slider>
      </Container>
    </Box>
  );
};

export default AboutUs;
