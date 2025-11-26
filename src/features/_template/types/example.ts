// 예제 타입 정의

/**
 * 서버에서 받는 예제 객체 타입
 */
export type Example = {
  id: string;
  title: string;
  description: string;
  location: 'kumjeong' | 'dangjeong' | 'hansei';
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
};

/**
 * 예제 생성 요청 타입
 */
export type CreateExampleRequest = {
  title: string;
  description: string;
  location: 'kumjeong' | 'dangjeong' | 'hansei';
};

/**
 * 예제 수정 요청 타입
 */
export type UpdateExampleRequest = {
  title?: string;
  description?: string;
  status?: 'active' | 'completed' | 'cancelled';
};

/**
 * 예제 필터 타입
 */
export type ExampleFilter = {
  location: 'all' | 'kumjeong' | 'dangjeong' | 'hansei';
  status: 'all' | 'active' | 'completed' | 'cancelled';
  searchQuery: string;
};
