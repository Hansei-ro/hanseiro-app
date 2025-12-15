import styled from '@emotion/native';
import React from 'react';
import { FlatList, View } from 'react-native';

import { ChatListItem, ChatListItemProps } from './ChatListItem';

interface ChatRoomListProps {
  rooms: ChatListItemProps[];
  onRoomPress: (roomId: string) => void;
  contentContainerStyle?: object;
}

export function ChatRoomList({ rooms, onRoomPress, contentContainerStyle }: ChatRoomListProps) {
  return (
    <StyledFlatList
      data={rooms}
      renderItem={({ item }) => <ChatListItem {...item} onPress={() => onRoomPress(item.id)} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Separator />}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
}

const StyledFlatList = styled(FlatList<ChatListItemProps>)`
  flex: 1;
`;

const Separator = styled(View)`
  height: 28px;
`;
