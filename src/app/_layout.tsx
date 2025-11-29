import '../../global.css';

import { Stack, SplashScreen as ExpoSplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { hydrateStores } from '@/stores';
import { Providers } from './providers';
import { SplashScreen as CustomSplashScreen } from '@/components/splash-screen';

// Prevent the splash screen from auto-hiding
ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Hydrate all stores from AsyncStorage
        await hydrateStores();
        setIsHydrated(true);
      } catch (error) {
        console.error('Failed to hydrate stores:', error);
        setIsHydrated(true); // Continue anyway
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (isHydrated) {
      // Hide native splash screen once the app is ready
      const hideSplash = async () => {
        await ExpoSplashScreen.hideAsync();
      };
      
      // Small delay to ensure smooth transition
      setTimeout(() => {
        hideSplash();
      }, 500);
    }
  }, [isHydrated]);

  // Show custom splash screen while hydrating
  if (!isHydrated) {
    return <CustomSplashScreen />;
  }

  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="notes" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}


