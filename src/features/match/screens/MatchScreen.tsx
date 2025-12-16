import styled from '@emotion/native';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../../shared/ui/Button';

export function MatchScreen() {
  return (
    <SafeArea edges={['top']}>
      <Container>
        <Title>매칭</Title>
        <Subtitle>택시 매칭 및 방 생성</Subtitle>
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

const Title = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.titleL};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: 8px;
`;

const Subtitle = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.m};
  color: ${({ theme }) => theme.colors.text.secondary};
`;
