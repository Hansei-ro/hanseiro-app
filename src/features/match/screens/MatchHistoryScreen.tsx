import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AvatarGroup } from '@/shared/ui/AvatarGroup';
import { StackHeader } from '@/shared/ui/StackHeader';
import { Text } from '@/shared/ui/Text';

// Mock Data based on the screenshot
const MOCK_HISTORY = [
  {
    id: '1',
    date: '12월 9일 (목)',
    title: '산본역 4인 매칭',
    participantCount: 4,
  },
  {
    id: '2',
    date: '12월 7일 (화)',
    title: '금정역 2인 매칭',
    participantCount: 2,
  },
];

export function MatchHistoryScreen() {
  const theme = useTheme();

  const renderItem = ({ item }: { item: (typeof MOCK_HISTORY)[0] }) => (
    <HistoryItemContainer>
      <InfoContainer>
        <Text variant="xs" color={theme.colors.text.secondary}>
          {item.date}
        </Text>
        <Text variant="l" weight="semiBold">
          {item.title}
        </Text>
      </InfoContainer>
      <AvatarContainer>
        <AvatarGroup count={item.participantCount} />
      </AvatarContainer>
    </HistoryItemContainer>
  );

  return (
    <SafeArea edges={['top']}>
      <Container>
        <StackHeader title="매칭 내역" titleAlign="left" />
        <FlatList
          data={MOCK_HISTORY}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
          ItemSeparatorComponent={() => <Separator />}
        />
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const HistoryItemContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 14px;
  padding-horizontal: 18px;
`;

const InfoContainer = styled(View)`
  justify-content: center;
`;

const AvatarContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;

const Separator = styled(View)`
  height: 12px;
`;
