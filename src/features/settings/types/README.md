# 타입 정의

이 폴더에는 TypeScript 타입을 정의합니다.

## 예시

```tsx
// example.ts
export interface Example {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface ExampleCreateRequest {
  title: string;
  description: string;
}

export interface ExampleResponse {
  success: boolean;
  data: Example;
}
```

## 사용 방법

```tsx
import { Example } from '@features/example/types/example';

function ExampleCard({ example }: { example: Example }) {
  return <Text>{example.title}</Text>;
}
```
