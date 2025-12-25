import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import React from 'react';
import { View } from 'react-native';

import { MatchHistoryItemUI } from '../types/matchHistory.ui';

import { AvatarGroup } from '@/shared/ui/AvatarGroup';
import { Text } from '@/shared/ui/Text';

interface MatchHistoryListItemProps {
  item: MatchHistoryItemUI;
}

export function MatchHistoryListItem({ item }: MatchHistoryListItemProps) {
  const theme = useTheme();

  return (
    <HistoryItemContainer>
      <InfoContainer>
        <Text variant="xs" color={theme.colors.text.secondary}>
          {item.dateText}
        </Text>
        <Text variant="l" weight="semiBold">
          {item.title}
        </Text>
      </InfoContainer>
      <AvatarContainer>
        <AvatarGroup count={item.participantCount} />
      </AvatarContainer>
    </HistoryItemContainer>
  );
}

const HistoryItemContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 14px;
  padding-horizontal: 18px;
`;

const InfoContainer = styled(View)`
  justify-content: center;
`;

const AvatarContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;
