import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from "src/pages/getLPTheme";
import AppAppBar from "src/@core/components/landing/AppAppBar";
import Hero from "src/@core/components/landing/Hero";
import LogoCollection from "src/@core/components/landing/LogoCollection";
import Features from "src/@core/components/landing/Features";
import Testimonials from "src/@core/components/landing/Testimonials";
import Highlights from "src/@core/components/landing/Highlights";
import Pricing from "src/@core/components/landing/Pricing";
import FAQ from "src/@core/components/landing/FAQ";
import Footer from "src/@core/components/landing/Footer";
import {ReactNode, useEffect} from "react";
import BlankLayout from "src/@core/layouts/BlankLayout";
import {useThemeMode} from "src/@core/hooks/useThemeMode";
import {PaletteMode} from "@mui/material";
import {GetServerSideProps} from "next/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const themeFromCookie = context.req.cookies.theme;
  const initialTheme = themeFromCookie || 'light';

  console.log('theme', initialTheme);

  return {
    props: {
      initialTheme,
    },
  };
};

const smoothScrollTo = (targetY: number, duration: number) => {
  const startingY = window.pageYOffset;
  const diff = targetY - startingY;
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (startTime === null) startTime = timestamp;
    const elapsedTime = timestamp - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startingY + diff * easedProgress);

    if (elapsedTime < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
};

const LandingPage = ({ initialTheme }: { initialTheme: PaletteMode }) => {
  const { mode, toggleColorMode,  } = useThemeMode(initialTheme);
  const [showCustomTheme, ] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      let sectionId = '';
      if (hash === '#features') {
        sectionId = 'features';
      } else if (hash === '#testimonials') {
        sectionId = 'testimonials';
      } else if (hash === '#highlights') {
        sectionId = 'highlights';
      } else if (hash === '#pricing') {
        sectionId = 'pricing';
      } else if (hash === '#faq') {
        sectionId = 'faq';
      }

      if (sectionId) {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const offset = 128;
          const targetScroll = sectionElement.offsetTop - offset;
          smoothScrollTo(targetScroll, 1000); // Smooth scroll to target with duration of 1000ms (1s)
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Handle initial hash

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode}/>
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Features id="features" />
        <Divider />
        <Testimonials id="testimonials" />
        <Divider />
        <Highlights id="highlights" />
        <Divider />
        <Pricing id="pricing" />
        <Divider />
        <FAQ id="faq" />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

LandingPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

LandingPage.guestGuard = true;

export default LandingPage;
