/**
 * 백엔드 API 공통 응답 타입
 * 백엔드 명세 기반으로 작성
 */

/** 성공 응답 */
export interface ApiSuccessResponse<T> {
  status: 'success';
  message: string;
  data: T;
}

/** 에러 응답 */
export interface ApiErrorResponse {
  status: 'error';
  error_code: ApiErrorCode;
  message: string;
  details?: {
    field?: string;
    received?: string;
  };
}

/** 공통 에러 코드 */
export type ApiErrorCode =
  | 'BAD_REQUEST' // 400
  | 'UNAUTHORIZED' // 401
  | 'FORBIDDEN' // 403
  | 'NOT_FOUND' // 404
  | 'CONFLICT' // 409
  | 'RATE_LIMIT' // 429
  | 'INTERNAL_ERROR' // 500
  | 'SERVICE_UNAVAILABLE'; // 503

/** API 응답 유니온 타입 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
