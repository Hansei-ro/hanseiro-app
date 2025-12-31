import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { View } from 'react-native';

import { SettingToggle } from './SettingsToggle';

import { Text } from '@/shared/ui/Text';

export function SettingsList() {
  const theme = useTheme();

  return (
    <ListContainer>
      <SettingsSection>
        <Text variant="s" weight="medium" color={theme.colors.text.secondary}>
          알림
        </Text>
        <SettingToggle label="채팅" defaultValue />
        <SettingToggle label="매칭" defaultValue={false} style={{ marginTop: 6 }} />
      </SettingsSection>

      <SettingsSection>
        <Text variant="s" weight="medium" color={theme.colors.text.secondary}>
          화면테마
        </Text>
        <SettingToggle label="다크모드" defaultValue={false} />
      </SettingsSection>

      <SettingsSection>
        <Text variant="s" weight="medium" color={theme.colors.text.secondary}>
          앱 권한
        </Text>
        <SettingToggle label="위치" defaultValue={false} />
      </SettingsSection>
    </ListContainer>
  );
}

const ListContainer = styled(View)`
  gap: 42px;
`;

const SettingsSection = styled(View)`
  gap: 22px;
`;
