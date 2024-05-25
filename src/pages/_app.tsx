// ** Next Imports
import Head from 'next/head'
import {Router, useRouter} from 'next/router'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import { NextIntlClientProvider } from 'next-intl';

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import {CacheProvider} from '@emotion/react'
import type {EmotionCache} from '@emotion/cache'

// ** Config Imports
import {getThemeConfig} from 'src/configs/themeConfig'

// ** Contexts
import {SettingsProvider} from 'src/@core/context/settingsContext'

// ** Utils Imports
import {createEmotionCache} from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import 'src/assets/iconify-icons/generated-icons.css'

// ** interface Import
import {User} from "src/@core/interface/user/interface";
import ThemeComponent from "../@core/theme/ThemeComponent";
import UserLayout from 'src/layouts/UserLayout'
import React from "react";

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Configure JSS & ClassName
function App(props: ExtendedAppProps & { userContext: User }) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

  const {userProfile} = pageProps;

  // Получение конфигурации темы для текущего пользователя
  const themeConfig = getThemeConfig(userProfile);

  const router = useRouter();
  const currentLocale = userProfile?.user_settings?.system_language || router.locale;

  // ** Pace Loader
  if (themeConfig.routingLoader) {
    Router.events.on('routeChangeStart', () => {
      NProgress.start()
    })
    Router.events.on('routeChangeError', () => {
      NProgress.done()
    })
    Router.events.on('routeChangeComplete', () => {
      NProgress.done()
    })
  }

  // Variables
  // @ts-ignore
  const getLayout = Component.getLayout ?? (page => <UserLayout userProfile={userProfile}>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <SettingsProvider userContext={pageProps.userProfile}>
        <Head>
          <title>{`${themeConfig.templateName} - Шаблон администратора Global Joy Admin Panel Online Store - GJAPOS`}</title>
          <meta
            name='description'
            content={`${themeConfig.templateName} – GJAPOS – это Административная панель для поставщиков, основанная на MUI v5`}
          />
          <meta name='keywords' content='GJAPOS, MUI, Шаблон администратора, шаблон администратора React'/>
          <meta name='viewport' content='initial-scale=1, width=device-width'/>
        </Head>
        <NextIntlClientProvider
          locale={currentLocale}
          timeZone='Europe/Vienna'
          messages={pageProps.messages}
        >
        <ThemeComponent>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
        </NextIntlClientProvider>
      </SettingsProvider>
    </CacheProvider>
  );
}

export default App;
