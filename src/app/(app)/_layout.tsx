/* eslint-disable react/no-unstable-nested-components */
import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { Note as NoteIcon, Settings as SettingsIcon } from '@/components/ui/icons';
import { useAuth } from '@/app/providers/auth/auth-provider';

export default function TabLayout() {
  const { status, isFirstTime } = useAuth();

  if (isFirstTime) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  if (status === 'signOut') {
    return <Redirect href="/(auth)/login" />;
  }
  
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => <NoteIcon color={color} />,
          tabBarButtonTestID: 'notes-tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarButtonTestID: 'settings-tab',
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null, // Hide this tab
        }}
      />
      <Tabs.Screen
        name="style"
        options={{
          href: null, // Hide this tab
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null, // Hide this tab
        }}
      />
    </Tabs>
  );
}
