import { useQuery } from '@tanstack/react-query';

import { adaptApiMessagesToUI } from '../adapters/messageAdapter';
import { mockFetchMessages } from '../api/mockChatRoomMessages';
import { Message } from '../components/ChatMessage';

/**
 * 채팅방 메시지 목록 조회 훅
 *
 * @param chatRoomId - 채팅방 ID
 * @returns 메시지 목록 쿼리 결과 (최신순 정렬)
 *
 * @example
 * const { data: messages, isLoading, error } = useChatRoomMessages('100');
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
  return useQuery({
    queryKey: ['chatRoomMessages', chatRoomId],
    queryFn: async () => {
      const response = await mockFetchMessages(Number(chatRoomId));
      return response;
    },
    select: (response): Message[] => {
      // API 응답을 UI 타입으로 변환
      return adaptApiMessagesToUI(response.data.messages);
    },
    staleTime: 1000 * 30, // 30초 동안 fresh 상태 유지
    refetchInterval: 1000 * 10, // 10초마다 폴링 (실시간 업데이트)
    enabled: !!chatRoomId, // chatRoomId가 있을 때만 쿼리 실행
  });
};
