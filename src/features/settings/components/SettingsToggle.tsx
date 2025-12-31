import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Text } from '@/shared/ui/Text';

interface SettingToggleProps {
  label: string;
  defaultValue?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function SettingToggle({ label, defaultValue = false, style }: SettingToggleProps) {
  const theme = useTheme();
  const [isEnabled, setIsEnabled] = useState(defaultValue);

  return (
    <ToggleContainer style={style}>
      <Text variant="m" weight="medium" color={theme.colors.primary.black}>
        {label}
      </Text>
      <ToggleSwitch onPress={() => setIsEnabled(!isEnabled)} activeOpacity={1}>
        <ToggleTrack isEnabled={isEnabled}>
          <ToggleThumb isEnabled={isEnabled} />
        </ToggleTrack>
      </ToggleSwitch>
    </ToggleContainer>
  );
}

const ToggleContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ToggleSwitch = styled(TouchableOpacity)``;

const ToggleTrack = styled(View)<{ isEnabled: boolean }>`
  width: 54px;
  height: 28px;
  border-radius: 100px;
  background-color: ${({ isEnabled, theme }) =>
    isEnabled ? theme.colors.primary.main : theme.colors.background.toggle};
  justify-content: center;
  padding: 0 2px;
`;

const ToggleThumb = styled(View)<{ isEnabled: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.primary.white};
  ${({ isEnabled }) => isEnabled && 'align-self: flex-end;'}
`;
