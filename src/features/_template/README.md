# Feature 개발 가이드

이 폴더는 새로운 기능을 개발할 때 복사해서 사용하는 템플릿입니다.

## 사용 방법

1. 이 폴더를 복사하여 기능 이름으로 변경합니다.

   ```bash
   # 예시: 버스 기능 개발 시
   cp -r _template bus
   ```

2. 각 폴더의 역할을 이해하고 코드를 작성합니다.

## 폴더 구조

```
_template/
  ├── ui/          # 화면에서 사용할 컴포넌트
  ├── hooks/       # React Query 훅 (서버 데이터)
  ├── store/       # Zustand 스토어 (클라이언트 상태)
  └── types/       # TypeScript 타입 정의
```

## 각 폴더 설명

### `ui/` - UI 컴포넌트

화면에서 사용할 재사용 가능한 컴포넌트를 만듭니다.

**예시:**

```tsx
// ui/BusCard.tsx
import { View, Text } from 'react-native';

interface BusCardProps {
  busNumber: string;
  arrivalTime: string;
}

export function BusCard({ busNumber, arrivalTime }: BusCardProps) {
  return (
    <View>
      <Text>{busNumber}번 버스</Text>
      <Text>{arrivalTime} 도착</Text>
    </View>
  );
}
```

### `hooks/` - React Query 훅

서버 데이터를 가져오는 React Query 훅을 만듭니다.

**예시:**

```tsx
// hooks/useBusListQuery.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useBusListQuery() {
  return useQuery({
    queryKey: ['bus-list'],
    queryFn: async () => {
      const response = await axios.get('/api/bus/list');
      return response.data;
    },
  });
}
```

### `store/` - Zustand 상태 관리

클라이언트 상태를 관리하는 Zustand 스토어를 만듭니다.

**예시:**

```tsx
// store/useBusStore.ts
import { create } from 'zustand';

interface BusState {
  selectedBus: string | null;
  setSelectedBus: (busId: string) => void;
}

export const useBusStore = create<BusState>((set) => ({
  selectedBus: null,
  setSelectedBus: (busId) => set({ selectedBus: busId }),
}));
```

### `types/` - 타입 정의

TypeScript 타입을 정의합니다.

**예시:**

```tsx
// types/bus.ts
export interface Bus {
  id: string;
  number: string;
  arrivalTime: string;
}
```

## 화면에서 사용하기

```tsx
// app/(tabs)/bus.tsx
import { View, FlatList } from 'react-native';
import { BusCard } from '@features/bus/ui/BusCard';
import { useBusListQuery } from '@features/bus/hooks/useBusListQuery';
import { useBusStore } from '@features/bus/store/useBusStore';

export default function BusScreen() {
  const { data: busList } = useBusListQuery();
  const { selectedBus, setSelectedBus } = useBusStore();

  return (
    <View>
      <FlatList
        data={busList}
        renderItem={({ item }) => <BusCard bus={item} onPress={() => setSelectedBus(item.id)} />}
      />
    </View>
  );
}
```

## 주의사항

- **`hooks/`**: 서버 데이터만 (React Query)
- **`store/`**: 클라이언트 상태만 (Zustand)
- **`ui/`**: 재사용 가능한 컴포넌트만
- **`types/`**: 타입 정의만
