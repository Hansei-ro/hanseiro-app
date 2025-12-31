# API 호출 함수

이 폴더에는 서버와 통신하는 함수를 작성합니다.

## 예시

```tsx
// getExampleList.ts
import axios from 'axios';
import { Example } from '../types/example';

export async function getExampleList(): Promise<Example[]> {
  const response = await axios.get('/api/examples');
  return response.data;
}
```

## React Query와 함께 사용하기

```tsx
// useExampleQuery.ts
import { useQuery } from '@tanstack/react-query';
import { getExampleList } from './getExampleList';

export function useExampleQuery() {
  return useQuery({
    queryKey: ['examples'],
    queryFn: getExampleList,
  });
}
```
