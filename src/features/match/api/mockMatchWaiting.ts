import { ApiMatchWaitingResponse } from '../types/matchWaiting.api';

const MOCK_DELAY = 500;

const MOCK_RESPONSE: ApiMatchWaitingResponse = {
  status: 'success',
  message: '매칭 대기 정보를 조회했습니다',
  data: {
    match_id: 1,
    route: {
      from: '금정',
      to: '한세대',
    },
    participants: [
      {
        user_id: 1,
        name: '나',
        department: '소프트웨어학과',
        status: '대기중',
        is_me: true,
        is_ready: false,
        is_empty: false,
      },
      {
        user_id: 2,
        name: '홍길동',
        department: '컴퓨터공학과',
        status: '준비 완료',
        is_me: false,
        is_ready: true,
        is_empty: false,
      },
      {
        user_id: null,
        name: '',
        department: '',
        status: '',
        is_me: false,
        is_ready: false,
        is_empty: true,
      },
      {
        user_id: null,
        name: '',
        department: '',
        status: '',
        is_me: false,
        is_ready: false,
        is_empty: true,
      },
    ],
    current_count: 2,
    ready_count: 1,
    max_count: 4,
    remaining_seconds: 121,
  },
};

/**
 * Mock 매칭 대기 API (MatchingWaitingScreen 전용)
 * 실제 API 연동 전까지 사용
 */
export const mockFetchMatchWaiting = async (): Promise<ApiMatchWaitingResponse> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  return MOCK_RESPONSE;
};
