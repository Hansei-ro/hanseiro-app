import styled from '@emotion/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ChatAvatarGroup } from './ChatAvatarGroup';

export interface ChatListItemProps {
  id: string;
  title: string;
  lastMessage: string;
  participantCount: number;
  imageUrls?: string[];
  onPress?: () => void;
}

export function ChatListItem({
  title,
  lastMessage,
  participantCount,
  imageUrls,
  onPress,
}: ChatListItemProps) {
  return (
    <Container onPress={onPress}>
      <ChatAvatarGroup imageUrls={imageUrls} count={participantCount} />
      <Content>
        <HeaderRow>
          <Title numberOfLines={1}>{title}</Title>
          <CountText>{participantCount}</CountText>
        </HeaderRow>
        <MessageText numberOfLines={1}>{lastMessage}</MessageText>
      </Content>
    </Container>
  );
}

const Container = styled(TouchableOpacity)`
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
  font-size: ${({ theme }) => theme.typography.fontSize.m}; // 16px
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold}; // 600
  color: ${({ theme }) => theme.colors.primary.black};
`;

const CountText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.tertiary}; /* Using tertiary for light gray */
`;

const MessageText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;
