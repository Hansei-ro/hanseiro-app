import { ApiParticipant } from './chatRoom.api';

import { ApiSuccessResponse } from '@/types/api.types';

/**
 * 채팅방 메시지 관련 백엔드 API 타입
 */

/** 개별 메시지 구조 */
export interface ApiMessage {
  message_id: number;
  chat_room_id: number;
  sender_id: number;
  sender_name: string;
  message_text: string;
  sent_at: string; // ISO 8601 형식
  is_my_message: boolean;
}

/** 채팅방 상세 정보 */
export interface ApiChatRoomDetail {
  chat_room_id: number;
  match_id: number;
  match_location: string; // "산본역"
  match_date: string; // "YYYY-MM-DD"
  participants: ApiParticipant[];
}

/** 메시지 목록 조회 API 응답 */
export type ApiMessagesResponse = ApiSuccessResponse<{
  messages: ApiMessage[];
}>;

/** 메시지 전송 API 응답 */
export type ApiSendMessageResponse = ApiSuccessResponse<{
  message: ApiMessage;
}>;

/** 채팅방 상세 조회 API 응답 */
export type ApiChatRoomDetailResponse = ApiSuccessResponse<{
  room: ApiChatRoomDetail;
}>;
