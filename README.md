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

> ⚠️ **네이티브 빌드 필수 요구 사항** (Android/iOS 실제 기기 또는 에뮬레이터 테스트 시)
>
> 이 프로젝트는 네이티브 모듈을 사용하므로 **Expo Go와 호환되지 않습니다**.
> 실제 디바이스나 에뮬레이터에서 테스트하려면 아래 환경 설정이 필요합니다:
>
> - **Java Development Kit (JDK)**: **17 버전 (권장)** 또는 11 버전
> - **Android Studio**: Android 빌드용 (macOS/Windows)
> - **Xcode**: iOS 빌드용 (macOS만 가능)

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

### 4단계: 실제 기기 또는 에뮬레이터에서 테스트

> ⚠️ **중요**: 이 프로젝트는 네이티브 모듈을 사용하므로 Expo Go와 호환되지 않습니다.
> 아래 환경 설정을 완료한 후 `npx expo run:android` 또는 `npx expo run:ios` 명령어를 사용해야 합니다.

---

## ☕ Java 버전 안내

> **중요**: React Native는 JDK 17 버전을 권장합니다.

### 지원하는 Java 버전

- ✅ **JDK 17** (권장) - 안정적이고 최신 기능 지원
- ✅ **JDK 11** (지원) - 작동하지만 17 권장
- ❌ **JDK 8** - 너무 오래되어 호환성 문제 발생 가능
- ⚠️ **JDK 21+** - 일부 Gradle 플러그인과 호환성 문제 가능

### Java 버전 확인

```bash
# macOS/Linux/Windows 공통
java -version
```

출력 예시:

```
openjdk version "17.0.9" 2023-10-17 LTS
OpenJDK Runtime Environment Zulu17.46+19-CA (build 17.0.9+8-LTS)
```

> 💡 **Zulu JDK 17을 권장하는 이유**:
>
> - 무료 오픈소스 (상업적 사용 가능)
> - 장기 지원(LTS) 버전
> - React Native 공식 문서 권장
> - macOS/Windows 모두 지원

---

## 🍎 macOS 환경 설정

### iOS 빌드 환경 (macOS만 가능)

> 💡 **권장**: 개발 단계에서는 **iOS 시뮬레이터** 사용을 권장합니다.  
> 실제 iPhone은 개발자 계정 등록, 인증서 설정 등 추가 작업이 필요하므로,  
> 최종 테스트 단계에서만 사용하는 것이 효율적입니다.

#### 1. Xcode 설치

- App Store에서 Xcode 다운로드 및 설치
- 터미널에서 Command Line Tools 설정:
  ```bash
  sudo xcode-select --install
  ```

#### 2. CocoaPods 설치

```bash
sudo gem install cocoapods
```

#### 3. iOS 시뮬레이터에서 실행 (권장)

```bash
npx expo run:ios
```

- 자동으로 iOS 시뮬레이터가 실행됩니다
- 별도의 개발자 계정이나 인증서 설정 없이 바로 테스트 가능합니다
- 특정 디바이스 선택: `npx expo run:ios --simulator="iPhone 15 Pro"`

#### 4. 실제 iPhone에서 실행

- iPhone을 USB로 연결
- Xcode에서 개발자 계정 등록 필요

```bash
npx expo run:ios --device
```

### Android 빌드 환경 (macOS)

#### 1. Android Studio 설치

