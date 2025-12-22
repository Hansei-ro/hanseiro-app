import styled from '@emotion/native';
import { FlatList, View } from 'react-native';

import { ChatMessage, Message } from './ChatMessage';

interface ChatMessageListProps {
  messages: Message[];
  contentContainerStyle?: object;
  inverted?: boolean;
}

// 채팅 메시지 리스트 컴포넌트
export function ChatMessageList({
  messages,
  contentContainerStyle,
  inverted,
}: ChatMessageListProps) {
  return (
    <StyledFlatList
      data={messages}
      renderItem={({ item }) => <ChatMessage message={item as Message} />}
      keyExtractor={(item) => (item as Message).id}
      contentContainerStyle={[{ paddingHorizontal: 16 }, contentContainerStyle]}
      ItemSeparatorComponent={() => <Separator />}
      showsVerticalScrollIndicator={false}
      inverted={inverted}
    />
  );
}

const StyledFlatList = styled(FlatList)`
  flex: 1;
`;

const Separator = styled(View)`
  height: 18px;
`;
