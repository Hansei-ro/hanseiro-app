import styled from '@emotion/native';
import React from 'react';
import { Text, View } from 'react-native';

import { theme } from '../../../shared/theme';

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  senderName?: string; // Only for 'other'
  isDateSeparator?: boolean; // Special type for date separators
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  if (message.isDateSeparator) {
    return (
      <DateSeparatorContainer>
        <DateText>{message.text}</DateText>
      </DateSeparatorContainer>
    );
  }

  const isMe = message.sender === 'me';
  const timeString = new Date(message.timestamp).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  if (isMe) {
    return (
      <MessageContainer isMe>
        <ContentContainer isMe>
          <BubbleRow isMe>
            <TimeText>{timeString}</TimeText>
            <Bubble isMe>
              <MessageText isMe>{message.text}</MessageText>
            </Bubble>
          </BubbleRow>
        </ContentContainer>
      </MessageContainer>
    );
  }

  return (
    <MessageContainer isMe={false}>
      <ProfilePlaceholder />
      <ContentContainer isMe={false}>
        <SenderName>{message.senderName}</SenderName>
        <BubbleRow isMe={false}>
          <Bubble isMe={false}>
            <MessageText isMe={false}>{message.text}</MessageText>
          </Bubble>
          <TimeText>{timeString}</TimeText>
        </BubbleRow>
      </ContentContainer>
    </MessageContainer>
  );
}

const DateSeparatorContainer = styled(View)`
  align-items: center;
  margin-vertical: 16px;
`;

const DateText = styled(Text)`
  font-size: 12px;
  color: ${theme.colors.text.secondary};
`;

const MessageContainer = styled(View)<{ isMe: boolean }>`
  flex-direction: row;
  justify-content: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
  margin-bottom: 16px;
  padding-horizontal: 16px;
`;

const ProfilePlaceholder = styled(View)`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background-color: ${theme.colors.background.chat};
  margin-right: 8px;
`;

const ContentContainer = styled(View)<{ isMe: boolean }>`
  align-items: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
  max-width: 70%;
`;

const SenderName = styled(Text)`
  font-size: 13px;
  color: ${theme.colors.text.secondary};
  margin-bottom: 4px;
`;

const BubbleRow = styled(View)<{ isMe: boolean }>`
  flex-direction: row;
  align-items: flex-end;
`;

const Bubble = styled(View)<{ isMe: boolean }>`
  background-color: ${({ isMe }) =>
    isMe ? theme.colors.primary.main : theme.colors.background.chat};
  padding: 10px 14px;
  border-radius: 16px;
  ${({ isMe }) => (isMe ? 'border-top-right-radius: 4px;' : 'border-top-left-radius: 4px;')}
`;

const MessageText = styled(Text)<{ isMe: boolean }>`
  font-size: 14px;
  color: ${({ isMe }) => (isMe ? theme.colors.text.main : theme.colors.primary.black)};
  line-height: 20px;
`;

const TimeText = styled(Text)`
  font-size: 12px;
  color: ${theme.colors.text.secondary};
  margin-horizontal: 4px;
  margin-bottom: 2px;
`;
