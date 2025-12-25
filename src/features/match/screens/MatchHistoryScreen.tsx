import styled from '@emotion/native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MatchHistoryList } from '../components/MatchHistoryList';
import { useMatchHistory } from '../hooks/useMatchHistory';

import { StackHeader } from '@/shared/ui/StackHeader';

export function MatchHistoryScreen() {
  const { data, isPending, isError, refetch } = useMatchHistory();
  const histories = data ?? [];

  return (
    <SafeArea edges={['top']}>
      <StackHeader title="매칭 내역" titleAlign="left" />
      <MatchHistoryList
        items={histories}
        isPending={isPending}
        isError={isError}
        onRetry={refetch}
      />
    </SafeArea>
  );
}

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;
