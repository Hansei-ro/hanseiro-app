import styled from '@emotion/native';
import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { ChatRoomItem, ChatRoomItemProps } from './ChatRoomItem';

interface ChatRoomListProps {
  rooms: ChatRoomItemProps[];
  onRoomPress: (roomId: string) => void;
  contentContainerStyle?: object;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ChatRoomList({
  rooms,
  onRoomPress,
  contentContainerStyle,
  refreshing = false,
  onRefresh,
}: ChatRoomListProps) {
  return (
    <StyledFlatList
      data={rooms}
      renderItem={({ item }) => <ChatRoomItem {...item} onPress={() => onRoomPress(item.id)} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Separator />}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined
      }
    />
  );
}

const StyledFlatList = styled(FlatList<ChatRoomItemProps>)`
  flex: 1;
`;

const Separator = styled(View)`
  height: 28px;
`;
