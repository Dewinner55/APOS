import * as React from 'react';
import { PaletteMode } from '@mui/material';
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
import {ReactNode} from "react";
import BlankLayout from "src/@core/layouts/BlankLayout";
import {GetStaticProps} from "next";

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {

    },
  };
};

const LandingPage = () => {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

LandingPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

LandingPage.guestGuard = true;

export default LandingPage;
