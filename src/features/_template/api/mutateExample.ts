// 예제: 새 항목 생성
import { CreateExampleRequest, Example } from '../types/example';

import axios from '@/shared/lib/axios';

/**
 * 새로운 예제를 생성합니다.
 * @param data 생성할 예제 데이터
 * @returns 생성된 예제 객체
 */
export async function createExample(data: CreateExampleRequest): Promise<Example> {
  const response = await axios.post('/api/examples', data);
  return response.data;
}

/**
 * 예제를 삭제합니다.
 * @param id 삭제할 예제 ID
 */
export async function deleteExample(id: string): Promise<void> {
  await axios.delete(`/api/examples/${id}`);
}
