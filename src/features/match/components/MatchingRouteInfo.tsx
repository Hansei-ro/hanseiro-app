import styled from '@emotion/native';
import { MapPin } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

export function MatchingRouteInfo() {
  return (
    <Container>
      <LocationContainer>
        <MapPin color="#FB7035" size={16} />
        <LocationText>금정</LocationText>
      </LocationContainer>

      <DashedLineContainer>
        <DashedLine />
      </DashedLineContainer>

      <LocationContainer>
        <LocationText>한세대</LocationText>
      </LocationContainer>
    </Container>
  );
}

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff4ee;
  padding: 16px 20px;
  border-radius: 12px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  height: 52px;
`;

const LocationContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const LocationText = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.m};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary.black};
`;

const DashedLineContainer = styled(View)`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  height: 1px;
  overflow: hidden;
`;

const DashedLine = styled(View)`
  width: 100%;
  height: 1px;
  border-width: 1px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.colors.primary.main};
  opacity: 0.5;
`;
