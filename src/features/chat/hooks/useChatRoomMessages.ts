import { useInfiniteQuery } from '@tanstack/react-query';

import { adaptApiMessagesToUI } from '../adapters/messageAdapter';
import { getChatRoomMessages } from '../api/chatMessages';
import { Message } from '../types/message.ui';

const MESSAGES_PAGE_SIZE = 20;

const dedupeMessages = (messages: Message[]): Message[] => {
  const seenIds = new Set<string>();

  return messages.filter((message) => {
    if (seenIds.has(message.id)) {
      return false;
    }

    seenIds.add(message.id);
    return true;
  });
};

/**
 * 채팅방 메시지 목록 조회 훅
 *
 * @param chatRoomId - 채팅방 ID
 * @returns 메시지 목록 쿼리 결과 (최신순 정렬)
 *
 * @example
 * const { messages, isLoading, error } = useChatRoomMessages('100');
 *
 * @features
 * - 10초마다 자동 폴링으로 실시간 메시지 업데이트
 * - API 응답 → UI 타입 자동 변환 (어댑터 사용)
 * - 30초 동안 데이터 fresh 유지
 *
 * @future
 * - WebSocket 연동 시 폴링 제거 예정
 */
export const useChatRoomMessages = (chatRoomId: string) => {
  const query = useInfiniteQuery({
    queryKey: ['chatRoomMessages', chatRoomId],
    initialPageParam: null as number | null,
    queryFn: ({ pageParam }) => {
      return getChatRoomMessages(Number(chatRoomId), {
        beforeId: pageParam ?? undefined,
        size: MESSAGES_PAGE_SIZE,
      });
    },
    getNextPageParam: (lastPage) => {
      const messages = lastPage.data.messages;

      if (messages.length < MESSAGES_PAGE_SIZE) {
        return undefined;
      }

      const lastMessage = messages[messages.length - 1];
      return lastMessage?.message_id;
    },
    staleTime: 1000 * 30, // 30초 동안 fresh 상태 유지
    refetchInterval: 1000 * 10, // 10초마다 폴링 (실시간 업데이트)
    enabled: !!chatRoomId, // chatRoomId가 있을 때만 쿼리 실행
  });

  const apiMessages = query.data?.pages.flatMap((page) => page.data.messages) ?? [];
  const messages = dedupeMessages(adaptApiMessagesToUI(apiMessages));

  return {
    messages,
    data: query.data,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetching: query.isFetching,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    refetch: query.refetch,
    status: query.status,
  };
};
