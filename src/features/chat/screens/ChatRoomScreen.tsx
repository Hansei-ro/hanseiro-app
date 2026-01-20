import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Keyboard, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatInput } from '../components/ChatInput';
import { ChatMessageList } from '../components/ChatMessageList';
import { useChatRoomDetail } from '../hooks/useChatRoomDetail';
import { useChatRoomMessages } from '../hooks/useChatRoomMessages';
import { useSendMessage } from '../hooks/useSendMessage';
import { buildMessagesWithDateSeparators } from '../utils/message';

import { StackHeader } from '@/shared/ui/StackHeader';

// iOS 키보드 높이 계산 시 TabBar 높이를 고려한 오프셋 값
// iOS에서는 TabBar(하단 탭 바)가 키보드 높이에 포함되어 있으므로,
// 실제 콘텐츠 영역 조정 시 이를 차감해야 올바른 레이아웃을 유지할 수 있음
const IOS_KEYBOARD_OFFSET = 35;

export function ChatRoomScreen() {
  const router = useRouter();
  const theme = useTheme();
  // URL 파라미터는 'roomId'로 전달됨 (/chat/100)
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const chatRoomId = roomId || '';

  // 키보드 높이 추적
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // API 훅 사용
  const { data: roomDetail, isLoading: isLoadingRoom } = useChatRoomDetail(chatRoomId);
  const {
    messages = [],
    isLoading: isLoadingMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChatRoomMessages(chatRoomId);
  const sendMessage = useSendMessage(chatRoomId);

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

  const processedMessages = useMemo(() => buildMessagesWithDateSeparators(messages), [messages]);

  const handleSend = (text: string) => {
    sendMessage.mutate(text);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/chat');
    }
  };

  // 로딩 상태 처리
  if (isLoadingRoom || isLoadingMessages) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary.white }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      </SafeAreaView>
    );
  }

  const keyboardPadding =
    Platform.OS === 'ios' ? Math.max(0, keyboardHeight - IOS_KEYBOARD_OFFSET) : keyboardHeight;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary.white }}>
      <StackHeader title={roomDetail?.title || '채팅방'} titleAlign="center" onBack={handleBack} />

      {/* 키보드 높이만큼 paddingBottom 적용 */}
      <View style={{ flex: 1, paddingBottom: keyboardPadding }}>
        <ChatMessageList
          messages={processedMessages}
          inverted
          onLoadMore={fetchNextPage}
          hasMore={hasNextPage}
          isLoadingMore={isFetchingNextPage}
        />
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
