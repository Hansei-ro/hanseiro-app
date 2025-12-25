import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Check } from 'lucide-react-native';
import React from 'react';
import { Image, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import DEFAULT_PROFILE_IMAGE from '@/shared/images/img-profile-default.png';
import { Text } from '@/shared/ui/Text';

interface ParticipantCardProps {
  name?: string;
  department?: string;
  status?: string;
  isMe?: boolean;
  isReady?: boolean;
  isEmpty?: boolean;
}

export function ParticipantCard({
  name,
  department,
  status,
  isMe = false,
  isReady = false,
  isEmpty = false,
}: ParticipantCardProps) {
  const theme = useTheme();

  if (isEmpty) {
    return (
      <EmptyWrapper>
        <DashedBorder />
        <EmptyContent>
          <ProfileImage source={DEFAULT_PROFILE_IMAGE} style={{ opacity: 0.5 }} />
          <Text variant="s" weight="medium" color={theme.colors.text.joining}>
            합류중...
          </Text>
        </EmptyContent>
      </EmptyWrapper>
    );
  }

  return (
    <Container isReady={isReady}>
      <LeftContent>
        <ProfileImage source={DEFAULT_PROFILE_IMAGE} />
        <InfoContainer>
          <NameRow>
            <Text variant="s" weight="medium" color={theme.colors.primary.black}>
              {name}
            </Text>
            {!isMe && department && (
              <Text variant="s" weight="medium" color={theme.colors.primary.black}>
                ({department})
              </Text>
            )}
          </NameRow>
          <Text
            variant={isEmpty ? 's' : 'xs'}
            weight={isEmpty ? 'medium' : isReady ? 'semiBold' : 'regular'}
            color={
              isEmpty
                ? theme.colors.text.joining
                : isReady
                  ? theme.colors.primary.main
                  : theme.colors.text.waiting
            }
          >
            {status}
          </Text>
        </InfoContainer>
      </LeftContent>

      <RightContent>
        {isReady ? (
          <CheckCircle>
            <Check color={theme.colors.primary.white} size={14} strokeWidth={3} />
          </CheckCircle>
        ) : (
          <EmptyCircle />
        )}
      </RightContent>
    </Container>
  );
}

const Container = styled(View)<{ isReady: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 12px;
  border-width: 1.5px;
  border-color: ${({ theme, isReady }) =>
    isReady ? theme.colors.primary.main : theme.colors.border.waitingOutline};
  height: 70px;
`;

const EmptyWrapper = styled(View)`
  position: relative;
  height: 70px;
  border-radius: 12px;
`;

const DashedBorder = () => {
  const theme = useTheme();
  return (
    <Svg
      width="100%"
      height="70"
      viewBox="0 0 400 70"
      preserveAspectRatio="none"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}
      pointerEvents="none"
    >
      <Rect
        x="0.75"
        y="0.75"
        width="398.5"
        height="68.5"
        rx="12"
        ry="12"
        fill="none"
        stroke={theme.colors.border.joiningOutline}
        strokeWidth="1.5"
        strokeDasharray="5, 3"
      />
    </Svg>
  );
};

const EmptyContent = styled(View)`
  flex: 1;
  flex-direction: row;
  padding: 12px 16px;
  gap: 12px;
`;

const LeftContent = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled(Image)`
  width: 46px;
  height: 46px;
  border-radius: 20px;
`;

const InfoContainer = styled(View)`
  justify-content: center;
  gap: 2px;
`;

const NameRow = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const RightContent = styled(View)``;

const CheckCircle = styled(View)`
  width: 22px;
  height: 22px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  align-items: center;
  justify-content: center;
`;

const EmptyCircle = styled(View)`
  width: 22px;
  height: 22px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.text.tertiary};
  background-color: transparent;
`;
