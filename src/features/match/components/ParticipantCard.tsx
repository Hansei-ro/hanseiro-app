import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Check } from 'lucide-react-native';
import React from 'react';
import { Image, Text, View } from 'react-native';

import DEFAULT_PROFILE_IMAGE from '@/shared/images/img-profile-default.png';

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
      <EmptyContainer isReady={false}>
        <ProfileImage source={DEFAULT_PROFILE_IMAGE} style={{ opacity: 0.3 }} />
        <StatusText isEmpty>합류중...</StatusText>
      </EmptyContainer>
    );
  }

  return (
    <Container isReady={isReady} style={isMe ? { backgroundColor: '#FFF5F0' } : undefined}>
      <LeftContent>
        <ProfileImage source={DEFAULT_PROFILE_IMAGE} />
        <InfoContainer>
          <NameRow>
            <NameText>{name}</NameText>
            {department && <DepartmentText>({department})</DepartmentText>}
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
  background-color: ${({ theme }) => theme.colors.primary.white};
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme, isReady }) =>
    isReady ? theme.colors.primary.main : theme.colors.semantic.stroke};
  margin-bottom: 8px;
  height: 72px;
`;

const EmptyContainer = styled(Container)`
  border-color: ${({ theme }) => theme.colors.semantic.stroke};
  border-style: dashed;
  justify-content: flex-start;
  gap: 12px;
`;

const LeftContent = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled(Image)`
  width: 40px;
  height: 40px;
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
  font-size: ${({ theme }) => theme.typography.fontSize.m};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.black};
`;

const DepartmentText = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.s};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.primary.black};
`;

const StatusText = styled(Text)<{ isReady?: boolean; isEmpty?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, isReady, isEmpty }) => {
    if (isEmpty) return theme.colors.text.tertiary;
    if (isReady) return theme.colors.primary.main;
    return theme.colors.text.secondary;
  }};
`;

const RightContent = styled(View)``;

const CheckCircle = styled(View)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  align-items: center;
  justify-content: center;
`;

const EmptyCircle = styled(View)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.text.tertiary};
  background-color: transparent;
`;
