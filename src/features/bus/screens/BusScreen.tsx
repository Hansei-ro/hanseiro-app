import styled from '@emotion/native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../../../shared/theme';

export function BusScreen() {
  return (
    <SafeArea edges={['top']}>
      <Container>
        <Title>버스</Title>
        <Subtitle>버스 시간표 및 노선 정보</Subtitle>
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background.screen};
`;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.background.screen};
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Subtitle = styled(Text)`
  font-size: 16px;
  color: ${theme.colors.text.subtitle};
`;
