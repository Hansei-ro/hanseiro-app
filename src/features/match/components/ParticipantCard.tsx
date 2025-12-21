import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Check } from 'lucide-react-native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import DEFAULT_PROFILE_IMAGE from '@/shared/images/img-profile-default.png';
import { getFontFamily } from '@/shared/lib/typography';

interface ParticipantCardProps {
  name?: string;
  department: string;
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
          <StatusText isEmpty>합류중...</StatusText>
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
            <NameText>{name}</NameText>
            {!isMe && <NameText>({department})</NameText>}
          </NameRow>
          <StatusText isReady={isReady}>{status}</StatusText>
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
        strokeDasharray="6, 4"
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

const NameText = styled(Text)`
  font-family: ${getFontFamily('medium')};
  font-size: ${({ theme }) => theme.typography.fontSize.s};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary.black};
`;

const StatusText = styled(Text)<{ isReady?: boolean; isEmpty?: boolean }>`
  font-family: ${({ isReady, isEmpty }) => {
    if (isEmpty) return getFontFamily('medium');
    if (isReady) return getFontFamily('semiBold');
    return getFontFamily('regular');
  }};
  font-size: ${({ theme, isEmpty }) => {
    if (isEmpty) return theme.typography.fontSize.s;
    return theme.typography.fontSize.xs;
  }};
  font-weight: ${({ theme, isReady, isEmpty }) => {
    if (isEmpty) return theme.typography.fontWeight.medium;
    if (isReady) return theme.typography.fontWeight.semiBold;
    return theme.typography.fontWeight.regular;
  }};
  color: ${({ theme, isReady, isEmpty }) => {
    if (isEmpty) return theme.colors.text.joining;
    if (isReady) return theme.colors.primary.main;
    return theme.colors.text.waiting;
  }};
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
