import React from 'react';

import { Text, View } from '@/components/ui';
import { useTheme } from '@/hooks';
import colors from '@/components/ui/colors';
import type { TxKeyPath } from '@/lib';

type Props = {
  children: React.ReactNode;
  title?: TxKeyPath;
};

export const ItemsContainer = ({ children, title }: Props) => {
  const { isDark } = useTheme();
  const containerBg = isDark ? colors.charcoal[800] : colors.white;
  const containerBorder = isDark ? colors.charcoal[700] : colors.charcoal[200];
  
  return (
    <>
      {title && <Text className="pb-2 pt-4 text-lg" tx={title} />}
      <View 
        className="rounded-md border"
        style={{ backgroundColor: containerBg, borderColor: containerBorder }}
      >
        {children}
      </View>
    </>
  );
};
