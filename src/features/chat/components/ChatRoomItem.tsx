import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import React from 'react';
import { Pressable, View } from 'react-native';

import { AvatarGroup } from '@/shared/ui/AvatarGroup';
import { Text } from '@/shared/ui/Text';

export interface ChatRoomItemProps {
  id: string;
  title: string;
  lastMessage: string;
  lastMessageTime: string; // "방금 전", "5분 전"
  participantCount: number;
  hasUnread: boolean;
  onPress?: () => void;
}

// 채팅방 목록 아이템 컴포넌트
export function ChatRoomItem({
  title,
  lastMessage,
  lastMessageTime,
  participantCount,
  hasUnread,
  onPress,
}: ChatRoomItemProps) {
  const theme = useTheme();

  return (
    <Container onPress={onPress}>
      {/* 참여자 프로필 이미지 영역 */}
      <AvatarGroup count={participantCount} />
      {/* 채팅방 정보 영역 */}
      <Content>
        <HeaderRow>
          {/* 채팅방 제목 */}
          <Text
            variant="m"
            weight="semiBold"
            color={theme.colors.primary.black}
            numberOfLines={1}
            style={{ flexShrink: 1 }}
          >
            {title}
          </Text>
          {/* 채팅방 인원 수 */}
          <Text variant="m" weight="semiBold" color={theme.colors.text.tertiary}>
            {participantCount}
          </Text>
          {/* 읽지 않은 메시지 수 */}
          {hasUnread && <UnreadBadge />}
        </HeaderRow>
        <BottomRow>
          {/* 마지막 메시지 */}
          <Text
            variant="s"
            weight="regular"
            color={theme.colors.text.secondary}
            numberOfLines={1}
            style={{ flex: 1 }}
          >
            {lastMessage}
          </Text>
          {/* 마지막 메시지 전송 시간 */}
          <Text variant="xs" weight="regular" color={theme.colors.text.tertiary}>
            {lastMessageTime}
          </Text>
        </BottomRow>
      </Content>
    </Container>
  );
}

const Container = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const Content = styled(View)`
  flex: 1;
  justify-content: center;
  gap: 2px;
`;

const HeaderRow = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const UnreadBadge = styled(View)`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.primary.main};
`;

const BottomRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
