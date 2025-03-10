import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import enNs from './locales/en_US/translation.json'
import viVN from './locales/vi_VN/translation.json'
import {LANGUAGE} from "~/constants/common.ts";

export const defaultNS = 'translation';
i18n
    .use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)
    .init({
        debug: true,
        lng: localStorage.getItem("i18nextLng") || 'en_US',
        defaultNS,
        fallbackLng: LANGUAGE.ko,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en_US: {
                translation: enNs,
            },
            vi_VN: {
                translation: viVN,
            },
        },
    });

export default i18n;
