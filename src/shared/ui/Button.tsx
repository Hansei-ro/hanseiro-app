import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import React from 'react';
import { ActivityIndicator, Pressable, Text, ViewStyle } from 'react-native';

import { getFontFamily } from '../utils/typography';

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
        <Label variant={variant}>{title}</Label>
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

const Label = styled(Text)<{ variant: 'primary' | 'secondary' }>`
  font-family: ${getFontFamily('semiBold')};
  font-size: ${({ theme }) => theme.typography.fontSize.m};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary.white;
      case 'secondary':
        return theme.colors.text.secondary;
      default:
        return theme.colors.primary.white;
    }
  }};
`;
