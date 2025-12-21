import styled from '@emotion/native';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatRoomList } from '../components/ChatRoomList';
import { useChatRoomList } from '../hooks/useChatRoomList';

import { getFontFamily } from '@/shared/utils/typography';

export function ChatListScreen() {
  const router = useRouter();
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
            <Title>채팅</Title>
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
            <Title>채팅</Title>
          </Header>
          <CenteredView>
            <ErrorText>채팅방 목록을 불러올 수 없습니다</ErrorText>
            <RetryButton onPress={() => refetch()}>
              <RetryText>다시 시도</RetryText>
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
            <Title>채팅</Title>
          </Header>
          <CenteredView>
            <EmptyText>참여 중인 채팅방이 없습니다</EmptyText>
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
          <Title>채팅</Title>
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

const Title = styled(Text)`
  font-family: ${getFontFamily('bold')};
  font-size: ${({ theme }) => theme.typography.fontSize.titleM};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.black};
`;

const CenteredView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ErrorText = styled(Text)`
  font-family: ${getFontFamily('medium')};
  font-size: ${({ theme }) => theme.typography.fontSize.m};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: 16px;
`;

const RetryButton = styled(Pressable)`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 8px;
`;

const RetryText = styled(Text)`
  font-family: ${getFontFamily('semiBold')};
  font-size: ${({ theme }) => theme.typography.fontSize.m};
  color: ${({ theme }) => theme.colors.text.main};
`;

const EmptyText = styled(Text)`
  font-family: ${getFontFamily('medium')};
  font-size: ${({ theme }) => theme.typography.fontSize.m};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-align: center;
`;
