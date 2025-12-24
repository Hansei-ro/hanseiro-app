import {
  ApiChatRoomDetail,
  ApiChatRoomDetailResponse,
  ApiMessage,
  ApiMessagesResponse,
  ApiSendMessageResponse,
} from '../types/message.api';

const MOCK_DELAY = 600;

// 현재 로그인한 사용자 ID (실제로는 인증 시스템에서 가져와야 함)
const CURRENT_USER_ID = 2000;
const CURRENT_USER_NAME = '나';

// 메시지 템플릿
const MESSAGE_TEMPLATES = [
  '안녕하세요',
  '반가워요',
  '오늘 모임 몇 시인가요?',
  '7시로 알고 있어요',
  '네 맞습니다',
  '늦지 않게 갈게요',
  '저도 금방 갑니다',
  '조심히 오세요',
  '이따 봬요!',
  '감사합니다',
  '수고하셨습니다',
  '다음에 또 봐요',
];

/**
 * 채팅방별 메시지 생성
 * chat_room_id를 기준으로 각 채팅방마다 10~15개의 메시지를 생성
 */
const generateMessagesForRoom = (chatRoomId: number, participantCount: number): ApiMessage[] => {
  const messageCount = 10 + (chatRoomId % 6); // 10~15개
  const messages: ApiMessage[] = [];
  const now = Date.now();

  // 참가자 ID 목록 (1000번대 + 현재 사용자)
  const participantIds = Array.from(
    { length: participantCount },
    (_, i) => 1000 + chatRoomId * 10 + i,
  );

  for (let i = 0; i < messageCount; i++) {
    // 메시지 발신자: 70% 확률로 다른 사람, 30% 확률로 나
    const isMyMessage = Math.random() < 0.3;
    const participantId = participantIds[i % participantIds.length] ?? participantIds[0] ?? 1000;
    const senderId = isMyMessage ? CURRENT_USER_ID : participantId;
    const senderName = isMyMessage ? CURRENT_USER_NAME : `참가자${senderId}`;

    // 시간: 과거부터 현재까지 순차적으로 (가장 오래된 메시지가 먼저)
    const sentAt = new Date(now - (messageCount - i) * 60000 * 5).toISOString(); // 5분 간격

    messages.push({
      message_id: chatRoomId * 1000 + i + 1,
      chat_room_id: chatRoomId,
      sender_id: senderId,
      sender_name: senderName,
      message_text: MESSAGE_TEMPLATES[i % MESSAGE_TEMPLATES.length] as string,
      sent_at: sentAt,
      is_my_message: isMyMessage,
    });
  }

  return messages;
};

/**
 * 전체 채팅방의 메시지 생성 (100~124번 채팅방)
 * mockChatRoomList.ts의 MOCK_ROOM_LIST와 동기화
 */
const MOCK_MESSAGES_BY_ROOM: Record<number, ApiMessage[]> = {};

// 25개 채팅방 (100~124)에 대한 메시지 생성
for (let i = 0; i < 25; i++) {
  const chatRoomId = 100 + i;
  const participantCount = (i % 4) + 1; // 1~4명 (mockChatRoomList와 동일)
  MOCK_MESSAGES_BY_ROOM[chatRoomId] = generateMessagesForRoom(chatRoomId, participantCount);
}

/**
 * 채팅방 상세 정보 조회 Mock API
 * mockChatRoomList의 데이터와 일관성 유지
 *
 * @param chatRoomId - 채팅방 ID
 * @returns 채팅방 상세 정보 응답
 */
export const mockFetchChatRoomDetail = async (
  chatRoomId: number,
): Promise<ApiChatRoomDetailResponse> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  // 채팅방 찾기
  const roomIndex = chatRoomId - 100;
  if (roomIndex < 0 || roomIndex >= 25) {
    throw new Error('Chat room not found');
  }

  // mockChatRoomList와 동일한 로직으로 데이터 생성
  const participantCount = (roomIndex % 4) + 1;
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(roomIndex / 3));
  const LOCATIONS = ['산본역', '금정역'];
  const location = LOCATIONS[roomIndex % LOCATIONS.length] as string;

  const generateParticipants = (count: number, baseId: number) => {
    return Array.from({ length: count }, (_, i) => ({
      user_id: baseId + i,
      name: `참가자${baseId + i}`,
    }));
  };

  const room: ApiChatRoomDetail = {
    chat_room_id: chatRoomId,
    match_id: 200 + roomIndex,
    match_location: location,
    match_date: date.toISOString().split('T')[0] as string,
    participants: generateParticipants(participantCount, 1000 + roomIndex * 10),
  };

  return {
    status: 'success',
    message: '채팅방 정보를 조회했습니다',
    data: { room },
  };
};

/**
 * 메시지 목록 조회 Mock API
 *
 * @param chatRoomId - 채팅방 ID
 * @returns 메시지 목록 응답 (최신순 정렬)
 */
export const mockFetchMessages = async (chatRoomId: number): Promise<ApiMessagesResponse> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  const messages = MOCK_MESSAGES_BY_ROOM[chatRoomId];

  if (!messages) {
    throw new Error('Chat room not found');
  }

  // 최신순으로 정렬 (inverted FlatList에서 바로 사용 가능)
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime(),
  );

  return {
    status: 'success',
    message: '메시지 목록을 조회했습니다',
    data: { messages: sortedMessages },
  };
};

/**
 * 메시지 전송 Mock API
 *
 * @param chatRoomId - 채팅방 ID
 * @param messageText - 전송할 메시지 내용
 * @returns 전송된 메시지 정보
 */
export const mockSendMessage = async (
  chatRoomId: number,
  messageText: string,
): Promise<ApiSendMessageResponse> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  const messages = MOCK_MESSAGES_BY_ROOM[chatRoomId];

  if (!messages) {
    throw new Error('Chat room not found');
  }

  if (!messageText.trim()) {
    throw new Error('Message text cannot be empty');
  }

  // 새 메시지 생성
  const newMessage: ApiMessage = {
    message_id: Date.now(), // 실제로는 서버에서 생성
    chat_room_id: chatRoomId,
    sender_id: CURRENT_USER_ID,
    sender_name: CURRENT_USER_NAME,
    message_text: messageText,
    sent_at: new Date().toISOString(),
    is_my_message: true,
  };

  // 메시지 목록에 추가
  messages.push(newMessage);

  return {
    status: 'success',
    message: '메시지를 전송했습니다',
    data: { message: newMessage },
  };
};

/**
 * Mock 데이터 초기화 (테스트용)
 */
export const resetMockMessages = () => {
  Object.keys(MOCK_MESSAGES_BY_ROOM).forEach((key) => {
    const chatRoomId = Number(key);
    const roomIndex = chatRoomId - 100;
    const participantCount = (roomIndex % 4) + 1;
    MOCK_MESSAGES_BY_ROOM[chatRoomId] = generateMessagesForRoom(chatRoomId, participantCount);
  });
};

/**
 * 채팅방의 마지막 메시지 조회 (채팅 목록용)
 * mockChatRoomList와 데이터 일관성 유지
 *
 * @param chatRoomId - 채팅방 ID
 * @returns 마지막 메시지 또는 null
 */
export const getLastMessageForRoom = (chatRoomId: number): ApiMessage | null => {
  const messages = MOCK_MESSAGES_BY_ROOM[chatRoomId];
  if (!messages || messages.length === 0) {
    return null;
  }

  // 가장 최신 메시지 반환 (sent_at 기준 내림차순)
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime(),
  );

  return sortedMessages[0] ?? null;
};
