import { useRouter } from 'expo-router';
import React from 'react';

import { Cover } from '@/components/cover';
import {
  Button,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';

import { useAuth } from '@/app/providers/auth/auth-provider';

export default function Onboarding() {
  const { setIsFirstTime } = useAuth();
  const router = useRouter();

  return (
    <View className="flex h-full items-center justify-center">
      <FocusAwareStatusBar />
      <View className="w-full flex-1">
        <Cover />
      </View>
      <View className="justify-end ">
        <Text className="my-3 text-center text-5xl font-bold">
          AI Notes App
        </Text>
        <Text className="mb-2 text-center text-lg text-gray-600">
          Capture your thoughts, organize your ideas
        </Text>

        <Text className="my-1 pt-6 text-left text-lg">
          📝 Create and edit notes instantly{' '}
        </Text>
        <Text className="my-1 text-left text-lg">
          🔍 Search through all your notes
        </Text>
        <Text className="my-1 text-left text-lg">
          💾 Your notes saved locally, always available
        </Text>
        <Text className="my-1 text-left text-lg">
          🌙 Beautiful dark mode support
        </Text>
        <Text className="my-1 text-left text-lg">
          🤖  AI powered note cleaning and improvement
        </Text>
      </View>
      <SafeAreaView className="mt-6">
        <Button
          label="Let's Get Started "
          onPress={async () => {
            await setIsFirstTime(false);
            router.replace('/login');
          }}
        />
      </SafeAreaView>
    </View>
  );
}
