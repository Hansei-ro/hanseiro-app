import styled from '@emotion/native';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatRoomList } from '../components/ChatRoomList';
import { useChatRoomList } from '../hooks/useChatRoomList';

import { ScreenHeader } from '@/shared/ui/ScreenHeader';

export function ChatRoomListScreen() {
  const router = useRouter();
  const { data, isLoading, isError, refetch, isRefetching } = useChatRoomList();
  const rooms = data ?? [];

  const handleEnterChat = (roomId: string) => {
    router.push(`/chat-room?id=${roomId}`);
  };

  // 정상 상태
  return (
    <SafeArea edges={['top']}>
      <Container>
        <ScreenHeader title="채팅" />
        <ScreenHeader title="채팅" />
        <ChatRoomList
          items={rooms}
          onRoomPress={handleEnterChat}
          isPending={isLoading}
          isError={isError}
          onRetry={refetch}
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const Container = styled(View)`
  flex: 1;
  gap: 18px;
`;
