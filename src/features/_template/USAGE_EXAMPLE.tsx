// 📱 화면에서 사용하는 완전한 예제
// 이 파일은 app/(tabs)/ 폴더에서 실제로 사용하는 방법을 보여줍니다.

/**
 * 🎯 이 예제에서 보여주는 것:
 * 1. React Query로 서버 데이터 가져오기
 * 2. Zustand로 클라이언트 상태 관리
 * 3. UI 컴포넌트 조합
 * 4. 로딩/에러 처리
 * 5. 생성/삭제 기능
 */

import styled from '@emotion/native';
import React from 'react';

import { ExampleList } from './components/ExampleList';
import { useCreateExampleMutation, useDeleteExampleMutation } from './hooks/useExampleMutation';
import { useExampleListQuery } from './hooks/useExampleQuery';
import { useExampleStore } from './store/useExampleStore';

export default function ExampleScreen() {
  // 1️⃣ React Query: 서버 데이터 가져오기
  const { data, isLoading, error } = useExampleListQuery();

  // 2️⃣ React Query: 생성/삭제 Mutation
  const createMutation = useCreateExampleMutation();
  const deleteMutation = useDeleteExampleMutation();

  // 3️⃣ Zustand: 클라이언트 상태 (선택된 항목, 필터 등)
  const { selectedExampleId, setSelectedExampleId, searchQuery } = useExampleStore();

  // 4️⃣ 생성 핸들러
  const handleCreate = () => {
    createMutation.mutate({
      title: '금정역 → 한세대',
      description: '오후 3시 출발 예정',
      location: 'kumjeong',
    });
  };

  // 5️⃣ 삭제 핸들러
  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    }
  };

  // 6️⃣ 검색 필터링 (클라이언트 사이드)
  const filteredData =
    data?.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())) ?? [];

  // 7️⃣ 에러 처리
  if (error) {
    return (
      <Container>
        <ErrorText>데이터를 불러오는데 실패했습니다.</ErrorText>
        <ErrorDetail>{error.message}</ErrorDetail>
      </Container>
    );
  }

  // 8️⃣ UI 렌더링
  return (
    <Container>
      <Header>
        <Title>예제 화면</Title>

        {/* 생성 버튼 */}
        <CreateButton onPress={handleCreate} disabled={createMutation.isPending}>
          <ButtonText>{createMutation.isPending ? '생성 중...' : '+ 새로 만들기'}</ButtonText>
        </CreateButton>
      </Header>

      {/* 리스트 */}
      <ExampleList
        data={filteredData}
        onItemPress={setSelectedExampleId}
        selectedId={selectedExampleId}
        isLoading={isLoading}
        emptyMessage="검색 결과가 없습니다."
      />

      {/* 선택된 항목 정보 */}
      {selectedExampleId && (
        <SelectedInfo>
          <InfoText>선택된 ID: {selectedExampleId}</InfoText>
          <DeleteButton
            onPress={() => handleDelete(selectedExampleId)}
            disabled={deleteMutation.isPending}
          >
            <DeleteButtonText>
              {deleteMutation.isPending ? '삭제 중...' : '삭제하기'}
            </DeleteButtonText>
          </DeleteButton>
        </SelectedInfo>
      )}
    </Container>
  );
}

// --- 스타일 정의 ---

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const Header = styled.View`
  padding: 16px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const CreateButton = styled.Pressable`
  padding: 12px 16px;
  background-color: #2196f3;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 16px;
`;

const ErrorText = styled.Text`
  font-size: 18px;
  color: #f44336;
  text-align: center;
  margin-top: 32px;
`;

const ErrorDetail = styled.Text`
  font-size: 14px;
  color: #757575;
  text-align: center;
  margin-top: 8px;
`;

const SelectedInfo = styled.View`
  padding: 16px;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InfoText = styled.Text`
  font-size: 14px;
  color: #424242;
  flex: 1;
`;

const DeleteButton = styled.Pressable`
  padding: 8px 16px;
  background-color: #f44336;
  border-radius: 6px;
`;

const DeleteButtonText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 14px;
`;
