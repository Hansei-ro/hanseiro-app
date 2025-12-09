import styled from '@emotion/native';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatListItemProps } from '../components/ChatListItem';
import { ChatRoomList } from '../components/ChatRoomList';

const MOCK_ROOMS: ChatListItemProps[] = [
  {
    id: '1',
    title: '25.11.24 / 산본역',
    participantCount: 4,
    lastMessage: '안녕하세요',
    imageUrls: ['', '', '', ''],
  },
  {
    id: '2',
    title: '25.11.24 / 금정역',
    participantCount: 3,
    lastMessage: '수고하셨습니다~~',
    imageUrls: ['', '', ''],
  },
  {
    id: '3',
    title: '25.11.25 / 안양역',
    participantCount: 2,
    lastMessage: '2명 레이아웃 테스트',
    imageUrls: ['', ''],
  },
];

export function ChatListScreen() {
  const router = useRouter();

  const handleEnterChat = (roomId: string) => {
    // For now, always go to the same chat-room demo
    router.push('/chat-room');
  };

  return (
    <SafeArea edges={['top']}>
      <Container>
        <Header>
          <Title>채팅</Title>
        </Header>
        <ChatRoomList
          rooms={MOCK_ROOMS}
          onRoomPress={handleEnterChat}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
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
`;

const Header = styled(View)`
  padding: 16px 20px;
  margin-bottom: 18px; /* Gap between header and list */
`;

const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.black};
`;
