import styled from '@emotion/native';
import React from 'react';
import { View, Text, Image } from 'react-native';

import fireImage from '@/shared/icons/FireImage.png';
import MatchingPersonImage from '@/shared/images/MatchingPersonImage_home.png';

export function MatchingStatus() {
  return (
    <MatchingStatusFrame>
      <MatchingStatusTopBox>
        <PersonImage source={MatchingPersonImage} />
        <MatchingStatusText>산본역 매칭현황</MatchingStatusText>
        <FireImage source={fireImage} />
      </MatchingStatusTopBox>

      <MatchingStatusBottomBox>
        <MatchingStatusCountBox>
          <MatchingPersonNow>2</MatchingPersonNow>
          <Slice>/</Slice>
          <MatchingPersonMax>4</MatchingPersonMax>
        </MatchingStatusCountBox>

        <MatchingProgressContainer>
          <MatchingProgressTrack>
            <StyledProgressFill />
          </MatchingProgressTrack>
        </MatchingProgressContainer>
      </MatchingStatusBottomBox>
    </MatchingStatusFrame>
  );
}

const MatchingStatusFrame = styled(View)`
  height: auto;
  width: 100%;
  align-self: stretch;
  border: solid 1px #f2f4f5;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary.white};
  padding-horizontal: 20px;
  padding-bottom: 22px;
  padding-top: 12px;
`;

const MatchingStatusTopBox = styled(View)`
  height: 45px;
  background-color: none;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  background-color: none;
`;

const PersonImage = styled(Image)`
  width: 28px;
  height: 28px;
  margin-right: 8px;
`;

const MatchingStatusText = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.titleM};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.primary.black};
`;

const FireImage = styled(Image)`
  width: 16px;
  height: 22px;
`;

const MatchingStatusBottomBox = styled(View)`
  height: 45px;
`;

const MatchingStatusCountBox = styled(View)`
  flex-direction: row;
  margin-left: auto;
  align-items: center;
  gap: 4px;
`;

const MatchingPersonNow = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.titleL};
  color: ${({ theme }) => theme.colors.primary.black};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
`;

const Slice = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.l};
  color: ${({ theme }) => theme.colors.primary.gray300};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
`;

const MatchingPersonMax = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.l};
  color: ${({ theme }) => theme.colors.primary.gray300};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
`;

const MatchingProgressContainer = styled(View)`
  flex-direction: column;
  height: 12px;
  width: 100%;
  justify-content: flex-end;
  background-color: none;
`;

const MatchingProgressTrack = styled(View)`
  width: 100%;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.background.chat};
  border-radius: 7px;
  overflow: hidden;
`;

const StyledProgressFill = styled(View)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary.main};
  width: 50%;
  border-radius: 7px;
`;
