import styled from '@emotion/native';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ChatListScreen() {
  const router = useRouter();

  const handleEnterChat = () => {
    router.push('/chat-room');
  };

  return (
    <SafeArea edges={['top']}>
      <Container>
        <Title>채팅 목록</Title>
        <ChatRoomButton onPress={handleEnterChat}>
          <ButtonText>채팅방 입장 (임시)</ButtonText>
        </ChatRoomButton>
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

const Container = styled(View)`
  flex: 1;
  padding: 16px;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.primary.black};
`;

const ChatRoomButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: 16px;
  border-radius: 12px;
  align-items: center;
`;

const ButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.main};
  font-size: 16px;
  font-weight: 600;
`;
