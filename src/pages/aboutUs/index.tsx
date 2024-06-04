import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AppAppBar from "src/@core/components/landing/AppAppBar";

import Footer from "src/@core/components/landing/Footer";
import {ReactNode} from "react";
import BlankLayout from "src/@core/layouts/BlankLayout";

import {useThemeMode} from "src/@core/hooks/useThemeMode";
import getLPTheme from "src/pages/getLPTheme";
import {GetServerSideProps} from "next/types";
import {PaletteMode} from "@mui/material";
import AboutUs from 'src/@core/components/landing/AboutUs/AboutUs';


export const getServerSideProps: GetServerSideProps = async (context) => {
  const themeFromCookie = context.req.cookies.theme;
  const initialTheme = themeFromCookie || 'light';

  console.log('theme', initialTheme);

  // Предположим, что сообщения загружаются асинхронно для локализации
  const messages = await import(`../../messages/${context.locale}.json`);

  return {
    props: {
      messages: messages.landing,
      initialTheme,
    },
  };
};

const AboutUsPage = ({ initialTheme }: { initialTheme: PaletteMode }) => {
  const { mode, toggleColorMode,  } = useThemeMode(initialTheme);
  const [showCustomTheme, ] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({palette: {mode}});

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline/>
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} includeHomePageLink={true}/>
        <AboutUs />
      <Footer includeHomePageLink={true} />
    </ThemeProvider>
  );
}

AboutUsPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

AboutUsPage.guestGuard = true;

export default AboutUsPage;
