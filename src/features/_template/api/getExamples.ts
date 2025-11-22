// 예제: 택시 매칭 목록 조회
import { Example } from '../types/example';

import axios from '@/shared/lib/axios';

/**
 * 서버에서 예제 목록을 가져옵니다.
 * @returns 예제 목록 배열
 */
export async function getExampleList(): Promise<Example[]> {
  const response = await axios.get('/api/examples');
  return response.data;
}

/**
 * 특정 ID의 예제를 가져옵니다.
 * @param id 예제 ID
 * @returns 예제 객체
 */
export async function getExampleById(id: string): Promise<Example> {
  const response = await axios.get(`/api/examples/${id}`);
  return response.data;
}
