# 📋 Feature 개발 가이드 (초보자용)

> 이 폴더는 새로운 기능을 개발할 때 **참고하는 템플릿**입니다.  
> 복사해서 사용하거나, 구조를 이해하는 데 활용하세요!

---

## 🎯 이 가이드의 목적

1. **일관된 구조 유지**: 모든 팀원이 같은 방식으로 코드를 작성
2. **빠른 온보딩**: 초보자도 쉽게 따라 할 수 있는 단계별 가이드
3. **유지보수 향상**: 나중에 다른 사람이 코드를 쉽게 이해

---

## 🚀 빠른 시작

### Step 1: 폴더 구조 이해하기

```
_template/
  ├── screens/      # 📱 화면 컴포넌트
  ├── components/   # 🎨 UI 컴포넌트
  ├── api/          # 🌐 서버 API 호출 함수
  ├── hooks/        # 🪝 React Query 훅 (서버 데이터 관리)
  ├── store/        # 📦 Zustand 스토어 (클라이언트 상태 관리)
  ├── types/        # 📝 TypeScript 타입 정의
  └── model/        # 🧠 비즈니스 로직 (선택사항)
```

### Step 2: 언제 무엇을 사용하나요?

| 필요한 것               | 사용할 폴더   | 예시                   |
| ----------------------- | ------------- | ---------------------- |
| 백엔드 API 호출         | `api/`        | `getMatchList()`       |
| 서버 데이터 가져오기    | `hooks/`      | `useMatchListQuery()`  |
| UI 상태/선택 항목 저장  | `store/`      | `selectedMatchId`      |
| 이 기능만의 UI 컴포넌트 | `components/` | `MatchCard.tsx`        |
| 타입 정의               | `types/`      | `Match`, `MatchFilter` |
| 복잡한 비즈니스 로직    | `model/`      | 택시 요금 계산 등      |

---

## 📂 각 폴더 상세 가이드

### 1️⃣ `api/` - API 호출 함수

**역할**: 백엔드 서버와 통신하는 함수를 작성합니다.

#### 예시: 매칭 목록 가져오기

```typescript
// api/getMatchList.ts
import axios from '@/shared/lib/axios';
import { Match } from '../types/match';

export async function getMatchList(): Promise<Match[]> {
  const response = await axios.get('/api/matches');
  return response.data;
}
```

#### 예시: 매칭 생성하기

```typescript
// api/createMatch.ts
import axios from '@/shared/lib/axios';
import { CreateMatchRequest, Match } from '../types/match';

export async function createMatch(data: CreateMatchRequest): Promise<Match> {
  const response = await axios.post('/api/matches', data);
  return response.data;
}
```

#### ⚠️ 주의사항

- **파일이 1~2개**: `api.ts` 단일 파일로 시작
- **파일이 3개 이상**: `api/` 폴더를 만들어 분리 (예: `getMatchList.ts`, `createMatch.ts`, `deleteMatch.ts`)

---

### 2️⃣ `hooks/` - React Query 훅

**역할**: 서버 데이터를 가져오고 캐싱하는 React Query 훅을 작성합니다.

#### 예시: 데이터 조회 (Query)

```typescript
// hooks/useMatchListQuery.ts
import { useQuery } from '@tanstack/react-query';
import { getMatchList } from '../api/getMatchList';

export function useMatchListQuery() {
  return useQuery({
    queryKey: ['matches'],
    queryFn: getMatchList,
    // 5분마다 자동 새로고침
    staleTime: 1000 * 60 * 5,
  });
}
```

#### 예시: 데이터 생성/수정 (Mutation)

```typescript
// hooks/useCreateMatchMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMatch } from '../api/createMatch';

export function useCreateMatchMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMatch,
    onSuccess: () => {
      // 성공 시 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
}
```

#### 화면에서 사용하기

```tsx
// app/(tabs)/match.tsx
import { useMatchListQuery } from '@/features/match/hooks/useMatchListQuery';

export default function MatchScreen() {
  const { data, isLoading, error } = useMatchListQuery();

  if (isLoading) return <Text>로딩 중...</Text>;
  if (error) return <Text>에러 발생: {error.message}</Text>;

  return <MatchList data={data} />;
}
```

#### 💡 핵심 규칙

> **서버 데이터는 무조건 React Query를 사용하세요!**  
> Zustand는 클라이언트 상태(UI 상태, 선택 항목)에만 사용합니다.

