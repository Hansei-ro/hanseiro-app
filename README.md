# 🚖 Hansei-ro (한세로)

> 한세대학교 학생들을 위한 택시 동승 매칭 및 실시간 셔틀버스 정보 플랫폼  
> **"Simple, Secure, Resilient"** - 단순한 구조, 강력한 보안, 견고한 사용자 경험

## 📋 목차

- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [새 기능 추가하기](#-새-기능-추가하기)
- [개발 컨벤션](#-개발-컨벤션)
- [자주 하는 질문](#-자주-하는-질문)

---

## 🚀 시작하기

### 필수 요구 사항

- **Node.js**: v18 이상 ([다운로드](https://nodejs.org/))
- **Yarn**: 패키지 매니저 (`npm install -g yarn`)
- **Expo Go** 앱: 모바일 테스트용 ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### 1단계: 의존성 설치

```bash
# 프로젝트 폴더로 이동
cd hansei-ro

# 필요한 패키지 설치
yarn install
```

### 2단계: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

> 💡 **팁**: 백엔드 서버 주소를 팀원에게 확인하세요!

### 3단계: 개발 서버 실행

```bash
# Expo 개발 서버 실행
yarn start
```

실행하면 터미널에 **QR 코드**가 나타납니다.

**📱 스마트폰으로 테스트하기:**

1. **Android**: Expo Go 앱을 열고 QR 코드 스캔
2. **iOS**: 카메라 앱으로 QR 코드 스캔 → Expo Go에서 열기

---

## 📂 프로젝트 구조

이 프로젝트는 **Feature-Based Architecture** (기능 중심 아키텍처)를 사용합니다.  
"택시 매칭 기능을 수정하고 싶다" → `src/features/match/` 폴더만 보면 됩니다!

```
hansei-ro/
├── app/                     # 📱 화면 라우팅 (Expo Router)
│   ├── (tabs)/              # 하단 탭 네비게이션 (홈, 버스, 매칭, 채팅, 프로필)
│   └── _layout.tsx          # 전역 설정 (Provider 등록)
│
├── src/
│   ├── features/            # 🎯 기능별 폴더 (핵심!)
│   │   ├── _template/       # 📋 새 기능 추가 시 복사할 템플릿
│   │   ├── auth/            # 로그인, 회원가입
│   │   ├── match/           # 택시 매칭
│   │   ├── chat/            # 실시간 채팅
│   │   └── bus/             # 버스 정보
│   │
│   ├── shared/              # 🔧 공통 유틸리티
│   │   ├── ui/              # 재사용 가능한 UI (Button, Card 등)
│   │   └── lib/             # 기능 함수 (axios, storage 등)
│   │
│   └── store/               # 🌍 전역 상태 (테마, 인증)
│
└── assets/                  # 🎨 이미지, 폰트 파일
```

### 폴더 역할 요약

| 폴더              | 설명                                         | 예시                            |
| ----------------- | -------------------------------------------- | ------------------------------- |
| `app/`            | 화면 라우팅 (로직 없음, 렌더링만!)           | `home.tsx`, `match.tsx`         |
| `src/features/`   | 기능별 비즈니스 로직 + UI                    | `match/api.ts`, `MatchCard.tsx` |
| `src/shared/ui/`  | **여러 곳에서** 재사용하는 컴포넌트          | `Button.tsx`, `Skeleton.tsx`    |
| `src/shared/lib/` | 공통 유틸리티 (날짜 포맷, API 클라이언트 등) | `axios.ts`, `formatters.ts`     |

---

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
> 👉 작게 시작하고, 커지면 확장하세요!

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

## 🧩 컴포넌트 배치 규칙

### "어디에 컴포넌트를 만들어야 하나요?"

| 상황                                       | 위치                  | 예시                                   |
| ------------------------------------------ | --------------------- | -------------------------------------- |
| **1개 기능에서만 사용**                    | `features/[기능]/ui/` | `MatchCard.tsx` → `features/match/ui/` |
| **2~3곳에서 사용 (아직 확실하지 않음)**    | 그냥 원래 위치에 둠   | 아직 `features/match/ui/`에 둠         |
| **3곳 이상에서 사용 (확실히 공통화 필요)** | `shared/ui/`          | `Button.tsx` → `shared/ui/`            |

> 💡 **원칙**: "3번째 사용할 때" 공통 폴더로 이동하세요. (너무 이른 추상화 방지)

---

## 📐 개발 컨벤션

### 커밋 메시지 규칙

**Conventional Commits** 스타일을 따릅니다:

```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링 (기능 변경 없음)
chore: 설정 파일 수정, 빌드 관련
docs: 문서 수정
design: UI 디자인 변경
```

**예시:**

```bash
git commit -m "feat: 알림 목록 조회 API 연동"
git commit -m "fix: 매칭 카드 클릭 시 크래시 수정"
git commit -m "refactor: 버스 API 호출 함수 분리"
```

### 코드 스타일

#### ✅ 좋은 예시

```typescript
// 명확한 함수명 (동사 + 명사)
function calculateTotalPrice(items: Item[]): number { ... }

// Boolean 변수에 is/has 접두사
const isValid = true;
const hasPermission = false;

// Early Return (Guard Clause)
function processUser(user: User) {
  if (!user) return;           // 빨리 종료
  if (!user.isActive) return;  // 빨리 종료

  // 핵심 로직은 중첩 없이
  doSomething(user);
}
```

#### ❌ 나쁜 예시

```typescript
// 의미 없는 변수명
const data = fetchUsers(); // 무엇에 대한 data인가?
const temp = 123; // temp는 금지!

// 깊은 중첩
if (isValid) {
  if (hasPermission) {
    if (isActive) {
      doSomething(); // 너무 깊음!
    }
  }
}

// console.log 남기기
console.log('유저 정보:', user); // 프로덕션 전에 삭제 필수!
```

### 린트 및 포맷팅

```bash
# ESLint 검사
yarn lint

# Prettier 코드 정렬
yarn format
```

> 💡 **팁**: 커밋 전에 Husky가 자동으로 검사합니다!

---

## 🗂️ Pull Request 규칙

PR을 올릴 때 다음 체크리스트를 확인하세요:

1. **빌드 에러 없음**: `yarn start`가 정상 실행되나요?
2. **불필요한 코드 제거**: `console.log`, 주석 정리했나요?
3. **폴더 구조 확인**:
   - [ ] 1개 기능에서만 쓰는 컴포넌트를 `shared/`에 두지 않았나요?
   - [ ] 파일이 1~2개인데 불필요한 폴더를 만들지 않았나요?
4. **코드 스타일**: `yarn format` 실행했나요?

---

## 🤔 자주 하는 질문

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

1. **예제 코드 보기**: `src/features/_template/`의 README를 읽어보세요
2. **실습**: 간단한 기능 하나를 만들어보세요 (예: 프로필 화면 수정)
3. **질문하기**: 막히면 팀원에게 즉시 물어보세요!

---

## 📞 문의

문제가 발생하거나 질문이 있으면 팀 채팅방에 언제든지 올려주세요!

**Happy Coding! 🚀**
