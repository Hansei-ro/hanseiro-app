# 상태 관리

이 폴더에는 Zustand를 사용한 상태 관리 코드를 작성합니다.

## 예시

```tsx
// useExampleStore.ts
import { create } from 'zustand';

interface ExampleState {
  selectedId: string | null;
  searchQuery: string;
  setSelectedId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  selectedId: null,
  searchQuery: '',
  setSelectedId: (id) => set({ selectedId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
```

## 사용 방법

```tsx
import { useExampleStore } from '@features/example/model/useExampleStore';

function MyComponent() {
  const { selectedId, setSelectedId } = useExampleStore();

  return <Button onPress={() => setSelectedId('123')}>선택하기</Button>;
}
```
