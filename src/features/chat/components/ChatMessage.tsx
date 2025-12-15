import styled from '@emotion/native';
import { Text, View } from 'react-native';

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
  margin-vertical: 16;
`;

const MessageContainer = styled(View)<{ isMe: boolean }>`
  flex-direction: row;
  justify-content: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
  margin-bottom: 16;
  padding-horizontal: 16;
`;

const ContentContainer = styled(View)<{ isMe: boolean }>`
  align-items: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
  max-width: 70%;
`;

const BubbleRow = styled(View)<{ isMe: boolean }>`
  flex-direction: row;
  align-items: flex-end;
`;

const TimeText = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-horizontal: 4;
  margin-bottom: 2;
`;

const DateText = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ProfilePlaceholder = styled(View)`
  width: 36;
  height: 36;
  border-radius: ${({ theme }) => theme.radius[12]};
  background-color: ${({ theme }) => theme.colors.background.chat};
  margin-right: 8;
`;

const SenderName = styled(Text)`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 4px;
`;

const Bubble = styled(View)<{ isMe: boolean }>`
  background-color: ${({ isMe, theme }) =>
    isMe ? theme.colors.primary.main : theme.colors.background.chat};
  padding: 10 12;
  border-radius: ${({ theme }) => theme.radius[12]};
  ${({ isMe }) => (isMe ? 'border-top-right-radius: 0px;' : 'border-top-left-radius: 0px;')}
`;

const MessageText = styled(Text)<{ isMe: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.s};
  color: ${({ isMe, theme }) => (isMe ? theme.colors.text.main : theme.colors.primary.black)};
  line-height: 20;
`;
