import { ApiSuccessResponse } from '@/types/api.types';

/**
 * 매칭 내역 관련 백엔드 API 타입
 */

export type ApiMatchHistoryResponse = ApiSuccessResponse<{
  histories: ApiMatchHistoryItem[];
}>;

export interface ApiMatchHistoryItem {
  match_id: number;
  match_date: string; // "YYYY-MM-DD"
  match_location: string; // "산본역"
  participant_count: number;
}
