import styled from '@emotion/native';
import React from 'react';
import { View, Text, Image } from 'react-native';

import SunIcon from '@/shared/icons/SunIcon.png';

export function WeatherWidget() {
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

const WeatherInformFrame = styled(View)`
  width: 112px;
  height: auto;
  border: solid 1px #f2f4f5;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary.white};
  flex-direction: row;
  margin-right: auto;
  gap: 8px;
  padding-right: 15px;
  padding-left: 16px;
  padding-vertical: 20px;
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
  width: 35px;
  height: 44px;
  background-color: none;
`;

const TemperatureText = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.titleM};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.primary.black};
`;

const CityText = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.m};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary.black};
`;
