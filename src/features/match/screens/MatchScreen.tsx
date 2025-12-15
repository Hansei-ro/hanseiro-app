import styled from '@emotion/native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function MatchScreen() {
  return (
    <SafeArea edges={['top']}>
      <Container>
        <Title>매칭</Title>
        <Subtitle>택시 매칭 및 방 생성</Subtitle>
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
