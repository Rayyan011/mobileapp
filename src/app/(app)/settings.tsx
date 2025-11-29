import React from 'react';
import { observer } from 'mobx-react-lite';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import {
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { translate } from '@/lib';
import { useAuth } from '@/app/providers/auth/auth-provider';

export default observer(function Settings() {
  const { signOut } = useAuth();
    
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="flex-1 px-4 pt-16 ">
          <Text className="text-xl font-bold">
            {translate('settings.title')}
          </Text>
          <ItemsContainer title="settings.generale">
            <LanguageItem />
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
