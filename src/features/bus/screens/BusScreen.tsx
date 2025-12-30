import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SelectedStationBusList } from '../components/SelectedStationBusList';

import { BusListTabBar } from '@/features/bus/components/BusListTabBar';
import { Theme } from '@/shared/theme';
import { Text } from '@/shared/ui/Text';

export function BusScreen() {
  const theme = useTheme() as Theme;
  const router = useRouter();

  const params = useLocalSearchParams<{ station?: '금정역' | '산본역' }>();
  const selectedStation = params.station || '산본역';

  const handleSelect = (station: '금정역' | '산본역') => {
    router.setParams({ station });
  };

  return (
    <SafeArea edges={['top']}>
      <Header>
        <Text variant="titleM" weight="semiBold" color={theme.colors.primary.black}>
          버스
        </Text>
      </Header>
      <Container>
        <BusListTabBar current={selectedStation} onSelect={handleSelect} />
        <SelectedStationBusList stationName={selectedStation} />
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
  padding-horizontal: 20px;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

const Header = styled(View)`
  padding: 16px 20px;
`;
