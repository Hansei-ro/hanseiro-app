import styled from '@emotion/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import arrowRight from '@/shared/icons/arrowRight.png';
import warnning from '@/shared/icons/warnning.png';
import BusIcon from '@/shared/images/BusImage.png';

const BusDetailBoxFrame = styled(View)`
  display: flex;
  position: fixed;
  bottom: 0%;
  height: 50%;
  width: 100%;
  border: solid 1px #f2f4f5;
  border-radius: 10px;
  background-color: white;
  padding: 15px;
`;

const BusDetailOuter = styled(View)`
  width: 100%;
  height: 29%;
  background-color: none;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const BusItemWrapper = styled(View)`
  width: 100%;
  background-color: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 10px;
`;

const BusImage = styled(Image)`
  width: 54px;
  height: 54px;
  margin-left: 10px;
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
  height: 100%;
  background-color: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 15px;
`;

const MoreInformBox = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  gap: 5px;
`;

const MoreInformButton = styled(TouchableOpacity)`
  background-color: none;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
`;

const MoreInformText = styled(Text)`
  color: #212528;
  font-weight: 600;
  font-size: 14px;
`;

const InformLeft = styled(View)`
  gap: 6px;
`;

const BusNumber = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: #212528;
`;

const ArrivalTime = styled(Text)`
  color: #212528;
  font-weight: 600;
`;

const ArrivalTimeSoon = styled(Text)`
  color: #fa5b4a;
  font-weight: 600;
`;

const HowLong = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: #848c95;
`;

const DelayWarningBox = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-left: 70px;
  gap: 5px;
  background-color: none;
`;

const DelayWarningText = styled(Text)`
  text-align: center;
  color: #ffbf01;
  font-size: 12px;
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
              <BusNumber>10번</BusNumber>
              <HowLong>8분 소요</HowLong>
            </InformLeft>
            <ArrivalTime>5분 뒤 도착</ArrivalTime>
          </BusInform>
        </BusItemWrapper>
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
