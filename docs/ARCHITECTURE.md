# 프로젝트 아키텍처

> Hansei-ro의 폴더 구조와 핵심 규칙을 정리합니다.

## 📂 프로젝트 구조

이 프로젝트는 **Feature-Based Architecture** (기능 중심 아키텍처)를 사용합니다.  
"택시 매칭 기능을 수정하고 싶다" → `src/features/match/` 폴더만 보면 됩니다.

```
hansei-ro/
├── app/                     # 📱 화면 라우팅 (Expo Router)
│   ├── (tabs)/              # 하단 탭 네비게이션 (홈, 버스, 매칭, 채팅, 프로필)
│   └── _layout.tsx          # 전역 설정 (Provider 등록)
│
├── src/
│   ├── features/            # 🎯 기능별 폴더 (핵심)
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
| `app/`            | 화면 라우팅 (로직 없음, 렌더링만)            | `home.tsx`, `match.tsx`         |
| `src/features/`   | 기능별 비즈니스 로직 + UI                    | `match/api.ts`, `MatchCard.tsx` |
| `src/shared/ui/`  | **여러 곳에서** 재사용하는 컴포넌트          | `Button.tsx`, `Skeleton.tsx`    |
| `src/shared/lib/` | 공통 유틸리티 (날짜 포맷, API 클라이언트 등) | `axios.ts`, `formatters.ts`     |

---

## 🧩 컴포넌트 배치 규칙

| 상황                                       | 위치                  | 예시                                   |
| ------------------------------------------ | --------------------- | -------------------------------------- |
| **1개 기능에서만 사용**                    | `features/[기능]/ui/` | `MatchCard.tsx` → `features/match/ui/` |
| **2~3곳에서 사용 (아직 확실하지 않음)**    | 원래 위치에 유지      | 아직 `features/match/ui/`에 둠         |
| **3곳 이상에서 사용 (확실히 공통화 필요)** | `shared/ui/`          | `Button.tsx` → `shared/ui/`            |

> 💡 **원칙**: "3번째 사용할 때" 공통 폴더로 이동하세요. (너무 이른 추상화 방지)

> 실제 기능 추가 흐름은 `docs/GUIDE_FEATURE.md`를 참고하세요.

---

## 🔄 Orval - API 코드 자동 생성

> 💡 **Orval이란?** 백엔드 API 명세서(OpenAPI)를 기반으로 TypeScript 타입, API 호출 함수, React Query 훅을 **자동으로 생성**해주는 도구입니다.

### 왜 사용하나요?

| 장점 ✅        | 설명                              |
| -------------- | --------------------------------- |
| 타입 자동 생성 | 타입 수동 작성 불필요             |
| 백엔드 동기화  | API 변경 시 타입 오류로 바로 감지 |
| 생산성 향상    | 반복적인 코드 작성 제거           |

### 사용 방법

```bash
# 백엔드 API 명세서 URL을 orval.config.ts에 설정한 후
yarn api:generate
```

```tsx
// 생성된 훅을 바로 사용
import { useGetMatchList } from '@/api/generated';

const { data, isLoading } = useGetMatchList();
```

> ⚠️ **주의**: `src/api/generated/` 폴더는 **직접 수정 금지!** 코드 생성 시 덮어씌워집니다.

👉 **자세한 사용법**: `src/api/generated/README.md`

---

## 📎 참고 문서

- `docs/GUIDE_FEATURE.md` : 새 기능 추가 가이드
- `docs/CONVENTIONS.md` : 개발 컨벤션
