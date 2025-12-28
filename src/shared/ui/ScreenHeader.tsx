import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import React from 'react';
import { View, ViewStyle } from 'react-native';

import { Text } from '@/shared/ui/Text';

interface ScreenHeaderProps {
  title: string;
  weight?: 'bold' | 'semiBold' | 'medium' | 'regular';
  style?: ViewStyle;
}

export function ScreenHeader({ title, weight = 'semiBold', style }: ScreenHeaderProps) {
  const theme = useTheme();

  return (
    <Container style={style}>
      <Text variant="titleM" weight={weight} color={theme.colors.primary.black}>
        {title}
      </Text>
    </Container>
  );
}

const Container = styled(View)`
  padding: 16px 20px;
`;
