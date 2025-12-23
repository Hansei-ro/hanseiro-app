import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { router } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProfileCard } from '../components/ProfileCard';
import { ProfileMenu } from '../components/ProfileMenu';

import { Text } from '@/shared/ui/Text';

export function ProfileScreen() {
  const theme = useTheme();
  return (
    <SafeArea edges={['top']}>
      <Container>
        <Header>
          <Text variant="titleM" weight="bold" color={theme.colors.primary.black}>
            MY
          </Text>
        </Header>
        <ContentWrapper>
          <ProfileCard />
          <MenuContainer>
            <ProfileMenu title="지난 매칭 내역" onPress={() => router.push('/match/history')} />
            <ProfileMenu title="설정" onPress={() => {}} />
            <ProfileMenu title="회원탈퇴" onPress={() => {}} />
            <ProfileMenu title="로그아웃" onPress={() => {}} hasArrow={false} />
          </MenuContainer>
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

const Header = styled(View)`
  padding: 16px 20px;
`;

const MenuContainer = styled(View)``;
