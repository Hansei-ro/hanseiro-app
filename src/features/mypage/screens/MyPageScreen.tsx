import styled from '@emotion/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MyPageMenuList } from '../components/MyPageMenuList';
import { UserProfileCard } from '../components/UserProfileCard';

import { ScreenHeader } from '@/shared/ui/ScreenHeader';

export function MyPageScreen() {
  return (
    <SafeArea edges={['top']}>
      <Container>
        <ScreenHeader title="MY" />
        <ContentWrapper>
          <UserProfileCard />
          <MyPageMenuList />
        </ContentWrapper>
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const Container = styled(View)`
  flex: 1;
  gap: 18px;
`;

const ContentWrapper = styled(View)`
  gap: 60px;
`;
