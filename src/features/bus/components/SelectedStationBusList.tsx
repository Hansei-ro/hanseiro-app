import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { View, Image } from 'react-native';

import warnning from '@/shared/icons/warnning.png';
import BusIcon from '@/shared/images/BusImage.png';
import { Theme } from '@/shared/theme';
import { Text } from '@/shared/ui/Text';

interface BusData {
  id: string;
  busNumber: string;
  howLong: string;
  arrivalTime: string;
  isSoon: boolean;
  isDelay: boolean;
}

interface SelectedStationBusListProps {
  stationName: '금정역' | '산본역';
}

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

export const SelectedStationBusList = ({ stationName }: SelectedStationBusListProps) => {
  const theme = useTheme() as Theme;
  const busList = MOCK_DATA[stationName];

  return (
    <BusDetailBoxFrame>
      {busList.map((bus) => (
        <BusDetailOuter key={bus.id} isDelay={bus.isDelay}>
          <BusItemWrapper>
            <BusImage source={BusIcon} />
            <BusInform>
              <InformLeft>
                <Text variant="titleM" weight="semiBold">
                  {bus.busNumber}
                </Text>
                <Text variant="m" weight="medium" color={theme.colors.primary.gray500}>
                  {bus.howLong}
                </Text>
              </InformLeft>
              <Text
                variant="m"
                weight={bus.isSoon ? 'semiBold' : 'medium'}
                color={bus.isSoon ? theme.colors.text.error : theme.colors.primary.black}
              >
                {bus.arrivalTime}
              </Text>
            </BusInform>
          </BusItemWrapper>
          {bus.isDelay && (
            <DelayWarningBox>
              <WarningImage source={warnning} />
              <DelayWarningText>현재 교통 혼잡으로 인해 평소보다 오래 걸려요</DelayWarningText>
            </DelayWarningBox>
          )}
        </BusDetailOuter>
      ))}
    </BusDetailBoxFrame>
  );
};

const BusDetailBoxFrame = styled(View)`
  width: 100%;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background.default};
  padding-horizontal: 2px;
  gap: 24px;
`;

const BusDetailOuter = styled(View)<{ isDelay: boolean }>`
  height: ${({ isDelay }) => (isDelay ? '90px' : '70px')};
  flex-direction: column;
  justify-content: center;
`;

const BusItemWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const BusImage = styled(Image)`
  width: 54px;
  height: 54px;
`;

const WarningImage = styled(Image)`
  width: 15px;
  height: 15px;
`;

const BusInform = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 11px;
`;

const InformLeft = styled(View)`
  gap: 4px;
`;

const DelayWarningBox = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 11px;
  margin-left: 65px;
  gap: 4px;
`;

const DelayWarningText = styled(Text)`
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.warning};
  font-size: ${({ theme }: { theme: Theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }: { theme: Theme }) => theme.typography.fontWeight.bold};
`;
