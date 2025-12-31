// React Query: 데이터 조회 (Query)
import { useQuery } from '@tanstack/react-query';

import { getExampleById, getExampleList } from '../api/getExamples';

/**
 * 예제 목록을 가져오는 React Query 훅
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useExampleListQuery();
 *
 * if (isLoading) return <Text>로딩 중...</Text>;
 * if (error) return <Text>에러 발생</Text>;
 *
 * return <ExampleList data={data} />;
 * ```
 */
export function useExampleListQuery() {
  return useQuery({
    queryKey: ['examples'],
    queryFn: getExampleList,
    // 5분 동안 데이터를 신선하게 유지 (재요청 안 함)
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * 특정 ID의 예제를 가져오는 React Query 훅
 *
 * @param id 조회할 예제 ID
 *
 * @example
 * ```tsx
 * const { data: example, isLoading } = useExampleQuery('example-123');
 *
 * if (isLoading) return <Text>로딩 중...</Text>;
 *
 * return <ExampleDetail data={example} />;
 * ```
 */
export function useExampleQuery(id: string) {
  return useQuery({
    queryKey: ['examples', id],
    queryFn: () => getExampleById(id),
    // ID가 없으면 비활성화
    enabled: !!id,
  });
}
