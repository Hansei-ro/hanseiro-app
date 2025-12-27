import { useQuery } from '@tanstack/react-query';

import { adaptApiChatRoomDetailToUI } from '../adapters/messageAdapter';
import { mockFetchChatRoomDetail } from '../api/mockChatRoomMessages';

/**
 * 채팅방 상세 정보 조회 훅
 *
 * @param chatRoomId - 채팅방 ID
 * @returns 채팅방 상세 정보 쿼리 결과
 *
 * @example
 * const { data: roomInfo, isLoading } = useChatRoomDetail('100');
 * // roomInfo: { title: "25.11.24 / 산본역", participantCount: 3, participants: [...] }
 *
 * @features
 * - 채팅방 헤더 표시용 정보 제공 (날짜/장소, 참가자)
 * - API 응답 → UI 타입 자동 변환 (어댑터 사용)
 * - 5분 동안 캐시 유지 (자주 변경되지 않는 정보)
 *
 * @future
 * - 참가자 프로필 이미지 추가
 * - 매칭 상태 정보 추가
 */
export const useChatRoomDetail = (chatRoomId: string) => {
  return useQuery({
    queryKey: ['chatRoomDetail', chatRoomId],
    queryFn: async () => {
      const response = await mockFetchChatRoomDetail(Number(chatRoomId));
      return response;
    },
    select: (response) => {
      // API 응답을 UI 타입으로 변환
      return adaptApiChatRoomDetailToUI(response.data.room);
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지 (자주 변경되지 않음)
    enabled: !!chatRoomId, // chatRoomId가 있을 때만 쿼리 실행
  });
};
