import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import React from 'react';
import { Text, View } from 'react-native';

import MatchIcon from '../../../shared/icons/match.svg';

import { ParticipantCard } from './ParticipantCard';

interface Participant {
  name?: string;
  department: string;
  status?: string;
  isMe?: boolean;
  isReady?: boolean;
  isEmpty?: boolean;
}

interface ParticipantStatusSectionProps {
  participants: Participant[];
  currentCount: number;
  readyCount: number;
  maxCount: number;
}

export function ParticipantStatusSection({
  participants,
  currentCount,
  readyCount,
  maxCount,
}: ParticipantStatusSectionProps) {
  const theme = useTheme();

  return (
    <Container>
      <Header>
        <TitleContainer>
          <MatchIcon
            width={18}
            height={18}
            color={theme.colors.primary.black}
            style={{ marginTop: 2 }}
          />
          <Title>참가자 현황</Title>
        </TitleContainer>
        <Status>
          <StatusHighlight>{currentCount}</StatusHighlight>/{maxCount}명 ·{' '}
          <StatusHighlight>{readyCount}</StatusHighlight>명 준비 완료
        </Status>
      </Header>

      <ParticipantList>
        {participants.map((participant, index) => (
          <ParticipantCard key={index} {...participant} />
        ))}
      </ParticipantList>
    </Container>
  );
}

const Container = styled(View)`
  gap: 12px;
`;

const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 4px;
  gap: 8px;
`;

const TitleContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const Title = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.s};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary.black};
`;

const Status = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.s};
  color: ${({ theme }) => theme.colors.primary.black};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const StatusHighlight = styled(Text)`
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ParticipantList = styled(View)`
  gap: 12px;
`;
