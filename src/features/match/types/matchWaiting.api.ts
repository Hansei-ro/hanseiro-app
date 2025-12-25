import { ApiSuccessResponse } from '@/types/api.types';

/**
 * 매칭 대기 관련 백엔드 API 타입
 */

export type ApiMatchWaitingResponse = ApiSuccessResponse<{
  match_id: number;
  route: {
    from: string;
    to: string;
  };
  participants: ApiMatchWaitingParticipant[];
  current_count: number;
  ready_count: number;
  max_count: number;
  remaining_seconds: number;
}>;

export interface ApiMatchWaitingParticipant {
  user_id: number | null;
  name?: string;
  department?: string;
  status?: string;
  is_me?: boolean;
  is_ready?: boolean;
  is_empty?: boolean;
}
