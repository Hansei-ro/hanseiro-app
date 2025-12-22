import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/shared/ui/Text';

interface ChatRoomHeaderProps {
  title: string;
  onBackPress: () => void;
}

// 채팅방 상단 헤더 컴포넌트
export function ChatRoomHeader({ title, onBackPress }: ChatRoomHeaderProps) {
  const theme = useTheme();
  return (
    <Container>
      {/* 뒤로가기 버튼 */}
      <BackButton onPress={onBackPress}>
        <ChevronLeft color={theme.colors.primary.black} size={24} />
      </BackButton>
      {/* 헤더 제목 */}
      <Text
        variant="l"
        weight="semiBold"
        color={theme.colors.primary.black}
        align="center"
        style={{ flex: 1 }}
      >
        {title}
      </Text>
    </Container>
  );
}

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding-horizontal: 16px;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const BackButton = styled(Pressable)`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: flex-start;
`;
