import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import ko from './locales/ko.json'
import id from './locales/id.json'
import fil from './locales/fil.json'
import my from './locales/my.json'
import vi from './locales/vi.json'
import ru from './locales/ru.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ko: { translation: ko },
      id: { translation: id },
      fil: { translation: fil },
      my: { translation: my },
      vi: { translation: vi },
      ru: { translation: ru },
    },
    fallbackLng: 'ko',

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
