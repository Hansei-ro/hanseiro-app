# 탭 아이콘 사용 가이드

## 아이콘 파일 위치

`assets/icons/` 폴더에 SVG 파일을 저장하세요.

## 필요한 아이콘 목록

- `home.svg` / `home-active.svg`
- `bus.svg` / `bus-active.svg`
- `chat.svg` / `chat-active.svg`
- `match.svg` / `match-active.svg`
- `profile.svg` / `profile-active.svg`

## 사용 예시

```tsx
import HomeIcon from '@/../../assets/icons/home.svg';
import HomeActiveIcon from '@/../../assets/icons/home-active.svg';

// 탭 바에서 사용
<HomeIcon width={24} height={24} />
<HomeActiveIcon width={24} height={24} fill="#007AFF" />
```

## 디자이너에게 요청사항

- SVG 형식으로 export
- 크기: 24x24px 기준으로 디자인
- 선택/비선택 상태 각각 제공
- 불필요한 그룹이나 레이어 정리
