# 프로젝트 시작 가이드

팀원들이 `src/features/` 폴더에서 바로 개발을 시작할 수 있도록 안내합니다.

## 📁 폴더 구조

```
src/features/버스기능/
  ├── ui/       # 화면용 컴포넌트
  ├── hooks/    # React Query 훅 (서버 데이터)
  ├── store/    # Zustand 스토어 (클라이언트 상태)
  └── types/    # 타입 정의
```

## 🚀 개발 시작하기

### 1. 브랜치 생성

```bash
git checkout develop
git pull origin develop
git checkout -b feature/버스-시간표
```

### 2. 코드 작성

- `src/features/버스/` 폴더에서 작업
- `src/features/_template/` 참고

### 3. 커밋

```bash
git add .
git commit -m "feat(bus): 버스 시간표 추가"
```

## 📚 참고 문서

- [개발 컨벤션](CONVENTION.md)
- [Feature 템플릿](../src/features/_template/README.md)
