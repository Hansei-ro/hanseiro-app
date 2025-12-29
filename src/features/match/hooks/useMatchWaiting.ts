import { useQuery } from '@tanstack/react-query';

import { adaptMatchWaitingResponseToUI } from '../adapters/matchWaitingAdapter';
import { mockFetchMatchWaiting } from '../api/mockMatchWaiting';
import { MatchWaitingDataUI } from '../types/matchWaiting.ui';

/**
 * 매칭 대기 정보 조회 React Query 훅 (MatchingWaitingScreen 전용)
 */
export const useMatchWaiting = () => {
  return useQuery({
    queryKey: ['matchWaiting'],
    queryFn: mockFetchMatchWaiting,
    select: (response): MatchWaitingDataUI => adaptMatchWaitingResponseToUI(response),
    staleTime: 1000 * 30,
  });
};
