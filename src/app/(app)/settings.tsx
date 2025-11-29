import React from 'react';
import { observer } from 'mobx-react-lite';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { ThemeItem } from '@/components/settings/theme-item';
import {
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { translate } from '@/lib';
import { useAuth } from '@/app/providers/auth/auth-provider';
import { useTheme } from '@/hooks';

export default observer(function Settings() {
  const { signOut } = useAuth();
  const { colors: themeColors } = useTheme();
    
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView style={{ backgroundColor: themeColors.background }}>
        <View className="flex-1 px-4 pt-16">
          <Text className="text-xl font-bold">
            {translate('settings.title')}
          </Text>
          <ItemsContainer title="settings.generale">
            <ThemeItem />
          </ItemsContainer>

          <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={() => signOut()} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  );
});
