import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { StyleProp, View, ViewStyle, Switch } from 'react-native';

import { Text } from '@/shared/ui/Text';

interface SettingsToggleProps {
  label: string;
  defaultValue?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function SettingsToggle({ label, defaultValue = false, style }: SettingsToggleProps) {
  const theme = useTheme();
  const [isEnabled, setIsEnabled] = useState(defaultValue);

  return (
    <ToggleContainer style={style}>
      <Text variant="m" weight="medium" color={theme.colors.primary.black}>
        {label}
      </Text>
      <Switch
        value={isEnabled}
        onValueChange={setIsEnabled}
        trackColor={{
          false: theme.colors.background.toggle,
          true: theme.colors.primary.main,
        }}
        thumbColor={theme.colors.primary.white}
      />
    </ToggleContainer>
  );
}

const ToggleContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
