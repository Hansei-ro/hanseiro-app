import styled from '@emotion/native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { AvatarGroup } from '@/shared/ui/AvatarGroup';
import { getFontFamily } from '@/shared/utils/typography';

export interface ChatListItemProps {
  id: string;
  title: string;
  lastMessage: string;
  lastMessageTime: string; // "방금 전", "5분 전"
  participantCount: number;
  hasUnread: boolean;
  onPress?: () => void;
}

export function ChatListItem({
  title,
  lastMessage,
  lastMessageTime,
  participantCount,
  hasUnread,
  onPress,
}: ChatListItemProps) {
  return (
    <Container onPress={onPress}>
      <AvatarGroup count={participantCount} />
      <Content>
        <HeaderRow>
          <Title numberOfLines={1}>{title}</Title>
          <CountText>{participantCount}</CountText>
          {hasUnread && <UnreadBadge />}
        </HeaderRow>
        <BottomRow>
          <MessageText numberOfLines={1}>{lastMessage}</MessageText>
          <TimeText>{lastMessageTime}</TimeText>
        </BottomRow>
      </Content>
    </Container>
  );
}

const Container = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  /* User specified 28px gap between items, handled by List separator. 
     No internal padding specified, but usually list items have vertical padding.
     However, user said "Chat room info gap is 28px".
     This likely refers to the vertical space between the bottom of one room and top of next.
     So height is determined by content.
  */
`;

const Content = styled(View)`
  flex: 1;
  margin-left: 12px;
  justify-content: center;
  gap: 2px;
`;

const HeaderRow = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const Title = styled(Text)`
  font-family: ${getFontFamily('semiBold')};
  font-size: ${({ theme }) => theme.typography.fontSize.m};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.primary.black};
`;

const UnreadBadge = styled(View)`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.primary.main};
`;

const CountText = styled(Text)`
  font-family: ${getFontFamily('semiBold')};
  font-size: ${({ theme }) => theme.typography.fontSize.m};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const BottomRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const MessageText = styled(Text)`
  font-family: ${getFontFamily('regular')};
  font-size: ${({ theme }) => theme.typography.fontSize.s};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const TimeText = styled(Text)`
  font-family: ${getFontFamily('regular')};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;
