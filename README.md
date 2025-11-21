# Hansei-ro 🚀

React Native + Expo 기반의 모바일 애플리케이션입니다.

## 📋 목차

- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [주요 설정](#주요-설정)
- [개발 컨벤션](#개발-컨벤션)
- [GitHub 템플릿](#github-템플릿)

## 🚀 시작하기

### 필수 요구 사항

- **Node.js**: v18 이상
- **Yarn**: 패키지 매니저
- **Expo Go**: 모바일 테스트를 위한 앱 (iOS/Android)

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn start

# 특정 플랫폼에서 실행
yarn android  # Android
yarn ios      # iOS
yarn web      # Web
```

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### 테스트 및 빌드

#### Expo Go를 이용한 간단한 테스트

**Expo Go**는 UI, 기본 네비게이션, 간단한 API 호출 등을 빠르게 테스트하기에 적합합니다.

```bash
yarn start
# QR 코드를 스캔하여 Expo Go 앱에서 실행
```

#### 네이티브 빌드 (푸시 알림 등)

**푸시 알림, 딥링크, 백그라운드 태스크** 같은 네이티브 기능은 Expo Go에서 제한적이므로, **직접 빌드하여 실제 디바이스에 설치**해야 합니다.

**Android 빌드 (Windows/Mac/Linux 모두 가능):**

```bash
# EAS를 사용한 개발용 빌드
eas build --profile development --platform android
```

**iOS 빌드 (⚠️ macOS 필수):**

```bash
# EAS를 사용한 개발용 빌드
eas build --profile development --platform ios
```

> **참고**: iOS 빌드는 Apple의 정책상 **macOS 환경**에서만 가능합니다. Windows에서는 EAS Build 서비스를 통해 클라우드에서 빌드할 수 있습니다.

**로컬 개발 빌드 (Prebuild):**

```bash
# iOS/Android 네이티브 폴더 생성
npx expo prebuild

# iOS 실행 (macOS만 가능)
yarn ios

# Android 실행
yarn android
```

## 📂 프로젝트 구조

이 프로젝트는 **Feature-based Architecture**를 따릅니다.

```
hansei-ro/
├── app/                          # Expo Router 기반 라우팅
│   ├── (tabs)/                   # 탭 네비게이션
│   ├── _layout.tsx               # 루트 레이아웃
│   └── +not-found.tsx            # 404 페이지
├── src/
│   ├── features/                 # 기능별 모듈
│   │   ├── profile/
│   │   │   ├── screens/          # 화면 컴포넌트
│   │   │   ├── components/       # 재사용 가능한 UI 컴포넌트
│   │   │   └── model/            # 비즈니스 로직 및 상태 관리
│   │   └── ...
│   ├── shared/                   # 공통 유틸리티
│   │   └── lib/
│   │       ├── axios.ts          # API 클라이언트 설정
│   │       └── storage.ts        # 보안 스토리지
│   └── store/                    # 전역 상태 관리 (Zustand)
├── .github/                      # GitHub 템플릿 및 워크플로우
├── babel.config.js               # Babel 설정 (Emotion 포함)
├── eas.json                      # EAS Build 설정
└── tsconfig.json                 # TypeScript 설정
```

### 폴더 구조 규칙

- **`screens/`**: 전체 화면을 담당하는 컴포넌트 (예: `ProfileScreen.tsx`)
- **`components/`**: 재사용 가능한 작은 UI 부품 (예: `Button.tsx`, `Card.tsx`)
- **`model/`**: 비즈니스 로직, API 호출, 상태 관리

## ⚙️ 주요 설정

### 네트워크 (Axios)

- **위치**: `src/shared/lib/axios.ts`
- **기능**:
  - 요청 인터셉터: SecureStore에서 토큰을 자동으로 가져와 `Authorization` 헤더에 추가
  - 응답 인터셉터: 에러 핸들링 (401 등)

### 스타일링 (Emotion)

- **라이브러리**: `@emotion/native`, `@emotion/react`
- **Babel 플러그인**: `@emotion/babel-plugin` (성능 최적화)

### 린트 및 포맷팅

- **ESLint**: Strict 모드, React Native 및 TypeScript 규칙 적용
- **Prettier**: 코드 자동 정렬
- **실행 명령어**:
  ```bash
  yarn lint        # ESLint 검사
  yarn format      # Prettier 포맷팅
  ```

## 📐 개발 컨벤션

### 커밋 메시지

**Conventional Commits** 스타일을 따릅니다:

```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
chore: 설정 변경, 빌드 관련
docs: 문서 수정
```

### 코드 스타일

- **import 순서**: ESLint가 자동으로 정렬합니다 (builtin → external → internal)
- **Inline Styles 금지**: Emotion을 사용하여 스타일을 정의하세요
- **console.log 제거**: 프로덕션 빌드 전에 반드시 제거

## 🗂️ GitHub 템플릿

### Pull Request

- **템플릿**: `.github/PULL_REQUEST_TEMPLATE.md`
- **포함 항목**:
  - 관련 이슈 번호
  - 작업 내용
  - 스크린샷 (UI 작업인 경우)
  - 리뷰어에게 전달 사항
  - 체크리스트

### Issue 템플릿

1. **Bug Report**: `.github/ISSUE_TEMPLATE/bug_report.md`
2. **Feature Request**: `.github/ISSUE_TEMPLATE/feature_request.md`

---

## 📞 문의

팀원이나 PM에게 문의하세요.
