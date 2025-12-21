import { ApiSuccessResponse } from '@/types/api.types';

/**
 * 채팅 관련 백엔드 API 타입
 */

/** 채팅방 목록 API 응답 */
export type ApiChatRoomsResponse = ApiSuccessResponse<{
  rooms: ApiChatRoom[];
}>;

export interface ApiChatRoom {
  chat_room_id: number;
  match_id: number;
  participants: ApiParticipant[];
  last_message: string | null;
  last_message_time: string; // ISO 8601
  unread_count: number;
}

export interface ApiParticipant {
  user_id: number;
  name: string;
}
