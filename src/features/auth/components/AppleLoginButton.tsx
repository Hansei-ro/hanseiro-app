import styled from '@emotion/native';
import React from 'react';
import { Pressable, Image } from 'react-native';

import AppleLogoImg from '../../../../assets/apple-logo.png';

import { Text } from '@/shared/ui/Text';

interface AppleLoginButtonProps {
  onPress: () => void;
}

export function AppleLoginButton({ onPress }: AppleLoginButtonProps) {
  return (
    <StyledButton
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel="Apple로 로그인"
    >
      <AppleLogo source={AppleLogoImg} resizeMode="contain" />
      <Text variant="m" weight="medium" color="#FFFFFF">
        Apple로 로그인
      </Text>
    </StyledButton>
  );
}

const StyledButton = styled(Pressable)`
  width: 353px;
  height: 52px;
  border-radius: 12px;
  background-color: #000000;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const AppleLogo = styled(Image)`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 24px;
`;
