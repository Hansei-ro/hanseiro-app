# 🔄 Orval - API 코드 자동 생성 가이드

> 💡 **Orval이란?** 백엔드 API 명세서(OpenAPI)를 기반으로 TypeScript 타입, API 호출 함수, React Query 훅을 **자동으로 생성**해주는 도구입니다.

## ⚠️ 중요 주의사항

**이 폴더(`src/api/generated/`)의 파일들은 절대 직접 수정하지 마세요!**

- `yarn api:generate` 실행 시 모든 파일이 덮어씌워집니다.
- 커스터마이징이 필요하면 래퍼(wrapper) 훅을 만드세요.

---

## 📚 목차

- [왜 Orval을 사용하나요?](#왜-orval을-사용하나요)
- [사용 방법](#사용-방법)
- [생성되는 폴더 구조](#생성되는-폴더-구조)
- [자주 묻는 질문 (FAQ)](#자주-묻는-질문-faq)

---

## 왜 Orval을 사용하나요?

### 기존 방식 (수동)

API 연동 시 **수동으로 많은 코드를 작성**해야 했습니다:

```typescript
// ❌ 기존 방식: 모두 수동 작성 필요

// 1. 타입 정의
interface Match {
  id: string;
  title: string;
  // ... 20개 속성을 직접 타이핑
}

// 2. API 함수 작성
async function getMatchList() {
  const response = await axios.get('/api/matches');
  return response.data;
}

// 3. React Query 훅 작성
function useMatchListQuery() {
  return useQuery({
    queryKey: ['matches'],
    queryFn: getMatchList,
  });
}
```

### Orval 사용 후

명령어 한 번으로 모든 코드가 자동 생성됩니다:

```bash
# ✅ Orval 사용: 한 번에 모든 코드 생성!
yarn api:generate
```

### 장점과 단점

| 장점 ✅                           | 단점 ⚠️                |
| --------------------------------- | ---------------------- |
| 타입 수동 작성 불필요             | 백엔드 API 명세서 필요 |
| 백엔드와 100% 동기화              | 처음 학습 필요         |
| 실수로 인한 버그 감소             | 생성된 코드 수정 불가  |
| API 변경 시 타입 오류로 바로 감지 | -                      |

---

## 사용 방법

### Step 1: 설정 파일 수정

백엔드에서 OpenAPI 명세서 URL을 받으면, `orval.config.ts` 파일에서 URL을 변경합니다:

```typescript
// orval.config.ts (프로젝트 루트에 위치)
input: {
  // 👇 백엔드에서 받은 OpenAPI URL로 변경
  target: 'http://api.example.com/openapi.json',
},
```

### Step 2: 코드 생성

```bash
yarn api:generate
```

### Step 3: 생성된 훅 사용

```tsx
// 자동 생성된 훅을 import
import { useGetMatchList, useCreateMatch } from '@/api/generated';

function MatchListScreen() {
  // 데이터 조회 (GET)
  const { data, isLoading } = useGetMatchList();

  // 데이터 생성 (POST)
  const createMutation = useCreateMatch();

  if (isLoading) return <Text>로딩 중...</Text>;

  return <MatchList data={data} />;
}
```

---

## 생성되는 폴더 구조

```txt
src/api/generated/          ← 🔄 자동 생성 (직접 수정 금지!)
├── model/                  # 타입 정의 (Match, ChatRoom 등)
│   ├── index.ts
│   ├── match.ts            # Match, MatchDto, CreateMatchRequest 등
│   ├── chatRoom.ts         # ChatRoom, ChatMessage 등
│   └── ...
│
├── match/                  # 매칭 관련 API 훅
│   └── match.ts            # useGetMatchList(), useCreateMatch() 등
│
├── chat/                   # 채팅 관련 API 훅
│   └── chat.ts             # useGetChatRoomList(), useSendMessage() 등
│
├── user/                   # 유저 관련 API 훅
│   └── user.ts             # useGetProfile(), useUpdateProfile() 등
│
└── index.ts                # 모든 훅/타입 내보내기
```

---

## 자주 묻는 질문 (FAQ)

### Q1. "백엔드 API가 아직 없는데 어떻게 하나요?"

**A**: 백엔드 API가 준비될 때까지는 기존 방식대로 개발하세요.

- `src/features/[기능]/api/` 폴더에 수동으로 API 함수 작성
- `src/features/[기능]/hooks/` 폴더에 수동으로 React Query 훅 작성

API 명세서가 나오면 `yarn api:generate` 한 번으로 모든 연동 코드가 자동 생성됩니다.

---

### Q2. "React Query 훅을 어디에 작성하나요?"

**A**: Orval 사용 후에는 직접 작성하지 않아도 됩니다!

| 상황              | 훅 위치                                                     |
| ----------------- | ----------------------------------------------------------- |
| **Orval 사용 전** | `src/features/match/hooks/useMatchListQuery.ts` (직접 작성) |
| **Orval 사용 후** | `@/api/generated` (자동 생성, import만 하면 됨)             |

---

### Q3. "데이터 변환이 필요하면요?"

**A**: 생성된 훅의 `select` 옵션을 사용하세요:

```tsx
import { useGetMatchList } from '@/api/generated';

function MatchListScreen() {
  const { data } = useGetMatchList({
    // 서버 응답 데이터를 UI에 맞게 변환
    select: (response) =>
      response.data.map((match) => ({
        ...match,
        formattedDate: formatDate(match.createdAt),
        participantCount: match.participants.length,
      })),
  });

  // data는 이미 변환된 형태
  return <MatchList data={data} />;
}
```

---

### Q4. "생성된 코드에 기능을 추가하고 싶어요"

**A**: `src/api/generated/` 파일을 직접 수정하지 말고, **래퍼(wrapper) 훅**을 만드세요:

```typescript
// src/features/match/hooks/useMatchList.ts
import { useMemo } from 'react';
import { useGetMatchList } from '@/api/generated';

/**
 * 매칭 목록 조회 훅 (정렬 기능 추가)
 */
export function useMatchList() {
  const query = useGetMatchList();

  // 추가 로직: 최신순 정렬
  const sortedData = useMemo(() => {
    if (!query.data) return undefined;
    return [...query.data].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [query.data]);

  return { ...query, data: sortedData };
}
```

**컴포넌트에서 사용:**

```tsx
// 래퍼 훅 사용 (추가 기능 포함)
import { useMatchList } from '@/features/match/hooks/useMatchList';

function MatchListScreen() {
  const { data, isLoading } = useMatchList();
  // data는 이미 정렬된 상태
}
```

---

### Q5. "API 명세가 변경되면 어떻게 하나요?"

**A**: `yarn api:generate`를 다시 실행하면 됩니다.

1. 백엔드 팀에서 API 변경
2. `yarn api:generate` 실행
3. 타입이 변경되면 TypeScript 오류가 발생
4. 오류가 발생한 곳만 수정하면 완료!

> 💡 **이점**: API 변경 시 놓칠 수 있는 부분을 TypeScript가 자동으로 감지해줍니다.

---

### Q6. "생성된 훅의 옵션을 커스터마이징하고 싶어요"

**A**: Orval이 생성한 훅은 React Query의 모든 옵션을 지원합니다:

```tsx
const { data } = useGetMatchList({
  // 캐시 유지 시간
  staleTime: 1000 * 60 * 5, // 5분

  // 자동 refetch 비활성화
  refetchOnWindowFocus: false,

  // 조건부 실행
  enabled: isLoggedIn,

  // 데이터 변환
  select: (data) => data.filter((match) => match.isActive),
});
```

---

## 📞 도움이 필요하면

문제가 발생하거나 질문이 있으면 팀 채팅방에 언제든지 올려주세요!
