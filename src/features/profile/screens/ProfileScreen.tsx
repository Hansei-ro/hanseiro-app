import styled from '@emotion/native';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getFontFamily } from '@/shared/lib/typography';

export function ProfileScreen() {
  return (
    <SafeArea edges={['top']}>
      <Container>
        <Title>프로필</Title>
        <Subtitle>내 정보 및 설정</Subtitle>
        <Pressable
          onPress={() => router.push('/match/history')}
          style={({ pressed }) => [
            { marginTop: 20, padding: 10, backgroundColor: '#eee', borderRadius: 8 },
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text>지난 매칭 내역 보기 (임시)</Text>
        </Pressable>
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
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

const Title = styled(Text)`
  font-family: ${getFontFamily('bold')};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Subtitle = styled(Text)`
  font-family: ${getFontFamily('regular')};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;
