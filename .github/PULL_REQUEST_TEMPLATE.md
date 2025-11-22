## 🔗 관련 이슈

Resolves: #

## 📝 작업 내용

무엇을 했는지 간단히 설명해주세요.

-

## 📷 스크린샷 (UI 작업인 경우)

작업 전과 후를 비교해주세요.

|           Before           |           After            |
| :------------------------: | :------------------------: |
| <img src="" width="300" /> | <img src="" width="300" /> |

## 💬 리뷰어에게

특별히 확인해주셨으면 하는 부분이 있다면 적어주세요.

예: "비밀번호 검증 로직이 맞는지 확인 부탁드립니다."

## ✅ 기본 체크리스트

- [ ] 코드가 정상적으로 실행되나요? (`yarn start` 빌드 에러 없음)
- [ ] 불필요한 `console.log`나 주석을 제거했나요?
- [ ] `yarn format`을 실행하여 코드 스타일을 정렬했나요?
- [ ] `yarn lint`를 실행하여 린트 에러가 없나요?

## 🏗️ 구조 체크리스트

> 💡 아래 항목을 확인하여 프로젝트 구조를 올바르게 유지했는지 점검하세요!

### 파일 배치

- [ ] **1개 기능에서만 사용하는 컴포넌트**를 `shared/ui/`에 두지 않았나요?
  - ✅ 올바름: `src/features/match/ui/MatchCard.tsx`
  - ❌ 잘못됨: `src/shared/ui/MatchCard.tsx` (match에서만 쓰는데 shared에 둠)

- [ ] **여러 기능에서 재사용하는 컴포넌트**는 `shared/ui/`에 있나요?
  - ✅ 올바름: `src/shared/ui/Button.tsx` (여러 곳에서 사용)
  - ❌ 잘못됨: `src/features/match/ui/Button.tsx` (다른 곳에서도 쓰는데 match에만 둠)

### 폴더 vs 파일

- [ ] **파일이 1~2개인데 불필요한 폴더**를 만들지 않았나요?
  - ✅ 올바름: `src/features/bus/api.ts` (파일 1개로 시작)
  - ❌ 잘못됨: `src/features/bus/api/index.ts` (파일 1개인데 폴더 생성)

- [ ] **파일이 3개 이상이면 폴더로 분리**했나요?
  - ✅ 올바름: `src/features/match/api/createMatch.ts`, `joinMatch.ts`, `leaveMatch.ts`
  - ❌ 잘못됨: `src/features/match/api.ts` (3개 이상의 함수가 한 파일에)

### 상태 관리

- [ ] **서버 데이터**는 React Query(`hooks/`)를 사용했나요? (Zustand 사용 금지)
  - ✅ 올바름: `useMatchListQuery()` → React Query
  - ❌ 잘못됨: `useMatchStore()` → Zustand (서버 데이터는 React Query로!)

- [ ] **클라이언트 상태**(UI 상태, 선택 항목 등)는 Zustand(`store/`)를 사용했나요?
  - ✅ 올바름: `selectedMatchId` → Zustand
  - ❌ 잘못됨: `selectedMatchId` → React Query (클라이언트 상태는 Zustand로!)

### 네이밍

- [ ] **파일명이 역할을 명확히 표현**하나요?
  - ✅ 올바름: `useMatchListQuery.ts`, `MatchCard.tsx`
  - ❌ 잘못됨: `utils.ts`, `helpers.ts`, `data.ts`

- [ ] **Boolean 변수에 `is`, `has`, `should` 접두사**를 사용했나요?
  - ✅ 올바름: `isLoading`, `hasPermission`, `shouldShow`
  - ❌ 잘못됨: `loading`, `permission`, `show`

---

> 🚀 **모든 체크리스트를 확인한 후 PR을 생성하세요!**
