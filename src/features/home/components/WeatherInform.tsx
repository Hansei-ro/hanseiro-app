import styled from '@emotion/native';
import React from 'react';
import { View, Text, Image } from 'react-native';

import SunIcon from '@/shared/icons/SunIcon.png';

const WeatherInformFrame = styled(View)`
  width: 112px;
  height: 80px;
  border: solid 1px #f2f4f5;
  border-radius: ${({ theme }) => `${theme.radius[12]}px`};
  background-color: ${({ theme }) => theme.colors.primary.white};
  flex-direction: row;
  margin-right: auto;
  gap: 8px;
  padding-top: ${({ theme }) => theme.spacing[18]};
  padding-bottom: ${({ theme }) => theme.spacing[18]};
  padding-left: ${({ theme }) => theme.spacing[16]};
  padding-right: ${({ theme }) => theme.spacing[16]};
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
  ${({ theme }) => theme.typography.fontSize.m};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary.black};
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
