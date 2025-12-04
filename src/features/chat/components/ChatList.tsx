import styled from '@emotion/native';
import { FlatList } from 'react-native';

import { ChatMessage, Message } from './ChatMessage';

interface ChatListProps {
  messages: Message[];
  contentContainerStyle?: object;
  inverted?: boolean;
}

export function ChatList({ messages, contentContainerStyle, inverted }: ChatListProps) {
  return (
    <StyledFlatList
      data={messages}
      renderItem={({ item }) => <ChatMessage message={item as Message} />}
      keyExtractor={(item) => (item as Message).id}
      contentContainerStyle={[{ paddingVertical: 16 }, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      inverted={inverted}
    />
  );
}

const StyledFlatList = styled(FlatList)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;
