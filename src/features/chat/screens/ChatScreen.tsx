import styled from '@emotion/native';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
// import { KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../../../shared/theme';
import { ChatHeader } from '../components/ChatHeader';
import { ChatInput } from '../components/ChatInput';
import { ChatList } from '../components/ChatList';
import { Message } from '../components/ChatMessage';

const MOCK_MESSAGES: Message[] = [
  {
    id: '2',
    text: '안녕하세요',
    sender: 'other',
    timestamp: '2025-11-24T17:45:00',
    senderName: '홍길동',
  },
  {
    id: '3',
    text: '안녕하세요',
    sender: 'me',
    timestamp: '2025-11-24T17:46:00',
  },
  {
    id: '4',
    text: '오늘 날씨가 좋네요',
    sender: 'other',
    timestamp: '2025-11-25T09:00:00',
    senderName: '홍길동',
  },
];

export function ChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

  const processedMessages = useMemo(() => {
    const result: Message[] = [];
    let lastDate = '';

    messages.forEach((msg) => {
      const msgDate = new Date(msg.timestamp).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      if (msgDate !== lastDate) {
        result.push({
          id: `date-${msgDate}`,
          text: msgDate,
          sender: 'other', // Dummy
          timestamp: msg.timestamp,
          isDateSeparator: true,
        });
        lastDate = msgDate;
      }
      result.push(msg);
    });

    return result;
  }, [messages]);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/chat');
    }
  };

  return (
    <Container style={{ paddingTop: insets.top }}>
      <ChatHeader title="25.11.24 / 산본역" onBackPress={handleBack} />
      <View style={{ flex: 1 }}>
        <ChatList messages={processedMessages} />
        {/* <KeyboardStickyView offset={{ closed: 0, opened: 0 }}> */}
        <InputWrapper bottomInset={insets.bottom}>
          <ChatInput onSend={handleSend} />
        </InputWrapper>
        {/* </KeyboardStickyView> */}
      </View>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: ${theme.colors.background.screen};
`;

const InputWrapper = styled(View)<{ bottomInset: number }>`
  background-color: ${theme.colors.background.screen};
  padding-bottom: ${({ bottomInset }) => bottomInset}px;
`;
