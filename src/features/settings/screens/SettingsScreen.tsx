import styled from '@emotion/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsList } from '../components/SsettingList';

import { StackHeader } from '@/shared/ui/StackHeader';

export function SettingsScreen() {
  return (
    <Container edges={['top']}>
      <StackHeader title="설정" titleAlign="left" />
      <ContentWrapper>
        <SettingsList />
      </ContentWrapper>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  gap: 18px;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const ContentWrapper = styled(View)`
  padding: 0 20px;
`;
