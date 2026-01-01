import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { View } from 'react-native';

import { SettingsToggle } from './SettingsToggle';

import { Text } from '@/shared/ui/Text';

export function SettingsList() {
  const theme = useTheme();

  const settingsList = [
    {
      title: '알림',
      items: [
        { label: '채팅', defaultValue: false },
        { label: '매칭', defaultValue: false },
      ],
    },
    {
      title: '화면테마',
      items: [{ label: '다크모드', defaultValue: false }],
    },
    {
      title: '앱 권한',
      items: [{ label: '위치', defaultValue: false }],
    },
  ];

  return (
    <ListContainer>
      {settingsList.map((list, Index) => (
        <SettingsSection key={Index}>
          <Text variant="s" weight="medium" color={theme.colors.text.secondary}>
            {list.title}
          </Text>
          {list.items.map((item, itemIndex) => (
            <SettingsToggle
              key={itemIndex}
              label={item.label}
              defaultValue={item.defaultValue}
              style={itemIndex > 0 ? { marginTop: 6 } : undefined}
            />
          ))}
        </SettingsSection>
      ))}
    </ListContainer>
  );
}

const ListContainer = styled(View)`
  gap: 42px;
`;

const SettingsSection = styled(View)`
  gap: 22px;
`;