---

### 3️⃣ `store/` - Zustand 상태 관리

**역할**: 클라이언트 상태(UI 상태, 선택된 항목, 필터 등)를 관리합니다.

#### 예시: 매칭 필터 상태

```typescript
// store/useMatchStore.ts
import { create } from 'zustand';

interface MatchState {
  // 상태 정의
  selectedMatchId: string | null;
  searchQuery: string;
  filterLocation: 'all' | 'kumjeong' | 'dangjeong';

  // 액션 정의
  setSelectedMatchId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterLocation: (location: 'all' | 'kumjeong' | 'dangjeong') => void;
  resetFilters: () => void;
}

export const useMatchStore = create<MatchState>((set) => ({
  selectedMatchId: null,
  searchQuery: '',
  filterLocation: 'all',

  setSelectedMatchId: (id) => set({ selectedMatchId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterLocation: (location) => set({ filterLocation: location }),
  resetFilters: () => set({ searchQuery: '', filterLocation: 'all' }),
}));
```

#### 화면에서 사용하기

```tsx
import { useMatchStore } from '@/features/match/store/useMatchStore';

export default function MatchFilterScreen() {
  const { filterLocation, setFilterLocation } = useMatchStore();

  return (
    <View>
      <Button onPress={() => setFilterLocation('kumjeong')}>금정역</Button>
      <Button onPress={() => setFilterLocation('dangjeong')}>당정역</Button>
    </View>
  );
}
```

#### 💡 핵심 규칙

> **클라이언트 상태만 Zustand에 저장하세요!**  
> 서버에서 가져온 데이터는 React Query로 관리합니다.

**올바른 예시 (✅):**

- 선택된 항목: `selectedMatchId`
- 검색어: `searchQuery`
- 다크모드 여부: `isDarkMode`

**잘못된 예시 (❌):**

- 서버에서 받은 매칭 목록: `matchList` (React Query 사용!)
- 유저 정보: `user` (React Query 사용!)

---

### 4️⃣ `ui/` - UI 컴포넌트

**역할**: 이 기능에서만 사용하는 UI 컴포넌트를 작성합니다.

#### 예시: 매칭 카드 컴포넌트

```tsx
// ui/MatchCard.tsx
import { View, Text, Pressable } from 'react-native';
import styled from '@emotion/native';

interface MatchCardProps {
  title: string;
  location: string;
  participants: number;
  maxParticipants: number;
  onPress: () => void;
}

export function MatchCard({
  title,
  location,
  participants,
  maxParticipants,
  onPress,
}: MatchCardProps) {
  return (
    <Card onPress={onPress}>
      <Title>{title}</Title>
      <Info>
        📍 {location} | 👥 {participants}/{maxParticipants}
      </Info>
    </Card>
  );
}

const Card = styled.Pressable`
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Info = styled.Text`
  font-size: 14px;
  color: #666;
`;
```

#### 💡 언제 `shared/ui/`로 옮기나요?

| 사용 빈도           | 위치                  | 예시                     |
| ------------------- | --------------------- | ------------------------ |
| 1개 기능에서만 사용 | `features/[기능]/ui/` | `MatchCard.tsx`          |
| 2~3곳에서 사용      | 아직 그대로 둠        | 확실해질 때까지 기다림   |
| **3곳 이상 사용**   | `shared/ui/`로 이동   | `Button.tsx`, `Card.tsx` |

---

### 5️⃣ `types/` - TypeScript 타입 정의

**역할**: 이 기능에서 사용하는 타입을 정의합니다.

#### 예시: 매칭 관련 타입

```typescript
// types/match.ts

// 서버에서 받는 데이터 타입
export interface Match {
  id: string;
  title: string;
  location: 'kumjeong' | 'dangjeong';
  departureTime: string;
  participants: number;
  maxParticipants: number;
  createdAt: string;
}

// 매칭 생성 요청 타입
export interface CreateMatchRequest {
  title: string;
  location: 'kumjeong' | 'dangjeong';
  departureTime: string;
  maxParticipants: number;
}

// 매칭 필터 타입
export interface MatchFilter {
  location: 'all' | 'kumjeong' | 'dangjeong';
  departureDate: string | null;
}
```

---

### 6️⃣ `model/` - 비즈니스 로직 (선택사항)

**역할**: 복잡한 계산이나 비즈니스 로직을 분리합니다.

#### 예시: 택시 요금 계산

```typescript
// model/fareCalculator.ts

