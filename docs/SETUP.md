# 개발 환경 설정

> 개발 환경 구성과 테스트 빌드 설치 방법을 정리한 문서입니다.

## 📲 테스트 빌드 설치

> 💡 개발 환경 설정 없이 앱을 테스트하고 싶은 분들(백엔드, 디자이너 등)을 위한 빌드입니다.

| 플랫폼      | 설치 링크                                                                                                     | 최종 업데이트 |
| ----------- | ------------------------------------------------------------------------------------------------------------- | ------------- |
| **Android** | [빌드 페이지](https://expo.dev/accounts/tnemn/projects/hansei-ro/builds/c8ee9ab0-8169-429d-9f32-4bf1235f8d6e) | 2026-01-01    |
| **iOS**     | [빌드 페이지](https://expo.dev/accounts/tnemn/projects/hansei-ro/builds/b204e77e-6ce5-4316-9fa0-d60217adb637) | 2026-01-01    |

### 설치 방법

**Android (APK):**

1. 위 링크 접속 → **"Install"** 클릭
2. QR 코드 스캔 또는 APK 다운로드
3. "알 수 없는 앱 설치" 허용 후 설치

**iOS (시뮬레이터 전용):**

> ⚠️ **요구 사항**: macOS + Xcode 설치 필요 (Windows에서는 불가)

1. 위 링크 접속 → `.tar.gz` 파일 다운로드
2. 다운로드한 파일 압축 해제 → `.app` 폴더 생성
3. Xcode의 iOS 시뮬레이터 실행 (Xcode → Open Developer Tool → Simulator)
4. `.app` 폴더를 시뮬레이터 화면에 **드래그 앤 드롭**하여 설치
5. 시뮬레이터 홈 화면에서 앱 실행

> 💡 **팁**: 시뮬레이터에서 `Cmd + Shift + H`로 홈 화면 이동

### 앱 첫 실행 시 설정

앱을 처음 실행하면 업데이트 서버 URL을 입력하는 화면이 나타납니다. 아래 URL을 입력해주세요:

```
https://u.expo.dev/1345ccf1-9ecc-47e3-b6f2-1cd13408a487?channel-name=development
```

> 💡 **팁**: 한 번 입력하면 이후에는 자동으로 최신 버전을 받아옵니다.

> ⚠️ **참고**: 새 빌드 생성 시 링크가 변경됩니다. 업데이트된 빌드는 이 표를 확인해주세요.

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

> 문제가 발생하면 `docs/TROUBLESHOOTING.md`를 먼저 확인하세요.

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

## 📎 참고 문서

- `docs/TROUBLESHOOTING.md` : 환경 설정 문제 해결
- `docs/CONVENTIONS.md` : Git/브랜치/커밋/코드 스타일 규칙
