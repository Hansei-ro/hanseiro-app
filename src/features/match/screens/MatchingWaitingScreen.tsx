import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Clock } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MatchingRouteInfo } from '../components/MatchingRouteInfo';
import { ParticipantStatusSection } from '../components/ParticipantStatusSection';
import { useMatchWaiting } from '../hooks/useMatchWaiting';

import { Button } from '@/shared/ui/Button';
import { StackHeader } from '@/shared/ui/StackHeader';
import { Text } from '@/shared/ui/Text';

export default function MatchingWaitingScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { data, isPending, isError, refetch } = useMatchWaiting();
  const matchData = data;

  const handleStartMatch = () => undefined;
  const handleCancelMatch = () => undefined;

  return (
    <Container style={{ paddingTop: insets.top }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary.white} />
      <StackHeader title="매칭" />

      <ContentWrapper>
        {isPending && (
          <CenteredContainer>
            <ActivityIndicator size="large" color={theme.colors.primary.main} />
            <Text variant="s" weight="medium" color={theme.colors.text.secondary}>
              로딩 중...
            </Text>
          </CenteredContainer>
        )}

        {!isPending && isError && (
          <CenteredContainer>
            <Text variant="m" weight="medium" color={theme.colors.text.secondary} align="center">
              매칭 정보를 불러올 수 없습니다
            </Text>
            <RetryButton onPress={() => refetch()}>
              <Text variant="s" weight="semiBold" color={theme.colors.primary.white}>
                다시 시도
              </Text>
            </RetryButton>
          </CenteredContainer>
        )}

        {!isPending && !isError && matchData && (
          <>
            <ScrollView>
              <ScrollContent>
                <MatchingRouteInfo from={matchData.route.from} to={matchData.route.to} />

                <MatchingContent>
                  <ParticipantStatusSection
                    participants={matchData.participants}
                    currentCount={matchData.currentCount}
                    readyCount={matchData.readyCount}
                    maxCount={matchData.maxCount}
                  />

                  <TimerWrapper>
                    <Clock size={16} color={theme.colors.text.tertiary} />
                    <Text variant="s" weight="medium" color={theme.colors.text.time}>
                      {matchData.remainingTimeText}
                    </Text>
                  </TimerWrapper>
                </MatchingContent>
              </ScrollContent>
            </ScrollView>

            <BottomContainer style={{ paddingBottom: insets.bottom + 16 }}>
              <Button title="현재 인원으로 출발" onPress={handleStartMatch} variant="primary" />
              <Button title="매칭 취소" onPress={handleCancelMatch} variant="secondary" />
            </BottomContainer>
          </>
        )}
      </ContentWrapper>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const ContentWrapper = styled(View)`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
`;

const ScrollContent = styled(View)`
  gap: 40px;
`;

const MatchingContent = styled(View)`
  gap: 8px;
`;

const TimerWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const BottomContainer = styled(View)`
  gap: 8px;
`;

const CenteredContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 24px;
`;

const RetryButton = styled(Pressable)`
  padding: 10px 18px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary.main};
`;
