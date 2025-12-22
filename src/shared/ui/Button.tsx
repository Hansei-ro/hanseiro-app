import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import React from 'react';
import { ActivityIndicator, Pressable, ViewStyle } from 'react-native';

import { Text } from '@/shared/ui/Text';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const theme = useTheme();

  return (
    <Container
      onPress={onPress}
      variant={variant}
      disabled={disabled || loading}
      style={({ pressed }) => [style, pressed && !disabled && !loading && { opacity: 0.8 }]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? theme.colors.primary.white : theme.colors.text.secondary}
        />
      ) : (
        <Text
          variant="m"
          weight="semiBold"
          color={variant === 'primary' ? theme.colors.primary.white : theme.colors.text.secondary}
        >
          {title}
        </Text>
      )}
    </Container>
  );
}

const Container = styled(Pressable)<{
  variant: 'primary' | 'secondary';
  disabled: boolean;
}>`
  width: 100%;
  height: 54px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, variant, disabled }) => {
    if (disabled) return theme.colors.semantic.iconNav; // Disable color
    switch (variant) {
      case 'primary':
        return theme.colors.primary.main;
      case 'secondary':
        return theme.colors.border.cardOutline;
      default:
        return theme.colors.primary.main;
    }
  }};
`;
