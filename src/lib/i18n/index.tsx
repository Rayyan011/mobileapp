import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import { stores } from '@/stores';
import { resources } from './resources';

export type { TxKeyPath } from './types';

// Initialize i18next - Force English only
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
});

// Force LTR (left-to-right) - disable RTL
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

// Translation function - accesses store to make it reactive
export const translate = (key: string, options?: any): string => {
  // Access the language to trigger re-renders in observer components
  const lang = stores.uiLanguage.language;
  return i18n.t(key, options) as string;
};

// Sync i18next with language change
export const syncLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  // Always force LTR
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
};

// Always return false for RTL (force LTR)
export const isRTL = false;

export default i18n;
