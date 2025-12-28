import { ApiMatchHistoryItem, ApiMatchHistoryResponse } from '../types/matchHistory.api';

const MOCK_DELAY = 500;

const MOCK_HISTORIES: ApiMatchHistoryItem[] = [
  {
    match_id: 1,
    match_date: '2024-12-09',
    match_location: '산본역',
    participant_count: 4,
  },
  {
    match_id: 2,
    match_date: '2024-12-07',
    match_location: '금정역',
    participant_count: 2,
  },
];

/**
 * Mock 매칭 내역 API (MatchHistoryScreen 전용)
 * 실제 API 연동 전까지 사용
 */
export const mockFetchMatchHistory = async (): Promise<ApiMatchHistoryResponse> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  return {
    status: 'success',
    message: '매칭 내역을 조회했습니다',
    data: { histories: MOCK_HISTORIES },
  };
};
