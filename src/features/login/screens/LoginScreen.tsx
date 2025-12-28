import styled from '@emotion/native';
import React from 'react';
import { View } from 'react-native';

import { AppleLoginButton } from '../components/AppleLoginButton';
import { GoogleLoginButton } from '../components/GoogleLoginButton';

export function LoginScreen() {
  const handleGoogleLogin = () => {
    console.log('Google 로그인');
  };

  const handleAppleLogin = () => {
    console.log('Apple 로그인');
  };
  return (
    <Container>
      <ButtonContainer>
        <GoogleLoginButton onPress={handleGoogleLogin} />
        <AppleLoginButton onPress={handleAppleLogin} />
      </ButtonContainer>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const ButtonContainer = styled(View)`
  margin-top: 467px;
  gap: 10px;
`;