- [Android Studio](https://developer.android.com/studio) 다운로드 및 설치

#### 2. Android SDK 설정

- Android Studio 실행 → More Actions → SDK Manager
- **SDK Platforms**: Android 13.0 (API 33) 이상 설치
- **SDK Tools**: Android SDK Build-Tools, Android Emulator 설치

#### 3. 환경 변수 설정

`~/.zshrc` 또는 `~/.bash_profile`에 추가:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

저장 후 터미널 재실행 또는:

```bash
source ~/.zshrc
```

#### 4. Java Development Kit (JDK) 17 설치

**방법 1: Homebrew 사용 (권장)**

```bash
# Zulu JDK 17 설치
brew install --cask zulu@17
```

**방법 2: 직접 다운로드**

- [Zulu JDK 17 다운로드](https://www.azul.com/downloads/?version=java-17-lts&os=macos&package=jdk#zulu)
- `.dmg` 파일 다운로드 후 설치

**설치 확인**

```bash
java -version
# "openjdk version 17.x.x"가 출력되어야 함
```

**여러 Java 버전이 설치된 경우**

```bash
# Java 17로 기본 버전 설정
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# ~/.zshrc에 추가하면 영구 적용
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
source ~/.zshrc
```

#### 5. Android 에뮬레이터에서 실행

- Android Studio에서 AVD(가상 디바이스) 생성
- 터미널에서 실행:

```bash
npx expo run:android
```

#### 6. 실제 Android 기기에서 실행

- 개발자 옵션 활성화 (설정 → 휴대전화 정보 → 빌드 번호 7회 탭)
- USB 디버깅 활성화
- USB로 연결 후:

```bash
npx expo run:android --device
```

---

## 🪟 Windows 환경 설정

> ⚠️ **iOS 빌드는 Windows에서 불가능합니다**. macOS 또는 Expo EAS Build 서비스를 사용하세요.

### Android 빌드 환경 (Windows)

#### 1. Android Studio 설치

- [Android Studio](https://developer.android.com/studio) 다운로드 및 설치

#### 2. Android SDK 설정

- Android Studio 실행 → More Actions → SDK Manager
- **SDK Platforms**: Android 13.0 (API 33) 이상 설치
- **SDK Tools**: Android SDK Build-Tools, Android Emulator 설치

#### 3. 환경 변수 설정 (시스템 환경 변수)

- 제어판 → 시스템 → 고급 시스템 설정 → 환경 변수
- **시스템 변수에 새로 만들기**:
  ```
  변수 이름: ANDROID_HOME
  변수 값: C:\Users\[사용자명]\AppData\Local\Android\Sdk
  ```
- **Path 변수에 추가**:
  ```
  %ANDROID_HOME%\platform-tools
  %ANDROID_HOME%\emulator
  ```

#### 4. Java Development Kit (JDK) 17 설치

**다운로드 및 설치**

- [Zulu JDK 17 (Windows x64)](https://www.azul.com/downloads/?version=java-17-lts&os=windows&package=jdk#zulu) 다운로드
- `.msi` 인스톨러 실행
- ✅ **중요**: 설치 중 "Add to PATH" 옵션 반드시 체크!

**설치 확인 (PowerShell 또는 CMD)**

```bash
java -version
# "openjdk version 17.x.x"가 출력되어야 함
```

**JAVA_HOME 환경 변수 설정** (자동 설정 안 된 경우)

1. 제어판 → 시스템 → 고급 시스템 설정 → 환경 변수
2. 시스템 변수에서 "새로 만들기":
   ```
   변수 이름: JAVA_HOME
   변수 값: C:\Program Files\Zulu\zulu-17
   ```
3. Path 변수에 추가:
   ```
   %JAVA_HOME%\bin
   ```
4. PowerShell 재시작 후 `java -version` 재확인

**여러 Java 버전이 설치된 경우**

- JAVA_HOME을 JDK 17 경로로 설정
- Path에서 JDK 17의 bin 경로가 다른 Java 경로보다 위에 있는지 확인

#### 5. Android 에뮬레이터에서 실행

- Android Studio에서 AVD(가상 디바이스) 생성
- PowerShell 또는 CMD에서 실행:

```bash
npx expo run:android
```

#### 6. 실제 Android 기기에서 실행

- 개발자 옵션 활성화 (설정 → 휴대전화 정보 → 빌드 번호 7회 탭)
- USB 디버깅 활성화
- USB로 연결 후:

```bash
npx expo run:android --device
```

---

## 🔧 자주 발생하는 문제

### Java 버전 충돌 문제

```bash
# 현재 사용 중인 Java 버전 확인
java -version

# macOS: JAVA_HOME 확인
echo $JAVA_HOME

# Windows: JAVA_HOME 확인
echo %JAVA_HOME%
```

### Android 빌드 시 "Could not determine java version" 에러

- JDK 17이 제대로 설치되었는지 확인
- JAVA_HOME 환경 변수가 올바르게 설정되었는지 확인
- 터미널/PowerShell 재시작 후 재시도

### macOS에서 여러 Java 버전 관리

```bash
# 설치된 모든 Java 버전 확인
/usr/libexec/java_home -V

# Java 17 사용
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

### iOS 빌드 시 CocoaPods 에러

```bash
cd ios
pod install
cd ..
npx expo run:ios
```

### Android 빌드 시 Gradle 에러

```bash
cd android
./gradlew clean
cd ..
npx expo run:android
```

### 환경 변수가 인식되지 않을 때

- 터미널/PowerShell을 완전히 종료 후 재실행
- macOS: `echo $ANDROID_HOME`으로 확인
- Windows: `echo %ANDROID_HOME%`으로 확인

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

> 💡 **자세한 개발 컨벤션은 [CONVENTIONS.md](./docs/CONVENTIONS.md)를 참고하세요!**
> Git 사용법, 브랜치 전략, 커밋 규칙, TypeScript 타입 작성 규칙, 코드 스타일 등 모든 개발 규칙이 정리되어 있습니다.

### 커밋 메시지 규칙 (간단 요약)

**형식**: `<타입>(<범위>): <제목>`

**타입**:

- `feat` - 새로운 기능 추가
- `fix` - 버그 수정
- `style` - UI/디자인 수정
- `refactor` - 코드 개선 (기능 변경 없음)
- `docs` - 문서 수정
- `chore` - 설정 파일, 패키지 설치 등

**범위** (선택사항):

- `auth` - 인증 관련
- `match` - 매칭 관련
- `chat` - 채팅 관련
- `bus` - 버스 관련

**예시:**

```bash
git commit -m "feat(auth): 로그인 페이지 UI 구현"
git commit -m "fix(match): 매칭 시간 계산 오류 수정"
git commit -m "style(button): 로그인 버튼 색상 변경"
```

> 💡 자세한 커밋 규칙은 [CONVENTIONS.md](./docs/CONVENTIONS.md)를 참고하세요!

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
