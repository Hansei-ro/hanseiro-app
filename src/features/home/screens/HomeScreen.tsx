import styled from '@emotion/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BusArrivalSummary } from '@/features/bus/components/BusArrivalSummary';
import { MatchingStatusCard } from '@/features/match/components/MatchingStatusCard';
import { WeatherWidget } from '@/features/weather/components/WeatherWidget';
import { theme } from '@/shared/theme';

export function HomeScreen() {
  return (
    <SafeArea edges={['top']}>
      <Container>
        <WeatherWidget />
        <MatchingStatusCard />
        <BusArrivalSummary />
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
