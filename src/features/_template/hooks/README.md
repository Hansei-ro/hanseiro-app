# Hooks - React Query

서버에서 데이터를 가져오는 React Query 훅을 작성합니다.

**중요**: API 호출 로직은 `../api` 폴더에 별도로 정의하고, 여기서는 그 함수를 불러와 사용합니다.

## Query 예시 (데이터 조회)

```tsx
// useExampleListQuery.ts
import { useQuery } from '@tanstack/react-query';
import { getExampleList } from '../api/getExamples';

export function useExampleListQuery() {
  return useQuery({
    queryKey: ['example-list'],
    queryFn: getExampleList, // api 폴더의 함수 사용
  });
}
```

```tsx
// useExampleByIdQuery.ts
import { useQuery } from '@tanstack/react-query';
import { getExampleById } from '../api/getExamples';

export function useExampleByIdQuery(id: string) {
  return useQuery({
    queryKey: ['example', id],
    queryFn: () => getExampleById(id), // api 폴더의 함수 사용
  });
}
```

## Mutation 예시 (데이터 생성/수정/삭제)

```tsx
// useCreateExampleMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExample } from '../api/mutateExample';

export function useCreateExampleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExample, // api 폴더의 함수 사용
    onSuccess: () => {
      // 성공 시 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['example-list'] });
    },
  });
}
```

```tsx
// useDeleteExampleMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExample } from '../api/mutateExample';

export function useDeleteExampleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExample, // api 폴더의 함수 사용
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['example-list'] });
    },
  });
}
```

## 사용 방법

```tsx
import { useBusListQuery } from '@features/bus/hooks/useBusListQuery';

function BusScreen() {
  const { data, isLoading, error } = useBusListQuery();

  if (isLoading) return <Text>로딩 중...</Text>;
  if (error) return <Text>에러 발생</Text>;

  return <BusList data={data} />;
}
```
