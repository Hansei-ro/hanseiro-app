import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';

import { MatchHistoryItemUI } from '../types/matchHistory.ui';

import { MatchHistoryListItem } from './MatchHistoryListItem';

import { Text } from '@/shared/ui/Text';

interface MatchHistoryListProps {
  items: MatchHistoryItemUI[];
  isPending?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  contentContainerStyle?: object;
}

const DEFAULT_CONTENT_CONTAINER_STYLE = {
  paddingHorizontal: 20,
  paddingTop: 20,
} as const;

const renderSeparator = () => <Separator />;

export function MatchHistoryList({
  items,
  isPending = false,
  isError = false,
  onRetry,
  contentContainerStyle,
}: MatchHistoryListProps) {
  const theme = useTheme();

  const renderItem = useCallback(
    ({ item }: { item: MatchHistoryItemUI }) => <MatchHistoryListItem item={item} />,
    [],
  );

  if (isPending) {
    return (
      <CenteredContainer>
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
        <Text variant="s" weight="medium" color={theme.colors.text.secondary}>
          로딩 중...
        </Text>
      </CenteredContainer>
    );
  }

  if (isError) {
    return (
      <CenteredContainer>
        <Text variant="m" weight="medium" color={theme.colors.text.secondary} align="center">
          매칭 내역을 불러올 수 없습니다
        </Text>
        {onRetry && (
          <RetryButton onPress={onRetry}>
            <Text variant="s" weight="semiBold" color={theme.colors.primary.white}>
              다시 시도
            </Text>
          </RetryButton>
        )}
      </CenteredContainer>
    );
  }

  if (items.length === 0) {
    return (
      <CenteredContainer>
        <Text variant="m" weight="medium" color={theme.colors.text.tertiary} align="center">
          매칭 내역이 없습니다
        </Text>
      </CenteredContainer>
    );
  }

  return (
    <StyledFlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={renderSeparator}
      contentContainerStyle={contentContainerStyle ?? DEFAULT_CONTENT_CONTAINER_STYLE}
      showsVerticalScrollIndicator={false}
    />
  );
}

const StyledFlatList = styled(FlatList<MatchHistoryItemUI>)`
  flex: 1;
`;

const CenteredContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 12px;
`;

const RetryButton = styled(Pressable)`
  padding: 10px 18px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary.main};
`;

const Separator = styled(View)`
  height: 12px;
`;
