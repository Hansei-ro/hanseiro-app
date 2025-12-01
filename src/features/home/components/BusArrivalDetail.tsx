import styled from '@emotion/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

type BusArrivalDetail = {
  id: string; //표시 할 버스노선갯수
  busNumber: string; //버스번호
  howLong: string; //소요시간
  arrivalTime: string; //도착시간
  isDelay?: boolean; //지연여부
};

const Container = styled(View)`
  display: flex;
  position: fixed;
  bottom: 20%;
  height: 40%;
  width: 90%;
  border: solid 1px #f2f4f5;
  border-radius: 20px;
  background-color: white;
  padding: 15px;
`;

const Outer = styled(View)`
  height: 25%;
  width: 100%;
  background-color: none;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

const Inner = styled(View)`
  height: 80%;
  width: 100%;
  border: none;
  background-color: none;
  display: flex;
  flex-direction: row;
  align-items: center;
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
  width: 80%;
  height: 100%;
  border: none;
  background-color: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  padding-right: 10px;
`;

const MoreInformBox = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  gap: 5px;
`;

const MoreInform = styled(TouchableOpacity)`
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
  padding: 10px;
  margin-bottom: 5px;
`;

const BusNumber = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: #212528;
`;

const ArrivalTime = styled(Text)`
  margin-left: auto;
  color: #212528;
  font-weight: 600;
`;

const ArrivalTimeSoon = styled(Text)`
  margin-left: auto;
  color: #fa5b4a;
  font-weight: 600;
`;

const HowLong = styled(Text)`
  font-size: 16px;
  color: #848c95;
`;

const IsDelayBox = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  justify-content: center;
  gap: 5px;
`;

const IsDelay = styled(Text)`
  text-align: center;
  color: #ffbf01;
  font-size: 12px;
`;

export function BusArrivalDetailBox({
  id,
  busNumber,
  howLong,
  arrivalTime,
  isDelay,
}: BusArrivalDetail) {
  const busIconSource = require('/Users/yeram_910/Desktop/hanseiro-app/assets/BusImage.png');

  const WarningIconSource = require('/Users/yeram_910/Desktop/hanseiro-app/assets/warnning.png');

  const ArrowRightIconSource = require('/Users/yeram_910/Desktop/hanseiro-app/assets/arrowRight.png');

  return (
    <Container>
      <MoreInformBox>
        <MoreInform onPress={() => console.log('버튼 클릭')}>
          <MoreInformText>실시간 버스 정보 </MoreInformText>
          <ArrowRight source={ArrowRightIconSource} />
        </MoreInform>
      </MoreInformBox>
      <Outer>
        <Inner>
          <BusImage source={busIconSource} />
          <BusInform>
            {id}
            <InformLeft>
              <BusNumber>{busNumber}81번</BusNumber>
              <HowLong>{howLong}15분 소요</HowLong>
            </InformLeft>
            <ArrivalTimeSoon>{arrivalTime}곧 도착</ArrivalTimeSoon>
          </BusInform>
        </Inner>
        <IsDelayBox>
          <WarningImage source={WarningIconSource} />
          <IsDelay>{isDelay}현재 교통 혼잡으로 인해 평소보다 오래 걸려요</IsDelay>
        </IsDelayBox>
      </Outer>

      <Outer>
        <Inner>
          <BusImage source={busIconSource} />
          <BusInform>
            {id}
            <InformLeft>
              <BusNumber>{busNumber}10번</BusNumber>
              <HowLong>{howLong}8분 소요</HowLong>
            </InformLeft>
            <ArrivalTime>{arrivalTime}5분 뒤 도착</ArrivalTime>
          </BusInform>
        </Inner>
      </Outer>

      <Outer>
        <Inner>
          <BusImage source={busIconSource} />
          <BusInform>
            {id}
            <InformLeft>
              <BusNumber>{busNumber}3300번</BusNumber>
              <HowLong>{howLong}25분 소요</HowLong>
            </InformLeft>
            <ArrivalTime>{arrivalTime}10분 뒤 도착</ArrivalTime>
          </BusInform>
        </Inner>
      </Outer>
    </Container>
  );
}
