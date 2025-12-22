import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

export function MatchScreen() {
  const theme = useTheme();

  return (
    <SafeArea edges={['top']}>
      <Container>
        <Text
          variant="titleL"
          weight="bold"
          style={{ marginBottom: 8 }}
          color={theme.colors.primary.black}
        >
          매칭
        </Text>
        <Text variant="m" weight="regular" color={theme.colors.text.secondary}>
          택시 매칭 및 방 생성
        </Text>
        <Button
          title="매칭 대기 화면 (임시)"
          onPress={() => router.push('/match/waiting')}
          style={{ width: 200, marginTop: 20 }}
        />
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.default};
`;
