import styled from '@emotion/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DeleteInfo } from '../components/DeleteInfo';

import { Button } from '@/shared/ui/Button';
import { StackHeader } from '@/shared/ui/StackHeader';

export function DeleteAccountScreen() {
  return (
    <Container edges={['top']}>
      <StackHeader title="회원탈퇴" titleAlign="left" />
      <ContentWrapper>
        <DeleteInfo />
        <Button title="회원탈퇴" onPress={() => {}} variant="primary" />
      </ContentWrapper>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const ContentWrapper = styled(View)`
  gap: 60px;
  padding: 0 20px;
`;
