import styled from '@emotion/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import fireImage from '@/shared/icons/FireImage.png';
import MatchingPersonImage from '@/shared/images/MatchingPersonImage_home.png';

const MatchingStatusFrame = styled(View)`
  display: flex;
  position: fixed;
  bottom: 60%;
  height: 15%;
  width: 90%;
  border: solid 1px #f2f4f5;
  border-radius: 20px;
  background-color: white;
  padding: 18px;
`;

const MatchingStatusTopBox = styled(View)`
  width: 100%;
  height: 50%;
  background-color: none;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
`;

const PersonImage = styled(Image)`
  width: 28px;
  height: 28px;
`;

const MatchingStatusText = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  color: #212528;
`;

const FireImage = styled(Image)`
  width: 20px;
  height: 28px;
`;

const MatchingStatusBottomBox = styled(View)`
  display: flex;
  width: 100%;
  height: 50%;
  background-color: none;
`;

const MatchingStatusCountBox = styled(View)`
  flex-direction: row;
  margin-left: auto;
  align-items: center;
  gap: 5px;
`;

const MatchingPersonNow = styled(Text)`
  font-size: 24px;
  color: #212528;
  font-weight: 600;
`;

const Slice = styled(Text)`
  font-size: 19px;
  color: #ced4db;
  font-weight: 400;
`;

const MatchingPersonMax = styled(Text)`
  font-size: 19px;
  color: #ced4db;
  font-weight: 600;
`;

const MatchingProgressContainer = styled(View)`
  display: flex;
  flex-direction: column;
  height: 40%;
  width: 100%;
  justify-content: flex-end;
  background-color: none;
`;

const MatchingProgressTrack = styled(View)`
  width: 100%;
  height: 5px;
  background-color: #f2f4f5;
  border-radius: 7px;
  overflow: hidden;
`;

const StyledProgressFill = styled(View)`
  height: 100%;
  background-color: #ff781c;
  width: 50%;
  border-radius: 7px;
`;

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
