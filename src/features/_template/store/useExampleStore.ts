// Zustand: 클라이언트 상태 관리
import { create } from 'zustand';

import { ExampleFilter } from '../types/example';

/**
 * 예제 기능의 클라이언트 상태를 관리하는 Zustand 스토어
 *
 * 🚨 주의: 서버 데이터는 여기에 저장하지 마세요!
 *    - ✅ OK: 선택된 항목, 검색어, 필터 설정, UI 상태
 *    - ❌ NO: 서버에서 가져온 목록, 유저 정보 (React Query 사용!)
 */
interface ExampleState {
  // --- 상태 ---
  /** 현재 선택된 예제 ID */
  selectedExampleId: string | null;

  /** 검색어 */
  searchQuery: string;

  /** 필터 설정 */
  filter: ExampleFilter;

  /** 모달 열림/닫힘 상태 */
  isCreateModalOpen: boolean;

  // --- 액션 ---
  /** 예제 선택 */
  setSelectedExampleId: (id: string | null) => void;

  /** 검색어 변경 */
  setSearchQuery: (query: string) => void;

  /** 필터 변경 */
  setFilter: (filter: Partial<ExampleFilter>) => void;

  /** 모달 열기/닫기 */
  openCreateModal: () => void;
  closeCreateModal: () => void;

  /** 모든 상태 초기화 */
  reset: () => void;
}

const initialFilter: ExampleFilter = {
  location: 'all',
  status: 'all',
  searchQuery: '',
};

export const useExampleStore = create<ExampleState>((set) => ({
  // 초기 상태
  selectedExampleId: null,
  searchQuery: '',
  filter: initialFilter,
  isCreateModalOpen: false,

  // 액션 구현
  setSelectedExampleId: (id) => set({ selectedExampleId: id }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setFilter: (newFilter) =>
    set((state) => ({
      filter: { ...state.filter, ...newFilter },
    })),

  openCreateModal: () => set({ isCreateModalOpen: true }),

  closeCreateModal: () => set({ isCreateModalOpen: false }),

  reset: () =>
    set({
      selectedExampleId: null,
      searchQuery: '',
      filter: initialFilter,
      isCreateModalOpen: false,
    }),
}));

/**
 * 사용 예시:
 *
 * ```tsx
 * import { useExampleStore } from '@/features/example/store/useExampleStore';
 *
 * function ExampleScreen() {
 *   const { selectedExampleId, setSelectedExampleId } = useExampleStore();
 *
 *   return (
 *     <Button onPress={() => setSelectedExampleId('example-123')}>
 *       예제 선택
 *     </Button>
 *   );
 * }
 * ```
 */
