import React, { useEffect, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  Easing 
} from 'react-native-reanimated';
import { useTheme } from '@/hooks';
import colors from './ui/colors';

interface NoteEditorProps {
  title: string;
  content: string;
  onTitleChange: (text: string) => void;
  onContentChange: (text: string) => void;
  titlePlaceholder?: string;
  contentPlaceholder?: string;
  animateUpdate?: boolean;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const NoteEditor = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  titlePlaceholder = 'Note title...',
  contentPlaceholder = 'Start writing...',
  animateUpdate = false,
}: NoteEditorProps) => {
  const { colors: themeColors, isDark } = useTheme();
  const titleOpacity = useSharedValue(1);
  const contentOpacity = useSharedValue(1);
  const titleScale = useSharedValue(1);
  const contentScale = useSharedValue(1);
  const prevAnimateRef = useRef(false);

  useEffect(() => {
    if (animateUpdate && !prevAnimateRef.current) {
      titleOpacity.value = withSequence(
        withTiming(0.3, { duration: 150, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 300, easing: Easing.in(Easing.ease) })
      );
      titleScale.value = withSequence(
        withTiming(0.98, { duration: 150, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 300, easing: Easing.in(Easing.ease) })
      );
      
      contentOpacity.value = withSequence(
        withTiming(0.3, { duration: 150, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 300, easing: Easing.in(Easing.ease) })
      );
      contentScale.value = withSequence(
        withTiming(0.98, { duration: 150, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 300, easing: Easing.in(Easing.ease) })
      );
    }
    prevAnimateRef.current = animateUpdate;
  }, [animateUpdate, titleOpacity, titleScale, contentOpacity, contentScale]);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ scale: titleScale.value }],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ scale: contentScale.value }],
  }));

  const borderColor = isDark ? colors.charcoal[700] : colors.charcoal[200];
  const placeholderColor = isDark ? colors.charcoal[500] : colors.charcoal[400];

  return (
    <View className="flex-1" style={{ backgroundColor: themeColors.background }}>
      <View 
        className="border-b px-4 py-3"
        style={{ borderColor }}
      >
        <AnimatedTextInput
          value={title}
          onChangeText={onTitleChange}
          placeholder={titlePlaceholder}
          placeholderTextColor={placeholderColor}
          className="text-2xl font-bold"
          style={[
            styles.titleInput,
            titleAnimatedStyle,
            { color: themeColors.text },
          ]}
          autoFocus={false}
        />
      </View>
      <View className="flex-1 px-4 py-4">
        <AnimatedTextInput
          value={content}
          onChangeText={onContentChange}
          placeholder={contentPlaceholder}
          placeholderTextColor={placeholderColor}
          className="flex-1 text-base leading-6"
          style={[
            styles.contentInput,
            contentAnimatedStyle,
            { color: themeColors.text },
          ]}
          multiline
          textAlignVertical="top"
          autoFocus={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleInput: {
    minHeight: 40,
  },
  contentInput: {
    minHeight: 400,
  },
});
