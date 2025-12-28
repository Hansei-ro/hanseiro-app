import styled from '@emotion/native';
import React from 'react';
import { View } from 'react-native';

import { GoogleLoginButton } from '../components/GoogleLoginButton';

export function LoginScreen() {
  const handleGoogleLogin = () => {};

  return (
    <Container>
      {/* <LogoPlaceholder /> */}
      <GoogleLoginButton
        onPress={handleGoogleLogin}
        style={{
          position: 'absolute',
          top: 467,
        }}
      />
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

// const LogoPlaceholder = styled(View)`
//   width: 200px;
//   height: 200px;
// `;
