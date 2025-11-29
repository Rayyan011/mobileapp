import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '@/hooks';
import { Text } from './ui';
import colors from './ui/colors';

export function SplashScreen() {
  const { colors: themeColors, isDark } = useTheme();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Fade in animation
    opacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) });
    scale.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) });
    
    // Subtle rotation animation for the icon
    rotation.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-5, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const noteStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(rotation.value, [-5, 5], [-2, 2]) },
    ],
  }));

  const containerStyle = {
    backgroundColor: isDark ? colors.charcoal[950] : colors.white,
  };

  const notePaperStyle = {
    backgroundColor: isDark ? colors.charcoal[850] : colors.white,
    borderColor: isDark ? colors.charcoal[600] : colors.charcoal[300],
  };

  const noteLineStyle = {
    backgroundColor: isDark ? colors.charcoal[600] : colors.charcoal[200],
  };

  const titleStyle = {
    color: themeColors.text,
  };

  const subtitleStyle = {
    color: isDark ? colors.charcoal[300] : colors.charcoal[600],
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        {/* Notes Icon - Simple representation */}
        <Animated.View style={[styles.note, noteStyle]}>
          <View style={[styles.notePaper, notePaperStyle]} />
          <View style={[styles.noteLine1, noteLineStyle]} />
          <View style={[styles.noteLine2, noteLineStyle]} />
          <View style={[styles.noteLine3, noteLineStyle]} />
        </Animated.View>
      </Animated.View>
      
      <Animated.View style={animatedStyle}>
        <Text style={[styles.title, titleStyle]}>My Notes</Text>
        <Text style={[styles.subtitle, subtitleStyle]}>Capture your thoughts</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
  },
  note: {
    width: 80,
    height: 100,
    position: 'relative',
  },
  notePaper: {
    width: 80,
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  noteLine1: {
    position: 'absolute',
    top: 20,
    left: 12,
    right: 12,
    height: 2,
    borderRadius: 1,
  },
  noteLine2: {
    position: 'absolute',
    top: 35,
    left: 12,
    right: 12,
    height: 2,
    borderRadius: 1,
  },
  noteLine3: {
    position: 'absolute',
    top: 50,
    left: 12,
    right: 30,
    height: 2,
    borderRadius: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

