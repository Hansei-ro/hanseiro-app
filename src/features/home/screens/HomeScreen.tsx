import styled from '@emotion/native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getFontFamily } from '../../../shared/lib/typography';
import { theme } from '../../../shared/theme';

export function HomeScreen() {
  return (
    <SafeArea edges={['top']}>
      <Container>
        <Title>홈</Title>
        <Subtitle>한세로 메인 화면</Subtitle>
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background.default};
`;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.background.default};
`;

const Title = styled(Text)`
  font-family: ${getFontFamily('bold')};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Subtitle = styled(Text)`
  font-family: ${getFontFamily('regular')};
  font-size: 16px;
  color: ${theme.colors.text.secondary};
`;
