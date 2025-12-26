import { ApiChatRoom, ApiChatRoomsResponse } from '../types/chatRoom.api';

// mockChatRoomMessages의 메시지 데이터를 재사용하여 데이터 일관성 유지
import { getLastMessageForRoom } from './mockChatRoomMessages';

const MOCK_DELAY = 800;

// 대량 Mock 데이터 생성 (25개)
const LOCATIONS = ['산본역', '금정역'];

const generateParticipants = (count: number, baseId: number) => {
  return Array.from({ length: count }, (_, i) => ({
    user_id: baseId + i,
    name: `참가자${baseId + i}`,
  }));
};

const generateRoomList = (): ApiChatRoom[] => {
  return Array.from({ length: 25 }, (_, i) => {
    const chatRoomId = 100 + i;
    const participantCount = (i % 4) + 1; // 1~4명
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(i / 3)); // 날짜 다양화
    const location = LOCATIONS[i % LOCATIONS.length];

    // 실제 메시지 데이터에서 last_message 가져오기
    const lastMessage = getLastMessageForRoom(chatRoomId);

    return {
      chat_room_id: chatRoomId,
      match_id: 200 + i,
      match_location: location as string,
      match_date: date.toISOString().split('T')[0] as string,
      participants: generateParticipants(participantCount, 1000 + i * 10),
      last_message: lastMessage ? lastMessage.message_text : null,
      last_message_time: lastMessage ? lastMessage.sent_at : new Date().toISOString(),
      unread_count: i % 5 === 0 ? 0 : Math.floor(Math.random() * 5) + 1,
    };
  });
};

/**
 * Mock 채팅방 목록 API (ChatRoomListScreen 전용)
 * 실제 API 연동 전까지 사용
 *
 * ⚠️ 중요: 메시지 전송 시 채팅 목록도 자동 갱신됨
 * - useSendMessage 훅이 채팅 목록 쿼리를 invalidate함
 * - 따라서 항상 최신 last_message를 반영
 *
 * @returns 채팅방 목록 응답
 */
export const mockFetchChatRoomList = async (): Promise<ApiChatRoomsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  // 10% 확률로 에러 시뮬레이션 (개발 환경)
  if (process.env.NODE_ENV !== 'production' && Math.random() < 0.1) {
    throw new Error('Mock Network Error');
  }

  // 호출 시마다 최신 메시지 데이터를 기반으로 목록 생성
  const rooms = generateRoomList();

  return {
    status: 'success',
    message: '채팅방 목록을 조회했습니다',
    data: { rooms },
  };
};
