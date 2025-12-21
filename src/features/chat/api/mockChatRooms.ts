import { ApiChatRoom, ApiChatRoomsResponse } from '../types/chatList.api';

const MOCK_DELAY = 800;

// 대량 Mock 데이터 생성 (25개)
const LOCATIONS = ['산본역', '금정역'];
const MESSAGES = [
  '안녕하세요',
  '수고하셨습니다~~',
  '감사합니다!',
  '잘 부탁드려요',
  '오늘 몇 시에 만날까요?',
  '저도 도착했어요',
  '조금만 기다려주세요',
  '네 알겠습니다',
  '2명 레이아웃 테스트',
];

const generateParticipants = (count: number, baseId: number) => {
  return Array.from({ length: count }, (_, i) => ({
    user_id: baseId + i,
    name: `참가자${baseId + i}`,
  }));
};

const MOCK_ROOMS: ApiChatRoom[] = Array.from({ length: 25 }, (_, i) => {
  const participantCount = (i % 4) + 1; // 1~4명
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(i / 3)); // 날짜 다양화
  const location = LOCATIONS[i % LOCATIONS.length];

  return {
    chat_room_id: 100 + i,
    match_id: 200 + i,
    match_location: location as string, // 매칭 장소
    match_date: date.toISOString().split('T')[0] as string, // YYYY-MM-DD
    participants: generateParticipants(participantCount, 1000 + i * 10),
    last_message: (i % 7 === 0 ? null : MESSAGES[i % MESSAGES.length]) as string | null,
    last_message_time: new Date(Date.now() - i * 60000 * 5).toISOString(), // 5분씩 차이
    unread_count: i % 5 === 0 ? 0 : Math.floor(Math.random() * 5) + 1,
  };
});

/**
 * Mock 채팅방 목록 API
 * 실제 API 연동 전까지 사용
 *
 * @returns 채팅방 목록 응답
 */
export const mockFetchChatRooms = async (): Promise<ApiChatRoomsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  // 10% 확률로 에러 시뮬레이션 (__DEV__에서만)
  if (__DEV__ && Math.random() < 0.1) {
    throw new Error('Mock Network Error');
  }

  return {
    status: 'success',
    message: '채팅방 목록을 조회했습니다',
    data: { rooms: MOCK_ROOMS },
  };
};
