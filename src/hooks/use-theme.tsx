import { useColorScheme } from 'react-native';
import { useStores } from '@/stores';
import { themes, themeIsDark, type ThemeId } from '@/lib/theme';

/**
 * Hook to get the current theme
 * Returns theme object, colors, and dark mode status
 */
export const useTheme = () => {
  const stores = useStores();
  const systemColorScheme = useColorScheme();
  
  const uiTheme = stores?.uiTheme;
  
  // Get current theme ID
  let themeId: ThemeId = 'light';
  if (uiTheme) {
    if (uiTheme.isSystemAppearance) {
      themeId = systemColorScheme === 'dark' ? 'dark' : 'light';
    } else {
      themeId = uiTheme.themeId;
    }
  } else {
    themeId = systemColorScheme === 'dark' ? 'dark' : 'light';
  }
  
  // Get theme based on theme ID
  const theme = themes[themeId];
  const colors = theme.colors;
  
  // Determine if dark mode (for components that need it)
  const isDark = themeIsDark[themeId];
  
  return {
    theme,
    colors,
    isDark,
    isLight: !isDark,
    themeId,
  };
};
