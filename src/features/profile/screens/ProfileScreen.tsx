import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProfileCard } from '../components/ProfileCard';

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
        <ProfileCard />
        <Pressable
          onPress={() => router.push('/match/history')}
          style={({ pressed }) => [
            { marginTop: 20, padding: 10, backgroundColor: '#eee', borderRadius: 8 },
            pressed && { opacity: 0.7 },
          ]}
        />
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
`;

const Header = styled(View)`
  padding: 16px 20px;
`;
