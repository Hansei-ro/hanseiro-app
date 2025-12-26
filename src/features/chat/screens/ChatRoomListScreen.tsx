import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatRoomList } from '../components/ChatRoomList';
import { useChatRoomList } from '../hooks/useChatRoomList';

import { Text } from '@/shared/ui/Text';

export function ChatRoomListScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { data: rooms, isLoading, isError, refetch, isRefetching } = useChatRoomList();

  const handleEnterChat = (roomId: string) => {
    router.push(`/chat-room?id=${roomId}`);
  };

  // Loading 상태
  if (isLoading) {
    return (
      <SafeArea edges={['top']}>
        <Container>
          <Header>
            <Text variant="titleM" weight="bold" color={theme.colors.primary.black}>
              채팅
            </Text>
          </Header>
          <CenteredView>
            <ActivityIndicator size="large" />
          </CenteredView>
        </Container>
      </SafeArea>
    );
  }

  // Error 상태
  if (isError) {
    return (
      <SafeArea edges={['top']}>
        <Container>
          <Header>
            <Text variant="titleM" weight="bold" color={theme.colors.primary.black}>
              채팅
            </Text>
          </Header>
          <CenteredView>
            <Text
              variant="m"
              weight="medium"
              color={theme.colors.text.secondary}
              align="center"
              style={{ marginBottom: 16 }}
            >
              채팅방 목록을 불러올 수 없습니다
            </Text>
            <RetryButton onPress={() => refetch()}>
              <Text variant="m" weight="semiBold" color={theme.colors.text.main}>
                다시 시도
              </Text>
            </RetryButton>
          </CenteredView>
        </Container>
      </SafeArea>
    );
  }

  // Empty 상태
  if (!rooms || rooms.length === 0) {
    return (
      <SafeArea edges={['top']}>
        <Container>
          <Header>
            <Text variant="titleM" weight="bold" color={theme.colors.primary.black}>
              채팅
            </Text>
          </Header>
          <CenteredView>
            <Text variant="m" weight="medium" color={theme.colors.text.tertiary} align="center">
              참여 중인 채팅방이 없습니다
            </Text>
          </CenteredView>
        </Container>
      </SafeArea>
    );
  }

  // 정상 상태
  return (
    <SafeArea edges={['top']}>
      <Container>
        <Header>
          <Text variant="titleM" weight="bold" color={theme.colors.primary.black}>
            채팅
          </Text>
        </Header>
        <ChatRoomList
          rooms={rooms}
          onRoomPress={handleEnterChat}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          refreshing={isRefetching}
          onRefresh={() => refetch()}
        />
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary.white};
  /* Changed background to white to match design (usually list backgrounds are white or light gray) */
`;

const Container = styled(View)`
  flex: 1;
  gap: 18px;
`;

const Header = styled(View)`
  padding: 16px 20px;
`;

const CenteredView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const RetryButton = styled(Pressable)`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 8px;
`;
