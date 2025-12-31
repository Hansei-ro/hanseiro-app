import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { ChatRoomListItemUI } from '../types/chatRoom.ui';

import { ChatRoomItem } from './ChatRoomItem';

import { Text } from '@/shared/ui/Text';

interface ChatRoomListProps {
  items: ChatRoomListItemUI[];
  onRoomPress: (roomId: string) => void;
  isPending?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const DEFAULT_CONTENT_CONTAINER_STYLE = {
  paddingHorizontal: 20,
  paddingBottom: 20,
} as const;

export function ChatRoomList({
  items,
  onRoomPress,
  isPending = false,
  isError = false,
  onRetry,
  contentContainerStyle,
  refreshing = false,
  onRefresh,
}: ChatRoomListProps) {
  const theme = useTheme();

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
          채팅방 목록을 불러올 수 없습니다
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
          참여 중인 채팅방이 없습니다
        </Text>
      </CenteredContainer>
    );
  }

  return (
    <StyledFlatList
      data={items}
      renderItem={({ item }) => <ChatRoomItem item={item} onPress={() => onRoomPress(item.id)} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Separator />}
      contentContainerStyle={contentContainerStyle ?? DEFAULT_CONTENT_CONTAINER_STYLE}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined
      }
    />
  );
}

const StyledFlatList = styled(FlatList<ChatRoomListItemUI>)`
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
  height: 28px;
`;
