import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';
import { colorScheme } from 'nativewind';
import { Appearance } from 'react-native';
import type { Theme } from '@react-navigation/native';
import { themes, themeIsDark, type ThemeId } from '@/lib/theme';
import { AppearanceMode, PVoid, UIAppearance } from './types';

export class UIThemeStore {
  isSystemAppearance = false;
  themeId: ThemeId = 'light';
  systemColorScheme: AppearanceMode | null = Appearance.getColorScheme() || 'light';
  private appearanceListener: any = null;

  private themeIdToUIAppearance = (id: ThemeId): UIAppearance => {
    const map: Record<ThemeId, UIAppearance> = {
      light: 'Light',
      dark: 'Dark',
      blue: 'Blue',
      green: 'Green',
      purple: 'Purple',
      orange: 'Orange',
      pink: 'Pink',
    };
    return map[id];
  };

  private uiAppearanceToThemeId = (appearance: UIAppearance): ThemeId => {
    if (appearance === 'System') return 'light';
    const map: Record<UIAppearance, ThemeId> = {
      System: 'light',
      Light: 'light',
      Dark: 'dark',
      Blue: 'blue',
      Green: 'green',
      Purple: 'purple',
      Orange: 'orange',
      Pink: 'pink',
    };
    return map[appearance];
  };

  get selectedTheme(): UIAppearance {
    if (this.isSystemAppearance) return 'System';
    return this.themeIdToUIAppearance(this.themeId);
  }

  setSelectedTheme = (theme: UIAppearance): void => {
    if (theme === 'System') {
      this.isSystemAppearance = true;
      // Use system preference for theme selection
      const systemTheme = this.systemColorScheme === 'dark' ? 'dark' : 'light';
      this.themeId = systemTheme;
    } else {
      this.isSystemAppearance = false;
      this.themeId = this.uiAppearanceToThemeId(theme);
    }
    
    // Sync with NativeWind - determine if theme is dark or light
    const isDarkTheme = themeIsDark[this.themeId];
    const nativeWindValue = this.isSystemAppearance 
      ? 'system' 
      : (isDarkTheme ? 'dark' : 'light');
    colorScheme.set(nativeWindValue as 'light' | 'dark' | 'system');
  };

  get navigationTheme(): Theme {
    if (this.isSystemAppearance) {
      const systemTheme = this.systemColorScheme === 'dark' ? 'dark' : 'light';
      return themes[systemTheme];
    }
    return themes[this.themeId];
  }

  get effectiveAppearance(): AppearanceMode {
    if (this.isSystemAppearance) {
      return this.systemColorScheme || 'light';
    }
    // Determine if current theme is dark or light
    return themeIsDark[this.themeId] ? 'dark' : 'light';
  }

  private setupAppearanceListener = () => {
    if (this.appearanceListener) {
      this.appearanceListener.remove();
    }
    this.appearanceListener = Appearance.addChangeListener(({ colorScheme }) => {
      this.systemColorScheme = colorScheme || 'light';
      // Update theme if system appearance is enabled
      if (this.isSystemAppearance) {
        const systemTheme = colorScheme === 'dark' ? 'dark' : 'light';
        this.themeId = systemTheme;
      }
    });
  };

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'UITheme',
      properties: ['isSystemAppearance', 'themeId'],
      debugMode: false,
    });
    this.setupAppearanceListener();
  }

  dispose = () => {
    if (this.appearanceListener) {
      this.appearanceListener.remove();
    }
  };

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
