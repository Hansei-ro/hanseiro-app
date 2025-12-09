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
      renderItem={({ item }) => (
        <ChatListItem
          {...(item as ChatListItemProps)}
          onPress={() => onRoomPress((item as ChatListItemProps).id)}
        />
      )}
      keyExtractor={(item) => (item as ChatListItemProps).id}
      ItemSeparatorComponent={() => <Separator />}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
}

const StyledFlatList = styled(FlatList)`
  flex: 1;
`;

const Separator = styled(View)`
  height: 28px;
`;
