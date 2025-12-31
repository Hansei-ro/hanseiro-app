/**
 * 채팅 메시지 UI 타입
 */
export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  senderName?: string; // Only for 'other'
  isDateSeparator?: boolean; // Special type for date separators
}
