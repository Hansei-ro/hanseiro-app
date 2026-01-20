# 문제 해결 가이드

> 자주 발생하는 문제와 해결 방법을 정리합니다.

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

## 🧭 어디를 먼저 봐야 하나요?

1. **빌드 에러**: 터미널 메시지를 읽고 파일 경로 확인
2. **API 에러**: `src/shared/lib/axios.ts` 인터셉터 로그 확인
3. **린트 에러**: `yarn lint` 실행 후 메시지 확인

---

## 📎 참고 문서

- `docs/SETUP.md` : 개발 환경 설정
- `docs/CONVENTIONS.md` : 개발 컨벤션
