import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatHeader } from '../components/ChatHeader';
import { ChatInput } from '../components/ChatInput';
import { ChatList } from '../components/ChatList';
import { Message } from '../components/ChatMessage';

// iOS 키보드 높이 계산 시 TabBar 높이를 고려한 오프셋 값
// iOS에서는 TabBar(하단 탭 바)가 키보드 높이에 포함되어 있으므로,
// 실제 콘텐츠 영역 조정 시 이를 차감해야 올바른 레이아웃을 유지할 수 있음
const IOS_KEYBOARD_OFFSET = 35;

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    text: '안녕하세요',
    sender: 'other',
    timestamp: '2025-11-24T17:45:00',
    senderName: '홍길동',
  },
  {
    id: '2',
    text: '안녕하세요!',
    sender: 'me',
    timestamp: '2025-11-24T17:46:00',
  },
  {
    id: '3',
    text: '반가워요 다들~',
    sender: 'other',
    timestamp: '2025-11-24T17:47:00',
    senderName: '김철수',
  },
  {
    id: '4',
    text: '오늘 모임 몇 시인가요?',
    sender: 'other',
    timestamp: '2025-11-24T17:48:00',
    senderName: '이영희',
  },
  {
    id: '5',
    text: '7시로 알고 있어요',
    sender: 'me',
    timestamp: '2025-11-24T17:49:00',
  },
  {
    id: '6',
    text: '네 맞습니다 7시 산본역이에요',
    sender: 'other',
    timestamp: '2025-11-24T17:50:00',
    senderName: '홍길동',
  },
  {
    id: '7',
    text: '늦지 않게 갈게요',
    sender: 'other',
    timestamp: '2025-11-24T17:51:00',
    senderName: '김철수',
  },
  {
    id: '8',
    text: '저도 금방 갑니다',
    sender: 'other',
    timestamp: '2025-11-24T17:52:00',
    senderName: '이영희',
  },
  {
    id: '9',
    text: '조심히 오세요',
    sender: 'me',
    timestamp: '2025-11-24T17:53:00',
  },
  {
    id: '10',
    text: '이따 봬요!',
    sender: 'other',
    timestamp: '2025-11-24T17:54:00',
    senderName: '홍길동',
  },
];

export function ChatRoomScreen() {
  const router = useRouter();
  const theme = useTheme();

  // 키보드 높이 추적
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // 최신 메시지가 0번 인덱스에 오도록 정렬 (inverted 리스트용)
  const [messages, setMessages] = useState<Message[]>([...MOCK_MESSAGES].reverse());

  // 키보드 이벤트 리스너
  useEffect(() => {
    // iOS는 keyboardWillShow/Hide, Android는 keyboardDidShow/Hide 사용
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showListener = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hideListener = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const processedMessages = useMemo(() => {
    const result: Message[] = [];
    let lastDate = '';

    // 역순으로 순회하며 날짜 구분선 추가 (inverted 리스트용이므로 역순 처리 주의)
    // messages는 이미 최신순(내림차순)으로 정렬되어 있음
    // 날짜 구분선은 "같은 날짜의 마지막 메시지" (즉, 리스트 상에서는 가장 위쪽, 시간상으로는 가장 빠른) 뒤에 와야 함
    // 하지만 inverted 리스트에서는 "아래쪽"이 최신, "위쪽"이 과거.
    // FlatList inverted는 데이터의 0번이 화면의 바닥(최신)에 위치함.

    // 날짜 구분선 로직은 복잡할 수 있으므로, 일단 단순하게 처리하고 추후 디테일 잡기.
    // 기존 로직: 과거 -> 최신 순회하며 날짜 바뀌면 구분선 추가.
    // inverted 로직: 최신 -> 과거 순회.

    // 편의를 위해 다시 시간순(과거->최신)으로 정렬해서 처리하고, 마지막에 뒤집는 것이 날짜 구분선 로직 유지에 유리함.
    const sortedMessages = [...messages].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );

    sortedMessages.forEach((msg) => {
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

    // 처리가 끝난 후 다시 최신순(역순)으로 뒤집어서 반환
    return result.reverse();
  }, [messages]);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      timestamp: new Date().toISOString(),
    };
    // 최신 메시지를 배열의 앞(0번 인덱스)에 추가
    setMessages((prev) => [newMessage, ...prev]);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/chat');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary.white }}>
      <ChatHeader title="25.11.24 / 산본역" onBackPress={handleBack} />

      {/* 키보드 높이만큼 paddingBottom 적용 */}
      <View
        style={{
          flex: 1,
          paddingBottom:
            Platform.OS === 'ios' ? keyboardHeight - IOS_KEYBOARD_OFFSET : keyboardHeight,
        }}
      >
        <ChatList messages={processedMessages} inverted />
        <InputWrapper>
          <ChatInput onSend={handleSend} />
        </InputWrapper>
      </View>
    </SafeAreaView>
  );
}

const InputWrapper = styled(View)`
  background-color: ${({ theme }) => theme.colors.primary.white};
`;
