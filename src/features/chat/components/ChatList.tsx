import styled from '@emotion/native';
import React from 'react';
import { FlatList } from 'react-native';

import { theme } from '../../../shared/theme';

import { ChatMessage, Message } from './ChatMessage';

interface ChatListProps {
  messages: Message[];
}

export function ChatList({ messages }: ChatListProps) {
  return (
    <StyledFlatList
      data={messages}
      renderItem={({ item }) => <ChatMessage message={item as Message} />}
      keyExtractor={(item) => (item as Message).id}
      contentContainerStyle={{ paddingVertical: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const StyledFlatList = styled(FlatList)`
  flex: 1;
  background-color: ${theme.colors.background.screen};
`;
