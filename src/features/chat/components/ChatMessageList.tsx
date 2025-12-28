import styled from '@emotion/native';
import { FlatList, StyleProp, View, ViewStyle } from 'react-native';

import { Message } from '../types/message.ui';

import { ChatMessage } from './ChatMessage';

interface ChatMessageListProps {
  messages: Message[];
  contentContainerStyle?: StyleProp<ViewStyle>;
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
      renderItem={({ item }) => <ChatMessage message={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[{ paddingHorizontal: 16 }, contentContainerStyle]}
      ItemSeparatorComponent={() => <Separator />}
      showsVerticalScrollIndicator={false}
      inverted={inverted}
    />
  );
}

const StyledFlatList = styled(FlatList<Message>)`
  flex: 1;
`;

const Separator = styled(View)`
  height: 18px;
`;
