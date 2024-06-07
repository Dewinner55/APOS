import * as React from 'react';
import { Box, Button, Link, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

const gridSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="982" height="786" viewBox="0 0 982 786" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M490 401V537H348.5V401H490ZM490 785.5V676H348.5V785.5H347.5V676H206V785.5H205V676H63.5V785.5H62.5V676H0V675H62.5V538H0V537H62.5V401H0V400H62.5V258H0V257H62.5V116H0V115H62.5V0H63.5V115L205 115V0H206V115L347.5 115V0H348.5V115H490V0H491V115L627.5 115V0H628.5V115H765V0H766V115L902.5 115V0H903.5V115H982V116H903.5V257H982V258H903.5V400H982V401H903.5V537H982V538H903.5V675H982V676H903.5V785.5H902.5V676H766V785.5H765V676H628.5V785.5H627.5V676H491V785.5H490ZM902.5 675V538H766V675H902.5ZM902.5 537V401H766V537H902.5ZM902.5 400V258H766V400H902.5ZM902.5 257V116L766 116V257H902.5ZM627.5 675H491V538H627.5V675ZM765 675H628.5V538H765V675ZM348.5 675H490V538H348.5V675ZM347.5 538V675H206V538H347.5ZM205 538V675H63.5V538H205ZM765 537V401H628.5V537H765ZM765 400V258H628.5V400H765ZM765 257V116H628.5V257H765ZM347.5 401V537H206V401H347.5ZM205 401V537H63.5V401H205ZM627.5 401V537H491V401H627.5ZM627.5 116L491 116V257H627.5V116ZM627.5 258H491V400H627.5V258ZM63.5 257V116L205 116V257H63.5ZM63.5 400V258H205V400H63.5ZM206 116V257H347.5V116L206 116ZM348.5 116V257H490V116H348.5ZM206 400V258H347.5V400H206ZM348.5 258V400H490V258H348.5Z" fill="url(#paint0_radial_1_8)" />
    <defs>
      <radialGradient id="paint0_radial_1_8" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(491 392.75) rotate(90) scale(513.25 679.989)">
        <stop stopColor="white" stopOpacity="0.2" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

const topRightSvg = (
  <svg width="219" height="147" viewBox="0 0 219 147" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.18" x="10.4252" y="75.8326" width="7.50168" height="7.50168" transform="rotate(110.283 10.4252 75.8326)" fill="#686868" stroke="white" strokeWidth="1.22683" />
    <rect opacity="0.18" x="180.869" y="138.825" width="7.50168" height="7.50168" transform="rotate(110.283 180.869 138.825)" fill="#686868" stroke="white" strokeWidth="1.22683" />
    <rect x="69.4713" y="-91.84" width="180.485" height="180.485" transform="rotate(20.2832 69.4713 -91.84)" stroke="white" strokeOpacity="0.1" strokeWidth="1.22683" />
  </svg>
);

const LandingContent = () => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: theme.palette.background.default, overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: -1 }}>
        {gridSvg}
        <Box sx={{
          height: '12rem',
          width: '12rem',
          backgroundColor: theme.palette.primary.main,
          filter: 'blur(100px)',
          borderRadius: '100px',
          position: 'absolute',
          zIndex: 0,
        }} />
      </Box>
      <Box sx={{
        fontSize: '10rem',
        fontWeight: 700,
        letterSpacing: '-0.8rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        height: '100%',
        zIndex: 1000,
        '& > p': {
          margin: 0,
          lineHeight: '10rem',
        },
        '& > p:nth-of-type(1)': {
          alignSelf: 'flex-start',
        },
        '& > p:nth-of-type(2)': {
          color: theme.palette.primary.main,
          alignSelf: 'flex-end',
        },
        '& > p:nth-of-type(3)': {
          alignSelf: 'flex-end',
        },
      }}>
        <Typography component="p">Powerful</Typography>
        <Typography component="p">UI Design</Typography>
        <Typography component="p">Tool</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: '12%', right: '20%', zIndex: 9999 }}>
        <Link href="https://dribbble.com/shots/23181733-Blurry-Glassmorphic-Modern-Landing-page" target="_blank" sx={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{
            height: '50px',
            width: '160px',
            clipPath: 'path("M 0 25 C 0 -5, -5 0, 80 0 S 160 -5, 160 25, 165 50 80 50, 0 55, 0 25")',
            borderRadius: '13px',
            backgroundColor: theme.palette.primary.main,
            boxShadow: `0px -3px 15px 0px ${alpha(theme.palette.primary.main, 0.25)} inset`,
            color: theme.palette.primary.contrastText,
            fontFamily: 'Manrope',
            fontSize: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.2s ease',
            position: 'relative',
            transform: 'translateY(0px)',
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
              transform: 'translateY(5px)',
            },
          }}>
            View Source
          </Button>
          <Box sx={{
            width: '100px',
            height: '60px',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '100%',
            filter: 'blur(20px)',
            position: 'absolute',
            bottom: '-50%',
            transition: 'all 0.2s ease',
            opacity: 0.6,
          }} />
        </Link>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', position: 'absolute', bottom: '13%', right: '11%', zIndex: 9999 }}>
        <Link href="https://youtu.be/1pW_sk-2y40" target="_blank" sx={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{
            height: '50px',
            width: '160px',
            clipPath: 'path("M 0 25 C 0 -5, -5 0, 80 0 S 160 -5, 160 25, 165 50 80 50, 0 55, 0 25")',
            borderRadius: '13px',
            backgroundColor: theme.palette.secondary.main,
            boxShadow: `0px -3px 15px 0px ${alpha(theme.palette.secondary.main, 0.25)} inset`,
            color: theme.palette.secondary.contrastText,
            fontFamily: 'Manrope',
            fontSize: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.2s ease',
            position: 'relative',
            transform: 'translateY(0px)',
            '&:hover': {
              backgroundColor: theme.palette.secondary.light,
              transform: 'translateY(5px)',
            },
          }}>
            Watch Video
          </Button>
          <Box sx={{
            width: '100px',
            height: '60px',
            backgroundColor: theme.palette.secondary.main,
            borderRadius: '100%',
            filter: 'blur(20px)',
            position: 'absolute',
            bottom: '-50%',
            transition: 'all 0.2s ease',
            opacity: 0.6,
          }} />
        </Link>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', position: 'absolute', bottom: '25%', left: '15%', zIndex: 9999 }}>
        <Link href="https://x.com/juxtopposed" target="_blank" sx={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{
            height: '50px',
            width: '160px',
            clipPath: 'path("M 0 25 C 0 -5, -5 0, 80 0 S 160 -5, 160 25, 165 50 80 50, 0 55, 0 25")',
            borderRadius: '13px',
            backgroundColor: theme.palette.info.main,
            boxShadow: `0px -3px 15px 0px ${alpha(theme.palette.info.main, 0.25)} inset`,
            color: theme.palette.info.contrastText,
            fontFamily: 'Manrope',
            fontSize: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.2s ease',
            position: 'relative',
            transform: 'translateY(0px)',
            '&:hover': {
              backgroundColor: theme.palette.info.light,
              transform: 'translateY(5px)',
            },
          }}>
            Connect
          </Button>
          <Box sx={{
            width: '100px',
            height: '60px',
            backgroundColor: theme.palette.info.main,
            borderRadius: '100%',
            filter: 'blur(20px)',
            position: 'absolute',
            bottom: '-50%',
            transition: 'all 0.2s ease',
            opacity: 0.6,
          }} />
        </Link>
      </Box>
      <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: -1, opacity: 0.5 }}>
        {topRightSvg}
      </Box>
    </Box>
  );
};

export default LandingContent;
