# 공통 아이콘 관리

여러 feature에서 공통으로 사용하는 SVG 아이콘을 관리합니다.

## 사용 방법

### SVG 컴포넌트로 import

```tsx
import MatchIcon from '@/shared/icons/match.svg';
import HomeIcon from '@/shared/icons/home.svg';

// 컴포넌트로 사용
<MatchIcon width={24} height={24} />
<HomeIcon width={20} height={20} fill="#000" />
```

### Props 활용

`react-native-svg`의 `SvgProps`를 모두 사용할 수 있습니다:

```tsx
<HomeIcon width={24} height={24} fill="#007AFF" stroke="#000" opacity={0.8} />
```

## 위치 결정 기준

| 상황                             | 위치                          | 예시                              |
| -------------------------------- | ----------------------------- | --------------------------------- |
| 여러 feature에서 사용하는 아이콘 | `src/shared/icons/`           | 탭바 아이콘, 공통 UI 아이콘       |
| 특정 feature 전용 아이콘         | `src/features/[name]/assets/` | 택시 마커, 카풀 일러스트          |
| 앱 메타 아이콘                   | `/assets/`                    | 앱 아이콘, 스플래시 (Expo 설정용) |

## 디자이너 요청사항

- **형식**: SVG 파일로 export
- **크기**: 24x24px 기준으로 디자인 (필요에 따라 조정 가능)
- **상태**: 선택/비선택 상태가 필요하면 각각 제공
- **최적화**: 불필요한 그룹이나 레이어 정리된 상태로 전달

## 기술 정보

이 프로젝트는 `react-native-svg-transformer`를 사용하여 SVG 파일을 React 컴포넌트로 변환합니다.

- Metro 설정: `metro.config.js`
- TypeScript 타입: `custom.d.ts`
