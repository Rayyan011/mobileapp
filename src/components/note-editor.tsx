import React, { useEffect, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  Easing 
} from 'react-native-reanimated';
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
  const titleOpacity = useSharedValue(1);
  const contentOpacity = useSharedValue(1);
  const titleScale = useSharedValue(1);
  const contentScale = useSharedValue(1);
  const prevAnimateRef = useRef(false);

  // Animate only when animateUpdate prop changes from false to true
  useEffect(() => {
    if (animateUpdate && !prevAnimateRef.current) {
      // Trigger animation for both title and content
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

  return (
    <View className="flex-1">
      <View className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
        <AnimatedTextInput
          value={title}
          onChangeText={onTitleChange}
          placeholder={titlePlaceholder}
          placeholderTextColor={colors.neutral[400]}
          className="text-2xl font-bold text-black dark:text-white"
          style={[styles.titleInput, titleAnimatedStyle]}
          autoFocus={false}
        />
      </View>
      <View className="flex-1 px-4 py-4">
        <AnimatedTextInput
          value={content}
          onChangeText={onContentChange}
          placeholder={contentPlaceholder}
          placeholderTextColor={colors.neutral[400]}
          className="flex-1 text-base leading-6 text-black dark:text-white"
          style={[styles.contentInput, contentAnimatedStyle]}
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

