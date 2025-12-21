import { useQuery } from '@tanstack/react-query';

import { mockFetchChatRoomList } from '../api/mockChatRoomList';
import { ChatRoomListItemUI } from '../types/chatList.ui';

import { formatRelativeTime, formatShortDate } from '@/shared/utils/date';

/**
 * 채팅방 목록 조회 React Query 훅 (ChatListScreen 전용)
 *
 * @returns 채팅방 목록 데이터 (UI 형태로 변환됨)
 *
 * @example
 * ```tsx
 * const { data: rooms, isLoading, isError } = useChatRoomList();
 * ```
 */
export const useChatRoomList = () => {
  return useQuery({
    queryKey: ['chatRoomList'],
    queryFn: mockFetchChatRoomList,

    // API 응답 → UI 타입으로 변환 (select 패턴)
    select: (response): ChatRoomListItemUI[] => {
      return response.data.rooms.map((room) => ({
        id: String(room.chat_room_id),
        title: `${formatShortDate(room.match_date)} / ${room.match_location}`, // "24.11.24 / 산본역"
        lastMessage: room.last_message ?? '',
        lastMessageTime: formatRelativeTime(room.last_message_time),
        participantCount: room.participants.length,
        hasUnread: room.unread_count > 0,
      }));
    },

    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
  });
};
