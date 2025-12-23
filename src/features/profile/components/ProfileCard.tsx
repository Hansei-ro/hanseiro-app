import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { View, Image } from 'react-native';

import DEFAULT_PROFILE_IMAGE from '@/shared/images/img-profile-default.png';
import { Text } from '@/shared/ui/Text';

export function ProfileCard() {
  const theme = useTheme();

  return (
    <CardContainer>
      <ProfileImage source={DEFAULT_PROFILE_IMAGE} />
      <InfoContainer>
        <NameSection>
          <Text variant="m" weight="semiBold" color={theme.colors.primary.black}>
            홍길동(컴퓨터공학과)
          </Text>
        </NameSection>

        <ScoreContainer>
          <ScoreLabelRow>
            <Text variant="xs" weight="regular" color={theme.colors.text.secondary}>
              신뢰학점
            </Text>
            <Text variant="s" weight="semiBold" color={theme.colors.primary.main}>
              70학점
            </Text>
          </ScoreLabelRow>
          <ScoreBarContainer>
            <ScoreBarFill />
          </ScoreBarContainer>
        </ScoreContainer>
      </InfoContainer>
    </CardContainer>
  );
}

const CardContainer = styled(View)`
  flex-direction: row;
  gap: 12px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const ProfileImage = styled(Image)`
  width: 70px;
  height: 70px;
`;

const InfoContainer = styled(View)`
  flex: 1;
  gap: 14px;
`;

const NameSection = styled(View)`
  gap: 4px;
`;

const ScoreContainer = styled(View)`
  gap: 8px;
`;

const ScoreLabelRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ScoreBarContainer = styled(View)`
  height: 6px;
  background-color: ${({ theme }) => theme.colors.semantic.stroke};
  border-radius: 12px;
  overflow: hidden;
`;

const ScoreBarFill = styled(View)`
  width: 70%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 12px;
`;
