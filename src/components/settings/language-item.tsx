import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { translate } from '@/lib';
import { Item } from './item';

export const LanguageItem = observer(() => {
  return (
    <Item
      text="settings.language"
      value={translate('settings.english')}
    />
  );
});
