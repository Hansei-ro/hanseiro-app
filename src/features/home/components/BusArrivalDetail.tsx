import styled from '@emotion/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import arrowRight from '@/shared/icons/arrowRight.png';
import warnning from '@/shared/icons/warnning.png';
import BusIcon from '@/shared/images/BusImage.png';

const BusDetailBoxFrame = styled(View)`
  width: 100%;
  height: 348px;
  border: solid 1px #f2f4f5;
  border-radius: ${({ theme }) => `${theme.radius[12]}px`};
  background-color: ${({ theme }) => theme.colors.primary.white};
  padding: ${({ theme }) => theme.spacing[12]};
`;

const BusDetailOuter = styled(View)`
  height: 80px;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing[8]};
  justify-content: center;
`;

const BusItemWrapper = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-right: ${({ theme }) => theme.spacing[18]};
`;

const BusImage = styled(Image)`
  width: 54px;
  height: 54px;
  margin-left: ${({ theme }) => theme.spacing[12]};
`;

const WarningImage = styled(Image)`
  width: 15px;
  height: 15px;
`;

const ArrowRight = styled(Image)`
  width: 18px;
  height: 18px;
`;

const BusInform = styled(View)`
  flex: 1;
  background-color: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: ${({ theme }) => theme.spacing[16]};
`;

const MoreInformBox = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing[4]};
  gap: ${({ theme }) => theme.spacing[4]};
`;

const MoreInformButton = styled(TouchableOpacity)`
  background-color: none;
  border-radius: 20px;
  margin-bottom: ${({ theme }) => theme.spacing[16]};
  flex-direction: row;
`;

const MoreInformText = styled(Text)`
  color: ${({ theme }) => theme.colors.primary.black};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  font-size: ${({ theme }) => theme.typography.fontSize.s};
`;

const InformLeft = styled(View)`
  gap: ${({ theme }) => theme.spacing[4]};
`;

const BusNumber = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.titleM};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.black};
`;

const ArrivalTime = styled(Text)`
  color: ${({ theme }) => theme.colors.primary.black};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
`;

const ArrivalTimeSoon = styled(Text)`
  color: ${({ theme }) => theme.colors.text.error};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
`;

const HowLong = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.m};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.primary.gray500};
`;

const DelayWarningBox = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing[4]};
  margin-left: 80px;
  width: 230px;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const DelayWarningText = styled(Text)`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.warning};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export function BusArrivalDetailBox(
  {
    // id,
    // busNumber,
    // howLong,
    // arrivalTime,
    // isDelay,
  },
) {
  return (
    <BusDetailBoxFrame>
      <MoreInformBox>
        <MoreInformButton onPress={() => console.log('버튼 클릭')}>
          <MoreInformText>실시간 버스 정보 </MoreInformText>
          <ArrowRight source={arrowRight} />
        </MoreInformButton>
      </MoreInformBox>
      <BusDetailOuter>
        <BusItemWrapper>
          <BusImage source={BusIcon} />
          <BusInform>
            <InformLeft>
              <BusNumber>81번</BusNumber>
              <HowLong>15분 소요</HowLong>
            </InformLeft>
            <ArrivalTimeSoon>곧 도착</ArrivalTimeSoon>
          </BusInform>
        </BusItemWrapper>
      </BusDetailOuter>

      <BusDetailOuter>
        <BusItemWrapper>
          <BusImage source={BusIcon} />
          <BusInform>
            <InformLeft>
              <BusNumber>10번</BusNumber>
              <HowLong>8분 소요</HowLong>
            </InformLeft>
            <ArrivalTime>5분 뒤 도착</ArrivalTime>
          </BusInform>
        </BusItemWrapper>
        <DelayWarningBox>
          <WarningImage source={warnning} />
          <DelayWarningText>현재 교통 혼잡으로 인해 평소보다 오래 걸려요</DelayWarningText>
        </DelayWarningBox>
      </BusDetailOuter>

      <BusDetailOuter>
        <BusItemWrapper>
          <BusImage source={BusIcon} />
          <BusInform>
            <InformLeft>
              <BusNumber>3300번</BusNumber>
              <HowLong>25분 소요</HowLong>
            </InformLeft>
            <ArrivalTime>10분 뒤 도착</ArrivalTime>
          </BusInform>
        </BusItemWrapper>
      </BusDetailOuter>
    </BusDetailBoxFrame>
  );
}
