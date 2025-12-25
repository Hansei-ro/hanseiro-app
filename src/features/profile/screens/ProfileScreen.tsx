import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProfileCard } from '../components/ProfileCard';
import { ProfileMenuList } from '../components/ProfileMenuList';

import { Text } from '@/shared/ui/Text';

export function ProfileScreen() {
  const theme = useTheme();
  return (
    <SafeArea edges={['top']}>
      <Container>
        <Header>
          <Text variant="titleM" weight="semiBold" color={theme.colors.primary.black}>
            MY
          </Text>
        </Header>
        <ContentWrapper>
          <ProfileCard />
          <ProfileMenuList />
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
