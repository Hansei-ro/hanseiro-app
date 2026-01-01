# Store - Zustand 상태 관리

클라이언트 상태를 관리하는 Zustand 스토어를 작성합니다.

## 예시

```tsx
// useBusStore.ts
import { create } from 'zustand';

interface BusState {
  selectedBusId: string | null;
  searchQuery: string;
  setSelectedBusId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  clearSelection: () => void;
}

export const useBusStore = create<BusState>((set) => ({
  selectedBusId: null,
  searchQuery: '',
  setSelectedBusId: (id) => set({ selectedBusId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearSelection: () => set({ selectedBusId: null }),
}));
```

## 사용 방법

```tsx
import { useBusStore } from '@features/bus/store/useBusStore';

function BusScreen() {
  const { selectedBusId, setSelectedBusId } = useBusStore();

  return <Button onPress={() => setSelectedBusId('bus-123')}>버스 선택</Button>;
}
```

## 주의사항

- **서버 데이터는 `hooks/`에 (React Query 사용)**
- **클라이언트 상태만 `store/`에 (Zustand 사용)**

예:

- ✅ `store/` - 선택된 항목, 검색어, UI 상태
- ❌ `store/` - 서버에서 가져온 버스 목록 (이건 `hooks/`에)
