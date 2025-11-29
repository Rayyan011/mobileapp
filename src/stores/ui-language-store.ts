import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';
import { I18nManager } from 'react-native';
import type { Language } from '@/lib/i18n/resources';
import { syncLanguage } from '@/lib/i18n';
import { PVoid } from './types';

export class UILanguageStore {
  language: Language = "en";

  constructor() {
    makeAutoObservable(this);
    
    // Force LTR (left-to-right)
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    
    // Set language to English
    syncLanguage("en");
    
    makePersistable(this, {
      name: "UILanguage",
      properties: [
        "language",
      ],
      debugMode: false,
    });
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
    // Ensure LTR after hydration
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    syncLanguage("en");
  };
}

