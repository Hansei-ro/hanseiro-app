import styled from '@emotion/native';
import React from 'react';
import { Pressable, Image, ViewStyle } from 'react-native';

import { Text } from '@/shared/ui/Text';

interface GoogleLoginButtonProps {
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function GoogleLoginButton({ onPress, disabled = false, style }: GoogleLoginButtonProps) {
  return (
    <StyledButton
      onPress={onPress}
      disabled={disabled}
      accessible
      accessibilityRole="button"
      accessibilityLabel="Google 계정으로 로그인"
      style={({ pressed }) => [style, pressed && !disabled && { opacity: 0.9 }]}
    >
      <GoogleLogo source={require('../../../../assets/google-logo.png')} resizeMode="contain" />
      <ButtonText variant="m" weight="medium" color="#1F1F1F">
        Google 계정으로 로그인
      </ButtonText>
    </StyledButton>
  );
}

const StyledButton = styled(Pressable)`
  width: 353px;
  height: 52px;
  padding: 0 16px;
  border-radius: 12px;
  background-color: #f2f2f2;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const GoogleLogo = styled(Image)`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 24px;
`;

const ButtonText = styled(Text)``;
