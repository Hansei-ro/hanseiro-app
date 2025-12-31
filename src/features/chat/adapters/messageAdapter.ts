import { ApiChatRoomDetail, ApiMessage } from '../types/message.api';
import { Message } from '../types/message.ui';

import { formatShortDate } from '@/shared/utils/date';

/**
 * 채팅 메시지 API 응답 ↔ UI 타입 변환 어댑터
 *
 * ⚠️ 백엔드 API 구조 변경 시 이 파일만 수정하면 됩니다
 * UI 컴포넌트와 비즈니스 로직은 영향 받지 않습니다
 */

/**
 * API 메시지를 UI 메시지로 변환
 *
 * @param apiMessage - 백엔드 API 응답의 메시지 객체
 * @returns UI에서 사용하는 Message 타입
 *
 * @example
 * const uiMessage = adaptApiMessageToUI({
 *   message_id: 1,
 *   message_text: "안녕하세요",
 *   sender_id: 1000,
 *   sender_name: "홍길동",
 *   sent_at: "2025-11-24T17:45:00Z",
 *   is_my_message: false
 * });
 * // { id: "1", text: "안녕하세요", sender: "other", ... }
 */
export const adaptApiMessageToUI = (apiMessage: ApiMessage): Message => ({
  id: String(apiMessage.message_id),
  text: apiMessage.message_text,
  sender: apiMessage.is_my_message ? 'me' : 'other',
  timestamp: apiMessage.sent_at,
  senderName: apiMessage.is_my_message ? undefined : apiMessage.sender_name,
});

/**
 * API 채팅방 상세 정보를 UI 형식으로 변환
 *
 * @param apiRoom - 백엔드 API 응답의 채팅방 상세 객체
 * @returns UI에서 사용하는 채팅방 정보
 *
 * @example
 * const roomInfo = adaptApiChatRoomDetailToUI({
 *   chat_room_id: 100,
 *   match_date: "2025-11-24",
 *   match_location: "산본역",
 *   participants: [...]
 * });
 * // { title: "25.11.24 / 산본역", participantCount: 3, ... }
 */
export const adaptApiChatRoomDetailToUI = (apiRoom: ApiChatRoomDetail) => ({
  title: `${formatShortDate(apiRoom.match_date)} / ${apiRoom.match_location}`,
  participantCount: apiRoom.participants.length,
  participants: apiRoom.participants,
});

/**
 * 메시지 배열을 일괄 변환
 *
 * @param apiMessages - 백엔드 API 응답의 메시지 배열
 * @returns UI에서 사용하는 Message 타입 배열
 *
 * @example
 * const uiMessages = adaptApiMessagesToUI(response.data.messages);
 */
export const adaptApiMessagesToUI = (apiMessages: ApiMessage[]): Message[] => {
  return apiMessages.map(adaptApiMessageToUI);
};
