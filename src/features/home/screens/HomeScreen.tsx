import styled from '@emotion/native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../../../shared/theme';
import { BusArrivalDetailBox } from '../components/BusArrivalDetail';
import { MatchingStatus } from '../components/MatchingStatus';
import { WeatherInform } from '../components/WeatherInform';

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
  background-color: purple;
  background-color: ${theme.colors.background.screen};
`;

const Container = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  gap: 20px;
  background-color: ${theme.colors.background.screen};
`;
