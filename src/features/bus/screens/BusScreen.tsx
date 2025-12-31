import styled from '@emotion/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BusData, BusList } from '@/features/bus/components/BusList';
import { BusListTabBar } from '@/features/bus/components/BusListTabBar';
import { ScreenHeader } from '@/shared/ui/ScreenHeader';

export function BusScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ station?: '금정역' | '산본역' }>();

  const selectedStation = params.station || '산본역';

  const handleSelect = (station: '금정역' | '산본역') => {
    router.setParams({ station });
  };

  const MOCK_DATA: Record<'금정역' | '산본역', BusData[]> = {
    금정역: [
      {
        id: '1',
        busNumber: '81번',
        howLong: '15분 소요',
        arrivalTime: '곧 도착',
        isSoon: true,
        isDelay: false,
      },
      {
        id: '2',
        busNumber: '10번',
        howLong: '8분 소요',
        arrivalTime: '5분 뒤 도착',
        isSoon: false,
        isDelay: true,
      },
    ],
    산본역: [
      {
        id: '3',
        busNumber: '3300번',
        howLong: '25분 소요',
        arrivalTime: '10분 뒤 도착',
        isSoon: false,
        isDelay: false,
      },
    ],
  };

  return (
    <SafeArea edges={['top']}>
      <ScreenHeader title="버스" />
      <Container>
        <BusListTabBar current={selectedStation} onSelect={handleSelect} />

        <BusList busListData={MOCK_DATA[selectedStation]} />
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const Container = styled(View)`
  flex: 1;
  padding-horizontal: 20px;
  gap: 6px;
`;
