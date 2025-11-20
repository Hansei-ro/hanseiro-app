# Hooks - React Query

서버에서 데이터를 가져오는 React Query 훅을 작성합니다.

## 예시

```tsx
// useBusListQuery.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Bus } from '../types/bus';

export function useBusListQuery() {
  return useQuery({
    queryKey: ['bus-list'],
    queryFn: async () => {
      const response = await axios.get<Bus[]>('/api/bus/list');
      return response.data;
    },
  });
}
```

## Mutation 예시 (데이터 수정)

```tsx
// useCreateBusMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useCreateBusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBusRequest) => {
      const response = await axios.post('/api/bus', data);
      return response.data;
    },
    onSuccess: () => {
      // 성공 시 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['bus-list'] });
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
