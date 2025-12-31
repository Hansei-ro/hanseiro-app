import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { View, Image } from 'react-native';

import warnning from '@/shared/icons/warnning.png';
import BusIcon from '@/shared/images/BusImage.png';
import { Theme } from '@/shared/theme';
import { Text } from '@/shared/ui/Text';

export interface BusData {
  id: string;
  busNumber: string;
  howLong: string;
  arrivalTime: string;
  isSoon: boolean;
  isDelay: boolean;
}

interface BusListProps {
  busListData: BusData[];
}

export const BusList = ({ busListData }: BusListProps) => {
  const theme = useTheme() as Theme;

  return (
    <BusDetailBoxFrame>
      {busListData.map((bus) => (
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
