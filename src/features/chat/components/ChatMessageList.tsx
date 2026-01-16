import styled from '@emotion/native';
import React, { useCallback, useMemo, useRef } from 'react';
import { FlatList, StyleProp, View, ViewStyle } from 'react-native';

import { Message } from '../types/message.ui';

import { ChatMessage } from './ChatMessage';

interface ChatMessageListProps {
  messages: Message[];
  contentContainerStyle?: StyleProp<ViewStyle>;
  inverted?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

const DEFAULT_CONTENT_CONTAINER_STYLE = {
  paddingHorizontal: 16,
} as const;

const LOAD_MORE_DEBOUNCE_MS = 500;

const renderSeparator = () => <Separator />;

// 채팅 메시지 리스트 컴포넌트
export function ChatMessageList({
  messages,
  contentContainerStyle,
  inverted,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
}: ChatMessageListProps) {
  const lastEndReachedAt = useRef(0);

  const handleEndReached = useCallback(() => {
    if (!onLoadMore || !hasMore || isLoadingMore) {
      return;
    }

    const now = Date.now();
    if (now - lastEndReachedAt.current < LOAD_MORE_DEBOUNCE_MS) {
      return;
    }

    lastEndReachedAt.current = now;
    onLoadMore();
  }, [hasMore, isLoadingMore, onLoadMore]);

  const renderItem = useCallback(({ item }: { item: Message }) => {
    return <ChatMessage message={item} />;
  }, []);

  const containerStyle = useMemo(() => {
    return contentContainerStyle
      ? [DEFAULT_CONTENT_CONTAINER_STYLE, contentContainerStyle]
      : DEFAULT_CONTENT_CONTAINER_STYLE;
  }, [contentContainerStyle]);

  return (
    <StyledFlatList
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={containerStyle}
      ItemSeparatorComponent={renderSeparator}
      showsVerticalScrollIndicator={false}
      inverted={inverted}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.3}
    />
  );
}

const StyledFlatList = styled(FlatList<Message>)`
  flex: 1;
`;

const Separator = styled(View)`
  height: 18px;
`;
