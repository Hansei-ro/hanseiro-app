/**
 * ChatRoomListScreen 전용 UI 타입
 */

/** 채팅방 목록 아이템 (UI용) */
export interface ChatRoomListItemUI {
  id: string;
  title: string; // "25.11.24 / 산본역"
  lastMessage: string; // "안녕하세요"
  lastMessageTime: string; // "방금 전", "5분 전"
  participantCount: number; // 4
  hasUnread: boolean; // unreadCount > 0
}
