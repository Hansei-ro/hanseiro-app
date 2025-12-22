import styled from '@emotion/native';
import React from 'react';
import { View, Text, Image } from 'react-native';

import SunIcon from '@/shared/icons/SunIcon.png';

const WeatherInformFrame = styled(View)`
  display: flex;
  width: 33%;
  height: 12%;
  border: solid 1px #f2f4f5;
  border-radius: 10px;
  background-color: white;
  padding: 18px;
  flex-direction: row;
  margin-right: auto;
  gap: 7px;
`;

const WeatherInformLeft = styled(View)`
  justify-content: center;
`;

const WeatherIcon = styled(Image)`
  width: 40px;
  height: 40px;
`;

const WhetherInformRight = styled(View)`
  justify-content: center;
  display: flex;
  width: 50%;
  height: 100%;
  background-color: none;
`;

const TemperatureText = styled(Text)`
  justify-content: flex-start;
  font-size: 25px;
  font-weight: 600;
  color: #212528;
`;

const CityText = styled(Text)`
  justify-content: flex-end;
  font-size: 16px;
  font-weight: 500;
  color: #212528;
`;

export function WeatherInform() {
  return (
    <WeatherInformFrame>
      <WeatherInformLeft>
        <WeatherIcon source={SunIcon} />
      </WeatherInformLeft>
      <WhetherInformRight>
        <TemperatureText>16&deg;</TemperatureText>
        <CityText>산본</CityText>
      </WhetherInformRight>
    </WeatherInformFrame>
  );
}
