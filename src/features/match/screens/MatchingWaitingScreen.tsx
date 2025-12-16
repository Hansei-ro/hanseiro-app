import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Clock } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MatchingRouteInfo } from '../components/MatchingRouteInfo';
import { ParticipantStatusSection } from '../components/ParticipantStatusSection';

import { getFontFamily } from '@/shared/lib/typography';
import { Button } from '@/shared/ui/Button';
import { StackHeader } from '@/shared/ui/StackHeader';

export default function MatchingWaitingScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Container style={{ paddingTop: insets.top }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary.white} />
      <StackHeader title="매칭" />

      <ContentWrapper>
        <ScrollView>
          <ScrollContent>
            <MatchingRouteInfo />

            <MatchingContent>
              <ParticipantStatusSection
                participants={[
                  { name: '나', department: '소프트웨어학과', status: '대기중', isMe: true },
                  {
                    name: '홍길동',
                    department: '컴퓨터공학과',
                    status: '준비 완료',
                    isReady: true,
                  },
                  { isEmpty: true, department: '' },
                  { isEmpty: true, department: '' },
                ]}
                currentCount={2}
                readyCount={1}
                maxCount={4}
              />

              <TimerWrapper>
                <Clock size={16} color={theme.colors.text.tertiary} />
                <TimerText>2분 01초</TimerText>
              </TimerWrapper>
            </MatchingContent>
          </ScrollContent>
        </ScrollView>

        <BottomContainer bottomInset={insets.bottom}>
          <Button title="현재 인원으로 출발" onPress={() => {}} variant="primary" />
          <Button title="매칭 취소" onPress={() => {}} variant="secondary" />
        </BottomContainer>
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

const TimerText = styled(Text)`
  font-family: ${getFontFamily('medium')};
  font-size: ${({ theme }) => theme.typography.fontSize.s};
  color: ${({ theme }) => theme.colors.text.time};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const BottomContainer = styled(View)<{ bottomInset: number }>`
  gap: 8px;
  padding-bottom: ${({ bottomInset }) => bottomInset + 16}px;
`;
