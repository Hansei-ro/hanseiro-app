// 예제: 카드 형태의 UI 컴포넌트
import styled from '@emotion/native';

import { Example } from '../types/example';

interface ExampleCardProps {
  /** 표시할 예제 데이터 */
  data: Example;

  /** 카드 클릭 시 실행할 함수 */
  onPress: () => void;

  /** 선택된 상태 여부 (선택 시 하이라이트 표시) */
  isSelected?: boolean;
}

/**
 * 예제 정보를 카드 형태로 표시하는 컴포넌트
 *
 * @example
 * ```tsx
 * <ExampleCard
 *   data={example}
 *   onPress={() => handlePress(example.id)}
 *   isSelected={selectedId === example.id}
 * />
 * ```
 */
export function ExampleCard({ data, onPress, isSelected = false }: ExampleCardProps) {
  return (
    <Card onPress={onPress} isSelected={isSelected}>
      <Header>
        <Title>{data.title}</Title>
        <StatusBadge status={data.status}>
          <StatusText>{getStatusLabel(data.status)}</StatusText>
        </StatusBadge>
      </Header>

      <Description numberOfLines={2}>{data.description}</Description>

      <Footer>
        <LocationText>📍 {getLocationLabel(data.location)}</LocationText>
      </Footer>
    </Card>
  );
}

// --- 스타일 정의 ---

const Card = styled.Pressable<{ isSelected: boolean }>`
  padding: 16px;
  background-color: ${(props) => (props.isSelected ? '#e3f2fd' : '#fff')};
  border-radius: 12px;
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? '#2196f3' : '#e0e0e0')};
  margin-bottom: 12px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #212121;
  flex: 1;
`;

const StatusBadge = styled.View<{ status: Example['status'] }>`
  padding: 4px 12px;
  border-radius: 12px;
  background-color: ${(props) => {
    switch (props.status) {
      case 'active':
        return '#4caf50';
      case 'completed':
        return '#9e9e9e';
      case 'cancelled':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  }};
`;

const StatusText = styled.Text`
  font-size: 12px;
  color: #fff;
  font-weight: 600;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  line-height: 20px;
`;

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LocationText = styled.Text`
  font-size: 14px;
  color: #757575;
`;

// --- 유틸리티 함수 ---

function getStatusLabel(status: Example['status']): string {
  switch (status) {
    case 'active':
      return '모집중';
    case 'completed':
      return '완료';
    case 'cancelled':
      return '취소됨';
    default:
      return '알 수 없음';
  }
}

function getLocationLabel(location: Example['location']): string {
  switch (location) {
    case 'kumjeong':
      return '금정역';
    case 'dangjeong':
      return '당정역';
    case 'hansei':
      return '한세대';
    default:
      return '알 수 없음';
  }
}
