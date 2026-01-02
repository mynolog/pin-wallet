import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import koCommon from './locales/ko/common.json'
import enCommon from './locales/en/common.json'
import koSettings from './locales/ko/settings.json'
import enSettings from './locales/en/settings.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'ko',
  resources: {
    ko: {
      common: koCommon,
      settings: koSettings,
    },
    en: {
      common: enCommon,
      settings: enSettings,
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
