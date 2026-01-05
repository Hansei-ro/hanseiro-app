import styled from '@emotion/native';
import { Link } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { BusList, BusData } from '@/features/bus/components/BusList';
import arrowRight from '@/shared/icons/arrowRight.png';
import { Text } from '@/shared/ui/Text';

const BUS_ARRIVAL_MOCK_DATA: BusData[] = [
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
  {
    id: '3',
    busNumber: '3300번',
    howLong: '25분 소요',
    arrivalTime: '10분 뒤 도착',
    isSoon: false,
    isDelay: false,
  },
];

export function BusArrivalSummaryBox() {
  return (
    <BusDetailBoxFrame>
      <MoreInformBox>
        <Link href="/bus" asChild>
          <MoreInformButton>
            <MoreInformText>실시간 버스 정보</MoreInformText>
            <ArrowRight source={arrowRight} />
          </MoreInformButton>
        </Link>
      </MoreInformBox>

      <BusList busListData={BUS_ARRIVAL_MOCK_DATA} />
    </BusDetailBoxFrame>
  );
}

const BusDetailBoxFrame = styled(View)`
  width: 100%;
  border: solid 1px #f2f4f5;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary.white};
  padding-horizontal: 18px;
  padding-top: 12px;
  padding-bottom: 30px;
`;

const MoreInformBox = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const MoreInformButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const MoreInformText = styled(Text)`
  color: ${({ theme }) => theme.colors.primary.black};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  font-size: ${({ theme }) => theme.typography.fontSize.s};
`;

const ArrowRight = styled(Image)`
  width: 18px;
  height: 18px;
`;
