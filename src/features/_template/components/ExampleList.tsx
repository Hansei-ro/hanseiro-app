// 예제: 리스트 컴포넌트 (FlatList 사용)
import styled from '@emotion/native';
import { FlatList } from 'react-native';

import { Example } from '../types/example';

import { ExampleCard } from './ExampleCard';

interface ExampleListProps {
  /** 표시할 예제 목록 */
  data: Example[];

  /** 카드 클릭 시 실행할 함수 */
  onItemPress: (id: string) => void;

  /** 현재 선택된 예제 ID */
  selectedId?: string | null;

  /** 로딩 상태 */
  isLoading?: boolean;

  /** 빈 목록 메시지 */
  emptyMessage?: string;
}

/**
 * 예제 목록을 FlatList로 표시하는 컴포넌트
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useExampleListQuery();
 * const { selectedExampleId, setSelectedExampleId } = useExampleStore();
 *
 * <ExampleList
 *   data={data ?? []}
 *   onItemPress={setSelectedExampleId}
 *   selectedId={selectedExampleId}
 *   isLoading={isLoading}
 * />
 * ```
 */
export function ExampleList({
  data,
  onItemPress,
  selectedId,
  isLoading = false,
  emptyMessage = '표시할 항목이 없습니다.',
}: ExampleListProps) {
  if (isLoading) {
    return (
      <CenterContainer>
        <LoadingText>로딩 중...</LoadingText>
      </CenterContainer>
    );
  }

  if (data.length === 0) {
    return (
      <CenterContainer>
        <EmptyText>{emptyMessage}</EmptyText>
      </CenterContainer>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ExampleCard
          data={item}
          onPress={() => onItemPress(item.id)}
          isSelected={item.id === selectedId}
        />
      )}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

// --- 스타일 정의 ---

const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const LoadingText = styled.Text`
  font-size: 16px;
  color: #757575;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: #9e9e9e;
  text-align: center;
`;
