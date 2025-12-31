// React Query: 데이터 생성/수정/삭제 (Mutation)
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createExample, deleteExample } from '../api/mutateExample';
import { CreateExampleRequest } from '../types/example';

/**
 * 새 예제를 생성하는 Mutation 훅
 * 성공 시 자동으로 목록을 새로고침합니다.
 *
 * @example
 * ```tsx
 * const createMutation = useCreateExampleMutation();
 *
 * const handleCreate = () => {
 *   createMutation.mutate({
 *     title: '금정역 → 한세대',
 *     description: '오후 3시 출발',
 *     location: 'kumjeong',
 *   });
 * };
 *
 * return (
 *   <Button
 *     onPress={handleCreate}
 *     disabled={createMutation.isPending}
 *   >
 *     생성하기
 *   </Button>
 * );
 * ```
 */
export function useCreateExampleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExampleRequest) => createExample(data),
    onSuccess: () => {
      // 성공 시 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['examples'] });
    },
  });
}

/**
 * 예제를 삭제하는 Mutation 훅
 * 성공 시 자동으로 목록을 새로고침합니다.
 *
 * @example
 * ```tsx
 * const deleteMutation = useDeleteExampleMutation();
 *
 * const handleDelete = (id: string) => {
 *   deleteMutation.mutate(id);
 * };
 *
 * return (
 *   <Button
 *     onPress={() => handleDelete('example-123')}
 *     disabled={deleteMutation.isPending}
 *   >
 *     삭제하기
 *   </Button>
 * );
 * ```
 */
export function useDeleteExampleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteExample(id),
    onSuccess: () => {
      // 성공 시 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['examples'] });
    },
  });
}
