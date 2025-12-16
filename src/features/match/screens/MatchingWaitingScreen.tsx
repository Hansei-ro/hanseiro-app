import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Clock } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../../../shared/ui/Button';
import { StackHeader } from '../../../shared/ui/StackHeader';
import { MatchingRouteInfo } from '../components/MatchingRouteInfo';
import { ParticipantCard } from '../components/ParticipantCard';

export default function MatchingWaitingScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Container style={{ paddingTop: insets.top }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary.white} />
      <StackHeader title="매칭" />

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <MatchingRouteInfo />

        <Section>
          <SectionHeader>
            <SectionTitle>참가자 현황</SectionTitle>
            <SectionStatus>
              <StatusHighlight>2</StatusHighlight>/4명 · <StatusHighlight>1</StatusHighlight>명 준비
              완료
            </SectionStatus>
          </SectionHeader>

          <ParticipantList>
            <ParticipantCard name="나" status="대기중" isMe />
            <ParticipantCard name="홍길동" department="컴퓨터공학과" status="준비 완료" isReady />
            <ParticipantCard isEmpty />
            <ParticipantCard isEmpty />
          </ParticipantList>
        </Section>

        <TimerWrapper>
          <Clock size={16} color={theme.colors.text.tertiary} />
          <TimerText>2분 01초</TimerText>
        </TimerWrapper>
      </ScrollView>

      <BottomContainer style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 16 }}>
        <Button
          title="현재 인원으로 출발"
          onPress={() => {}}
          variant="primary"
          style={{ marginBottom: 8 }}
        />
        <Button title="매칭 취소" onPress={() => {}} variant="secondary" />
      </BottomContainer>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const Section = styled(View)`
  padding-horizontal: 20px;
  margin-top: 24px;
`;

const SectionHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const SectionTitle = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.m};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.black};
`;

const SectionStatus = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.s};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StatusHighlight = styled(Text)`
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ParticipantList = styled(View)`
  gap: 8px;
`;

const TimerWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  gap: 4px;
`;

const TimerText = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.s};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const BottomContainer = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-horizontal: 20px;
  padding-top: 16px;
  background-color: ${({ theme }) => theme.colors.primary.white};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.semantic.stroke || '#EAEBEF'};
`;
