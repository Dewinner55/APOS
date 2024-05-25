// i18n.ts
import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

// your i18n configuration
const i18nConfig: InitOptions = {
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        // English translations go here
      },
    },
    ru: {
      translation: {
        // Russian translations go here
      },
    },
    kgz: {
      translation: {
        // Kyrgyz translations go here
      },
    },
    ty: {
      translation: {
        // Tyvan translations go here
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(i18nConfig);

export default i18n;
