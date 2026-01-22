# 새 기능 추가 가이드

> 기능 추가 흐름과 자주 묻는 질문을 정리합니다.

## 🛠️ 새 기능 추가하기

### Step 1: `_template` 폴더 복사

새로운 기능(예: 알림)을 만들 때는 `_template` 폴더를 복사하세요.

```bash
# Windows (PowerShell)
Copy-Item -Recurse src\features\_template src\features\notification

# macOS/Linux
cp -r src/features/_template src/features/notification
```

### Step 2: 폴더 구조 이해하기

복사한 `notification/` 폴더 안을 보면:

```
notification/
  ├── api/        # 서버와 통신 (백엔드 API 호출)
  ├── hooks/      # React Query 훅 (서버 데이터 가져오기)
  ├── store/      # Zustand 스토어 (클라이언트 상태 관리)
  ├── ui/         # 이 기능 전용 컴포넌트
  └── types/      # TypeScript 타입 정의
```

> 💡 **"언제 폴더를 만들고, 언제 파일로 두나요?"**
>
> - **파일이 1~2개**: 폴더 대신 `api.ts` 같은 단일 파일로 시작
> - **파일이 3개 이상**: `api/` 폴더를 만들어 분리
>
> 👉 작게 시작하고, 커지면 확장하세요.

### Step 3: 코드 작성 순서

#### 1️⃣ 타입 정의 (`types/notification.ts`)

```typescript
// src/features/notification/types/notification.ts
export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}
```

#### 2️⃣ API 호출 함수 (`api.ts`)

```typescript
// src/features/notification/api.ts
import axios from '@/shared/lib/axios';
import { Notification } from './types/notification';

export async function getNotifications(): Promise<Notification[]> {
  const response = await axios.get('/api/notifications');
  return response.data;
}
```

#### 3️⃣ React Query 훅 (`hooks/useNotificationsQuery.ts`)

```typescript
// src/features/notification/hooks/useNotificationsQuery.ts
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../api';

export function useNotificationsQuery() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });
}
```

#### 4️⃣ UI 컴포넌트 (`ui/NotificationCard.tsx`)

```tsx
// src/features/notification/ui/NotificationCard.tsx
import { View, Text } from 'react-native';

interface NotificationCardProps {
  title: string;
  message: string;
}

export function NotificationCard({ title, message }: NotificationCardProps) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{message}</Text>
    </View>
  );
}
```

#### 5️⃣ 화면에서 사용 (`app/(tabs)/notifications.tsx`)

```tsx
// app/(tabs)/notifications.tsx
import { FlatList } from 'react-native';
import { useNotificationsQuery } from '@/features/notification/hooks/useNotificationsQuery';
import { NotificationCard } from '@/features/notification/ui/NotificationCard';

export default function NotificationsScreen() {
  const { data, isLoading } = useNotificationsQuery();

  if (isLoading) return <Text>로딩 중...</Text>;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <NotificationCard title={item.title} message={item.message} />}
    />
  );
}
```

---

## 🤔 자주 묻는 질문

### Q1. "API를 어디에 작성하나요?"

**A**: `src/features/[기능명]/api.ts`에 작성하세요.

```typescript
// src/features/match/api.ts
export async function getMatchList() {
  const response = await axios.get('/api/matches');
  return response.data;
}
```

---

### Q2. "서버 데이터는 어떻게 가져오나요?"

**A**: React Query 훅을 사용하세요.

```typescript
// src/features/match/hooks/useMatchListQuery.ts
import { useQuery } from '@tanstack/react-query';
import { getMatchList } from '../api';

export function useMatchListQuery() {
  return useQuery({
    queryKey: ['matches'],
    queryFn: getMatchList,
  });
}
```

**화면에서 사용:**

```tsx
const { data, isLoading } = useMatchListQuery();
```

---

### Q3. "클라이언트 상태(선택한 항목, 검색어 등)는 어떻게 관리하나요?"

**A**: Zustand 스토어를 사용하세요.

```typescript
// src/features/match/store/useMatchStore.ts
import { create } from 'zustand';

interface MatchState {
  selectedMatchId: string | null;
  setSelectedMatchId: (id: string) => void;
}

export const useMatchStore = create<MatchState>((set) => ({
  selectedMatchId: null,
  setSelectedMatchId: (id) => set({ selectedMatchId: id }),
}));
```

---

### Q4. "언제 폴더를 만들고, 언제 파일로 두나요?"

| 파일 개수 | 권장 방법            | 예시                      |
| --------- | -------------------- | ------------------------- |
| 1~2개     | 단일 파일 (`api.ts`) | `src/features/bus/api.ts` |
| 3개 이상  | 폴더로 분리          | `src/features/match/api/` |

---

### Q5. "기존 기능을 수정하고 싶어요!"

1. `src/features/` 폴더에서 해당 기능 찾기 (예: `match/`)
2. 폴더 안에서 수정할 파일 찾기:
   - API 수정 → `api.ts` 또는 `api/`
   - UI 수정 → `ui/` 폴더
   - 상태 관리 수정 → `store/` 폴더

---

### Q6. "에러가 났는데 어디를 봐야 하나요?"

1. **빌드 에러**: 터미널 메시지를 읽고 파일 경로 확인
2. **API 에러**: `src/shared/lib/axios.ts` 인터셉터 로그 확인
3. **린트 에러**: `yarn lint` 실행 후 메시지 확인

---

## 🎯 다음 단계

1. `docs/ARCHITECTURE.md`에서 구조를 먼저 확인
2. `docs/CONVENTIONS.md` 규칙에 맞춰 작업 진행

---

## 📎 참고 문서

- `docs/ARCHITECTURE.md` : 프로젝트 구조/규칙
- `docs/CONVENTIONS.md` : Git/브랜치/커밋/코드 스타일
- `docs/SETUP.md` : 개발 환경 설정
