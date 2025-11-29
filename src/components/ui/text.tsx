import React from 'react';
import type { TextProps, TextStyle } from 'react-native';
import { StyleSheet, Text as RNText } from 'react-native';
import { observer } from 'mobx-react-lite';
import { twMerge } from 'tailwind-merge';

import type { TxKeyPath } from '@/lib/i18n';
import { translate } from '@/lib/i18n';
import { useTheme } from '@/hooks';

interface Props extends TextProps {
  className?: string;
  tx?: TxKeyPath;
}

export const Text = observer(({
  className = '',
  style,
  tx,
  children,
  ...props
}: Props) => {
  const { colors } = useTheme();
  
  const textStyle = React.useMemo(
    () => twMerge('text-base font-inter font-normal', className),
    [className]
  );

  const nStyle = React.useMemo(
    () =>
      StyleSheet.flatten([
        {
          writingDirection: 'ltr',
          color: colors.text, // Use theme text color
        },
        style, // Allow style prop to override
      ]) as TextStyle,
    [style, colors.text]
  );

  return (
    <RNText className={textStyle} style={nStyle} {...props}>
      {tx ? translate(tx) : children}
    </RNText>
  );
});