export function calculateFare(distance: number, participants: number): number {
  const baseFare = 4800;
  const distanceFare = distance * 100;
  const totalFare = baseFare + distanceFare;

  // 인원수로 나누기
  return Math.ceil(totalFare / participants);
}
```

#### 사용 예시

```tsx
import { calculateFare } from '@/features/match/model/fareCalculator';

function MatchDetail() {
  const fare = calculateFare(5, 3); // 5km, 3명
  return <Text>1인당 요금: {fare}원</Text>;
}
```

---

## 🛠️ 실전 예제: "알림" 기능 추가하기

### Step 1: 타입 정의

```typescript
// src/features/notification/types/notification.ts
export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
```

### Step 2: API 함수 작성

```typescript
// src/features/notification/api.ts (파일 1~2개이므로 폴더 대신 파일로 시작)
import axios from '@/shared/lib/axios';
import { Notification } from './types/notification';

export async function getNotifications(): Promise<Notification[]> {
  const response = await axios.get('/api/notifications');
  return response.data;
}

export async function markAsRead(id: string): Promise<void> {
  await axios.patch(`/api/notifications/${id}/read`);
}
```

### Step 3: React Query 훅 작성

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

### Step 4: UI 컴포넌트 작성

```tsx
// src/features/notification/ui/NotificationCard.tsx
import { View, Text } from 'react-native';
import styled from '@emotion/native';

interface NotificationCardProps {
  title: string;
  message: string;
  isRead: boolean;
}

export function NotificationCard({ title, message, isRead }: NotificationCardProps) {
  return (
    <Card isRead={isRead}>
      <Title>{title}</Title>
      <Message>{message}</Message>
    </Card>
  );
}

const Card = styled.View<{ isRead: boolean }>`
  padding: 16px;
  background-color: ${(props) => (props.isRead ? '#f5f5f5' : '#fff')};
  border-radius: 8px;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Message = styled.Text`
  color: #666;
`;
```

### Step 5: 화면에서 사용

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
      renderItem={({ item }) => (
        <NotificationCard title={item.title} message={item.message} isRead={item.isRead} />
      )}
    />
  );
}
```

---

## ✅ 체크리스트

새 기능을 추가할 때 다음 순서를 따라주세요:

1. [ ] `types/` 폴더에 타입 정의
2. [ ] `api/` (또는 `api.ts`)에 서버 통신 함수 작성
3. [ ] `hooks/`에 React Query 훅 작성
4. [ ] `ui/`에 컴포넌트 작성 (필요 시)
5. [ ] `store/`에 클라이언트 상태 작성 (필요 시)
6. [ ] `app/` 폴더의 화면에서 조합하여 사용

---

## 🤔 자주 묻는 질문

### Q1: "API 함수를 언제 폴더로 분리하나요?"

**A**: 파일이 3개 이상이면 폴더로 분리하세요.

```
# 파일 1~2개: 단일 파일
src/features/bus/api.ts

# 파일 3개 이상: 폴더로 분리
src/features/match/api/
  ├── getMatchList.ts
  ├── createMatch.ts
  └── deleteMatch.ts
```

---

### Q2: "컴포넌트를 언제 `shared/ui/`로 옮기나요?"

**A**: **3곳 이상에서 사용할 때** 옮기세요.

- 1개 기능에서만 사용 → `features/[기능]/ui/`에 둠
- 2~3곳에서 사용 → 아직 그대로 둠 (확실해질 때까지)
- **3곳 이상 사용** → `shared/ui/`로 이동

---

### Q3: "Zustand vs React Query 어떻게 구분하나요?"

| 데이터 종류                | 사용할 것   | 예시                      |
| -------------------------- | ----------- | ------------------------- |
| **서버에서 가져온 데이터** | React Query | 매칭 목록, 유저 정보      |
| **클라이언트 상태**        | Zustand     | 선택된 항목, 검색어, 필터 |

---

## 🎯 다음 단계

1. ✅ 이 README를 끝까지 읽기
2. 📖 메인 `README.md` 읽기
3. 🚀 실습: 간단한 기능 하나 만들어보기
4. 💬 막히면 팀원에게 즉시 질문하기!

---

**Happy Coding! 🎉**
