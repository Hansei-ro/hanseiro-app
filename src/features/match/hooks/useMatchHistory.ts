import { useQuery } from '@tanstack/react-query';

import { adaptMatchHistoryResponseToUI } from '../adapters/matchHistoryAdapter';
import { mockFetchMatchHistory } from '../api/mockMatchHistory';
import { MatchHistoryItemUI } from '../types/matchHistory.ui';

/**
 * 매칭 내역 조회 React Query 훅 (MatchHistoryScreen 전용)
 */
export const useMatchHistory = () => {
  return useQuery({
    queryKey: ['matchHistory'],
    queryFn: mockFetchMatchHistory,
    select: (response): MatchHistoryItemUI[] => adaptMatchHistoryResponseToUI(response),
    staleTime: 1000 * 60 * 5,
  });
};
