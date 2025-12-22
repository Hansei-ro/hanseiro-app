# 개발 컨벤션 가이드

> 💡 **개발 컨벤션이란?** 팀원들이 같은 방식으로 코드를 작성하고 관리하기 위한 규칙입니다. 이 규칙을 따르면 나중에 코드를 찾고 수정하기가 훨씬 쉬워집니다!

---

## 📌 Git 기본 개념

### Git이란?

**Git**은 코드의 변경 이력을 저장하는 도구입니다. 여러 사람이 동시에 작업해도 충돌 없이 협업할 수 있게 도와줍니다.

### GitHub이란?

**GitHub**은 Git으로 관리하는 코드를 온라인에 저장하는 서비스입니다. 팀원들과 코드를 공유하고 함께 작업할 수 있습니다.

### 기본 용어 정리

| 용어                    | 설명                                    | 비유                               |
| ----------------------- | --------------------------------------- | ---------------------------------- |
| **Repository (저장소)** | 프로젝트 코드가 저장되는 공간           | 팀의 공동 작업 폴더                |
| **Branch (브랜치)**     | 독립적으로 작업할 수 있는 작업 공간     | 원본을 복사해서 따로 작업하는 공간 |
| **Commit (커밋)**       | 변경사항을 저장하는 것                  | 작업한 내용을 "저장"하는 것        |
| **Push (푸시)**         | 로컬의 커밋을 GitHub에 올리는 것        | 내 컴퓨터 → 클라우드로 업로드      |
| **Pull (풀)**           | GitHub의 코드를 내 컴퓨터로 가져오는 것 | 클라우드 → 내 컴퓨터로 다운로드    |
| **Merge (머지)**        | 두 브랜치를 합치는 것                   | 두 개의 작업을 하나로 합치기       |

---

## 🌿 브랜치 전략

### 브랜치 구조

```text
main (실제 배포되는 코드 - 직접 수정 금지!)
  └── develop (개발 중인 코드)
       ├── feature/login (새 기능 개발)
       ├── feature/button-design (UI/디자인 작업)
       └── fix/login-error (버그 수정)
```

### 브랜치 종류

