import styled from '@emotion/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BusArrivalDetailBox } from '@/features/home/components/BusArrivalDetail';
import { MatchingStatus } from '@/features/home/components/MatchingStatus';
import { WeatherInform } from '@/features/home/components/WeatherInform';
import { theme } from '@/shared/theme';

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
  padding: 20px;
  gap: 12px;
  background-color: ${theme.colors.background.default};
`;
