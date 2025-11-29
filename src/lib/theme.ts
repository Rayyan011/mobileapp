import type { Theme } from '@react-navigation/native';
import {
  DarkTheme as RNDarkTheme,
  DefaultTheme as RNLightTheme,
} from '@react-navigation/native';

import colors from '@/components/ui/colors';

/**
 * Light Theme - White background with black text
 */
export const LightTheme: Theme = {
  ...RNLightTheme,
  colors: {
    ...RNLightTheme.colors,
    primary: colors.primary[500],
    background: colors.white,
    card: colors.white,
    text: colors.black,
    border: colors.charcoal[200],
    notification: colors.primary[500],
  },
};

/**
 * Dark Theme - Dark background with white text
 */
export const DarkTheme: Theme = {
  ...RNDarkTheme,
  colors: {
    ...RNDarkTheme.colors,
    primary: colors.primary[400],
    background: colors.charcoal[950],
    card: colors.charcoal[900],
    text: colors.white,
    border: colors.charcoal[700],
    notification: colors.primary[400],
  },
};

/**
 * Blue Theme - Blue-tinted dark theme
 */
export const BlueTheme: Theme = {
  ...RNDarkTheme,
  colors: {
    ...RNDarkTheme.colors,
    primary: '#3b82f6',
    background: '#0f172a', // slate-900
    card: '#1e293b', // slate-800
    text: '#e2e8f0', // slate-200
    border: '#334155', // slate-700
    notification: '#3b82f6',
  },
};

/**
 * Green Theme - Green-tinted light theme
 */
export const GreenTheme: Theme = {
  ...RNLightTheme,
  colors: {
    ...RNLightTheme.colors,
    primary: '#10b981',
    background: '#f0fdf4', // green-50
    card: colors.white,
    text: '#064e3b', // green-900
    border: '#86efac', // green-300
    notification: '#10b981',
  },
};

/**
 * Purple Theme - Purple-tinted dark theme
 */
export const PurpleTheme: Theme = {
  ...RNDarkTheme,
  colors: {
    ...RNDarkTheme.colors,
    primary: '#a855f7',
    background: '#1e1b4b', // indigo-950
    card: '#312e81', // indigo-900
    text: '#e0e7ff', // indigo-100
    border: '#4f46e5', // indigo-700
    notification: '#a855f7',
  },
};

/**
 * Orange Theme - Orange-tinted light theme
 */
export const OrangeTheme: Theme = {
  ...RNLightTheme,
  colors: {
    ...RNLightTheme.colors,
    primary: '#f97316',
    background: '#fff7ed', // orange-50
    card: colors.white,
    text: '#7c2d12', // orange-900
    border: '#fdba74', // orange-300
    notification: '#f97316',
  },
};

/**
 * Pink Theme - Pink-tinted light theme
 */
export const PinkTheme: Theme = {
  ...RNLightTheme,
  colors: {
    ...RNLightTheme.colors,
    primary: '#ec4899',
    background: '#fdf2f8', // pink-50
    card: colors.white,
    text: '#831843', // pink-900
    border: '#f9a8d4', // pink-300
    notification: '#ec4899',
  },
};

/**
 * Theme registry - maps theme IDs to theme objects
 */
export const themes = {
  light: LightTheme,
  dark: DarkTheme,
  blue: BlueTheme,
  green: GreenTheme,
  purple: PurpleTheme,
  orange: OrangeTheme,
  pink: PinkTheme,
} as const;

export type ThemeId = keyof typeof themes;

/**
 * Map of theme IDs to whether they are dark themes
 */
export const themeIsDark: Record<ThemeId, boolean> = {
  light: false,
  dark: true,
  blue: true,
  green: false,
  purple: true,
  orange: false,
  pink: false,
};
