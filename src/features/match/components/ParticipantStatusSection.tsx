import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import React from 'react';
import { View } from 'react-native';

import { ParticipantCard } from './ParticipantCard';

import MatchIcon from '@/shared/icons/match.svg';
import { Text } from '@/shared/ui/Text';

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
          <Text variant="s" weight="medium" color={theme.colors.primary.black}>
            참가자 현황
          </Text>
        </TitleContainer>
        <Text variant="s" weight="medium" color={theme.colors.primary.black}>
          <Text variant="s" weight="bold" color={theme.colors.primary.main}>
            {currentCount}
          </Text>
          /{maxCount}명 ·{' '}
          <Text variant="s" weight="bold" color={theme.colors.primary.main}>
            {readyCount}
          </Text>
          명 준비 완료
        </Text>
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
  padding-left: 4px;
  padding-right: 4px;
  gap: 8px;
`;

const TitleContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const ParticipantList = styled(View)`
  gap: 12px;
`;
