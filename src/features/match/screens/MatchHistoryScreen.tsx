import styled from '@emotion/native';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AvatarGroup } from '@/shared/ui/AvatarGroup';
import { StackHeader } from '@/shared/ui/StackHeader';

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
  const renderItem = ({ item }: { item: (typeof MOCK_HISTORY)[0] }) => (
    <HistoryItemContainer>
      <InfoContainer>
        <DateText>{item.date}</DateText>
        <TitleText>{item.title}</TitleText>
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

const DateText = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 4px;
`;

const TitleText = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.l};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.primary.black};
`;

const AvatarContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;

const Separator = styled(View)`
  height: 12px;
`;