| 브랜치       | 역할                                         | 예시              |
| ------------ | -------------------------------------------- | ----------------- |
| **main**     | 실제 서비스 배포 코드 (절대 직접 수정 금지!) | -                 |
| **develop**  | 개발 중인 코드 (모든 작업의 시작점)          | -                 |
| **feature/** | 새로운 기능 개발 (UI/디자인 포함)            | `feature/login`   |
| **fix/**     | 버그 수정                                    | `fix/login-error` |

### 브랜치 이름 규칙

**형식**: `타입/간단한-설명`

✅ **좋은 예시**:

- `feature/user-login`
- `feature/button-design`
- `fix/signup-validation`

❌ **나쁜 예시**:

- `feature/기능1` (한글 사용 금지)
- `fix-bug` (타입 뒤에 `/` 없음)
- `mywork` (어떤 작업인지 알 수 없음)

---

## 💼 브랜치 작업 흐름

### 1️⃣ 새 작업 시작하기

```bash
# 1. develop으로 이동하고 최신 코드 받기
git checkout develop
git pull origin develop

# 2. 새 브랜치 생성
git checkout -b feature/login
```

### 2️⃣ 작업 후 GitHub에 올리기

```bash
# 1. 변경 사항 확인
git status

# 2. 파일 추가
git add .

# 3. 커밋 (아래 커밋 컨벤션 참고)
git commit -m "feat(auth): 로그인 UI 구현"

# 4. GitHub에 올리기
git push origin feature/login
```

### 3️⃣ Pull Request 만들기

1. GitHub 저장소 페이지 이동
2. "Compare & pull request" 버튼 클릭
3. PR 제목과 내용 작성 (아래 PR 컨벤션 참고)
4. 리뷰어 지정
5. "Create pull request" 클릭

### 4️⃣ 다음 작업 시작

```bash
# develop으로 돌아가서 최신 코드 받기
git checkout develop
git pull origin develop

# 새 브랜치 생성
git checkout -b feature/다음기능
```

---

## 💬 커밋 컨벤션

### 기본 형식

```text
<타입>(<범위>): <제목>

<본문> (선택)

<꼬리말> (선택)
```

### 타입 (Type)

| 타입       | 의미                                 | 예시                               |
| ---------- | ------------------------------------ | ---------------------------------- |
| `feat`     | ✨ 새로운 기능 추가 (UI/디자인 포함) | 로그인 기능, 버튼 디자인, 레이아웃 |
| `fix`      | 🐛 버그 수정                         | 로그인 안 되는 문제 해결           |
| `refactor` | ♻️ 코드 개선 (기능 변경 없음)        | 함수 이름 변경, 코드 정리          |
| `docs`     | 📝 문서 수정                         | README 작성, 주석 추가             |
| `chore`    | 🔧 빌드/설정 작업                    | 패키지 설치, Prettier 실행         |

### 범위 (Scope) - 선택사항

어느 부분을 수정했는지 명시합니다.

- `auth` → 인증 관련
- `match` → 매칭 관련
- `chat` → 채팅 관련
- `ui` → UI 관련

### 제목 (Subject) 규칙

1. **50자 이내**로 간결하게
2. **마침표(`.`) 금지**
3. **명령문**으로 작성 ("추가했다" ❌ → "추가" ⭕)

✅ **좋은 예시**:

```text
feat(auth): 로그인 페이지 UI 구현
feat(ui): 로그인 버튼 색상 변경
fix(match): 매칭 시간 계산 오류 수정
chore: Prettier 코드 포맷팅 적용
```

❌ **나쁜 예시**:

```text
로그인 기능 추가했음.  (타입 없음, 마침표 있음)
feat: 기능 추가  (어떤 기능인지 불명확)
asdfasdf  (의미 없는 메시지)
```

### 본문 (Body) - 선택사항

변경 사항이 복잡할 때 자세한 설명을 추가합니다.

```text
feat(auth): JWT 토큰 인증 방식 적용

세션 방식에서 JWT로 변경
이유:
- 서버 메모리 부담 감소
- 모바일 앱 통합 용이
```

### 꼬리말 (Footer) - 선택사항

이슈 번호를 연결할 때 사용합니다.

```text
feat(auth): 로그인 기능 구현

Resolves: #12
```

---

## 🎫 이슈 컨벤션

### 이슈 제목 형식

```text
[타입] 간결하고 명확한 제목
```

### 이슈 타입

| 타입        | 설명                       | 예시                            |
| ----------- | -------------------------- | ------------------------------- |
| `[feature]` | 새로운 기능 개발 (UI 포함) | `[feature] 로그인 기능 구현`    |
| `[feature]` | UI/디자인 작업             | `[feature] 메인 화면 UI 디자인` |
| `[bug]`     | 버그 수정                  | `[bug] 로그인 시 에러 발생`     |
| `[docs]`    | 문서 작업                  | `[docs] API 명세서 작성`        |

### 기능 개발 이슈 템플릿

```markdown
## 📝 개요

간단한 설명

## ✅ 할 일 목록

- [ ] 작업 1
- [ ] 작업 2

## 🎯 완료 조건

- 조건 1
- 조건 2
```

---

## 🔀 Pull Request (PR) 컨벤션

### PR 제목 형식

커밋 메시지와 동일한 형식 사용:

```text
<타입>(<범위>): <제목>
```

**예시**:

```text
feat(auth): 로그인 기능 구현
fix(match): 매칭 알고리즘 오류 수정
```

### PR 본문 템플릿

```markdown
## 🔗 관련 이슈

Resolves: #12

## 📝 작업 내용

무엇을 했는지 간단히 설명

- 변경 사항 1
- 변경 사항 2

## 📷 스크린샷 (UI 작업인 경우)

**Before:**
[이미지]

**After:**
[이미지]

## ✅ 체크리스트

- [ ] 코드가 정상 실행되나요?
- [ ] `console.log` 제거했나요?
- [ ] `yarn format` 실행했나요?
```

### PR 리뷰 코멘트 예시

✅ **좋은 코멘트**:

```text
"이 부분은 `switch`문 사용하면 더 읽기 쉬울 것 같아요!"
"비밀번호 검증 잘 구현되었네요. 특수문자 검사도 추가하면 좋을 것 같습니다."
```

❌ **나쁜 코멘트**:

```text
"이상해요."
"왜 이렇게 했어요?"
```

---

## 💻 TypeScript 타입 작성 규칙

### ✅ 타입 명시가 필요한 경우

```typescript
// 1. 빈 배열
const users: User[] = [];

// 2. null/undefined 초기값
const [user, setUser] = useState<User | null>(null);

// 3. 함수 반환 타입 (ESLint가 자동 경고)
export function getUser(): User {
  return { name: 'Alice', age: 30 };
}

// 4. 복잡한 객체 타입
type FormData = { name: string; email: string };
const [form, setForm] = useState<FormData>({ name: '', email: '' });
```

### ✅ 타입 생략 가능한 경우

```typescript
// 리터럴 값 - 타입이 명확함
const name = 'Alice'; // string 자동 추론
const count = 0; // number 자동 추론

// useState 초기값이 명확함
const [text, setText] = useState(''); // string 추론
```

### 🎯 type vs interface 선택 가이드

**기본 원칙: `type` 우선 사용 권장**

```typescript
// ✅ 권장: type 사용 (의도치 않은 병합 방지, 더 강력한 표현력)
type User = { name: string; age: number };
type Status = 'active' | 'inactive' | 'pending';
type Coords = [number, number];

// ⚠️ interface는 특수한 경우만 사용
// - 외부 라이브러리 확장 (Window, Document 등)
// - 선언 병합이 명시적으로 필요한 경우
```

**왜 type을 권장하는가?**

- 의도치 않은 선언 병합 방지 (안전성)
- 유니온, 튜플 등 다양한 타입 표현 가능 (유연성)
- 일관된 코드베이스 유지 (가독성)

> 💡 **참고**: ESLint는 강제하지 않지만, 프로젝트 컨벤션으로 `type` 우선 사용을 권장합니다.

### ⚠️ 강제 규칙 (ESLint 자동 검사)

```typescript
// ❌ any 타입 사용 금지
const data: any = {}; // ESLint 에러

// ✅ 구체적인 타입 사용
const data: Record<string, unknown> = {};
```

### 💡 판단 기준

> **"코드만 봐도 어떤 값이 들어가는지 명확하면 타입 생략 가능, 불명확하면 타입 명시 필수"**

---

## 📐 코드 스타일 규칙

### Import 정렬

import 문은 자동으로 정렬됩니다 (ESLint):

```typescript
// 1. React/React Native
import { useState } from 'react';
import { View } from 'react-native';

// 2. 외부 라이브러리
import { useQuery } from '@tanstack/react-query';

// 3. 내부 절대 경로
import { Button } from '@/shared/ui/Button';

// 4. 상대 경로
import { getUser } from '../api';
```

### 사용하지 않는 변수

```typescript
// ✅ 사용하지 않는 파라미터는 _ 로 시작
function handleClick(_event: Event, userId: string) {
  console.log(userId);
}

// ❌ 사용하지 않는 변수 그냥 두기
function processData(data: Data, unused: string) {
  // ESLint 경고
  return data;
}
```

### 좋은 코드 vs 나쁜 코드

✅ **좋은 예시**:

```typescript
// 명확한 함수명
function calculateTotalPrice(items: Item[]): number { ... }

// Boolean 변수에 is/has 접두사
const isValid = true;
const hasPermission = false;

// Early Return (Guard Clause)
function processUser(user: User) {
  if (!user) return;
  if (!user.isActive) return;

  doSomething(user);  // 중첩 없이 깔끔
}
```

❌ **나쁜 예시**:

```typescript
// 의미 없는 변수명
const data = fetchUsers(); // 무엇에 대한 data?
const temp = 123; // temp 금지!

// 깊은 중첩
if (isValid) {
  if (hasPermission) {
    if (isActive) {
      doSomething(); // 너무 깊음!
    }
  }
}
```

---

## 🔧 개발 명령어

```bash
# ESLint 검사
yarn lint

# ESLint 자동 수정
yarn lint --fix

# Prettier 코드 정렬
yarn format

# TypeScript 타입 체크
yarn type-check
```

---

## 🤖 자동 검증 (Husky Hooks)

### 커밋 시 (pre-commit)

- **자동 실행**: ESLint + Prettier 자동 수정
- **대상**: 변경된 파일만

### 푸시 시 (pre-push)

1. TypeScript 타입 체크
2. ESLint 검사
3. 빌드 가능성 체크

> 💡 **팁**: 푸시 전에 자동으로 모든 검증 실행 (약 30초~1분 소요)

---

## ❓ 자주 묻는 질문

### Q1. develop과 main의 차이가 뭔가요?

**A**:

- `develop`: 개발 중인 코드 (아직 테스트 중)
- `main`: 실제 서비스에 배포된 코드 (안정적)

개발은 항상 `develop`에서 하고, 테스트 완료 후 `main`에 배포합니다.

### Q2. 커밋을 여러 개 해야 하나요?

**A**: 의미 있는 단위로 자주 커밋하세요!

⭕ 좋은 예:

```text
feat(auth): 로그인 UI 추가
feat(auth): 로그인 API 연동
feat(auth): 에러 처리 추가
```

❌ 나쁜 예:

```text
feat(auth): 로그인 관련 모든 작업 완료 (100개 파일 수정)
```

### Q3. 실수로 잘못된 브랜치에서 작업했어요

**A**: 아직 커밋하지 않았다면:

```bash
git stash  # 변경사항 임시 저장
git checkout -b feature/올바른브랜치
git stash pop  # 저장한 변경사항 복구
```

### Q4. Merge 충돌이 발생했어요

**A**: 다른 사람과 같은 파일을 수정했을 때 발생합니다.

```bash
git pull origin develop  # 최신 코드 받기

# VS Code에서 충돌 난 파일 열기
# "Accept Current Change" 또는 "Accept Incoming Change" 선택

git add .
git commit -m "chore: merge 충돌 해결"
git push origin feature/login
```

---

## 📚 빠른 참고 (명령어 모음)

### 새 작업 시작

```bash
git checkout develop
git pull origin develop
git checkout -b feature/새기능
```

### 작업 후 저장

```bash
git add .
git commit -m "feat: 작업 내용"
git push origin feature/새기능
```

### 다음 작업 준비

```bash
git checkout develop
git pull origin develop
```

---

## 🆘 도움이 필요할 때

- **Git 사용법**: 팀원에게 물어보기, 팀 채팅방에 질문
- **충돌 해결**: 먼저 시도해보고 안 되면 팀원에게 도움 요청
- **컨벤션 관련**: 이 문서를 참고하거나 팀 채팅방에 질문

**💡 기억하세요**: 처음에는 누구나 어렵습니다. 실수해도 괜찮아요! 중요한 건 계속 시도하고 배우는 것입니다. 💪
