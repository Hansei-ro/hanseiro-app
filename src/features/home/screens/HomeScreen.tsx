import styled from '@emotion/native';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BusArrivalDetailBox } from '@/features/home/components/BusArrivalDetail';
import { MatchingStatus } from '@/features/home/components/MatchingStatus';
import { WeatherInform } from '@/features/home/components/WeatherInform';
import { theme } from '@/shared/theme';
import { getFontFamily } from '@/shared/utils/typography';

export function HomeScreen() {
  return (
    <SafeArea edges={['top']}>
      <Container>
        <WeatherInform />
        <MatchingStatus />
        <BusArrivalDetailBox />
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
  font-family: ${getFontFamily('bold')};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Subtitle = styled(Text)`
  font-family: ${getFontFamily('regular')};
  font-family: ${getFontFamily('regular')};
  font-size: 16px;
  color: ${theme.colors.text.secondary};
`;
