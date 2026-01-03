import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import koCommon from './locales/ko/common.json'
import enCommon from './locales/en/common.json'
import koHome from './locales/ko/home.json'
import enHome from './locales/en/home.json'
import koMap from './locales/ko/map.json'
import enMap from './locales/en/map.json'
import koSettings from './locales/ko/settings.json'
import enSettings from './locales/en/settings.json'
import koCreateTrip from './locales/ko/create-trip.json'
import enCreateTrip from './locales/en/create-trip.json'
import koTrip from './locales/ko/trip.json'
import enTrip from './locales/en/trip.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'ko',
  resources: {
    ko: {
      common: koCommon,
      home: koHome,
      map: koMap,
      settings: koSettings,
      createTrip: koCreateTrip,
      trip: koTrip,
    },
    en: {
      common: enCommon,
      home: enHome,
      map: enMap,
      settings: enSettings,
      createTrip: enCreateTrip,
      trip: enTrip,
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
