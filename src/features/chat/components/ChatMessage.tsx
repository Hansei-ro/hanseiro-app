import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { format } from 'date-fns';
import { Image, View } from 'react-native';

import { Message } from '../types/message.ui';

import DEFAULT_PROFILE_IMAGE from '@/shared/images/img-profile-default.png';
import { Text } from '@/shared/ui/Text';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const theme = useTheme();

  if (message.isDateSeparator) {
    return (
      <DateSeparatorContainer>
        <Text variant="xs" weight="regular" color={theme.colors.text.secondary}>
          {message.text}
        </Text>
      </DateSeparatorContainer>
    );
  }

  const isMe = message.sender === 'me';
  const timeString = format(new Date(message.timestamp), 'HH:mm');

  // 내 말풍선
  if (isMe) {
    return (
      <MessageContainer isMe>
        <ContentContainer isMe>
          <MessageWrapper isMe>
            <Text variant="xs" weight="regular" color={theme.colors.text.tertiary}>
              {timeString}
            </Text>
            <MessageContent isMe>
              <Text variant="s" weight="medium" color={theme.colors.text.main} lineHeight={20}>
                {message.text}
              </Text>
            </MessageContent>
          </MessageWrapper>
        </ContentContainer>
      </MessageContainer>
    );
  }

  // 상대방 말풍선
  return (
    <MessageContainer isMe={false}>
      <ProfilePlaceholder source={DEFAULT_PROFILE_IMAGE} />
      <ContentContainer isMe={false}>
        <Text weight="regular" color={theme.colors.text.secondary} style={{ fontSize: 13 }}>
          {message.senderName}
        </Text>
        <MessageWrapper isMe={false}>
          <MessageContent isMe={false}>
            <Text variant="s" weight="medium" color={theme.colors.primary.black} lineHeight={20}>
              {message.text}
            </Text>
          </MessageContent>
          <Text variant="xs" weight="regular" color={theme.colors.text.tertiary}>
            {timeString}
          </Text>
        </MessageWrapper>
      </ContentContainer>
    </MessageContainer>
  );
}

const DateSeparatorContainer = styled(View)`
  align-items: center;
  margin-vertical: 16px;
`;

const MessageContainer = styled(View)<{ isMe: boolean }>`
  flex-direction: row;
  justify-content: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
  gap: 6px;
`;

const ContentContainer = styled(View)<{ isMe: boolean }>`
  align-items: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
  max-width: 70%;
  gap: 4px;
`;

const MessageWrapper = styled(View)<{ isMe: boolean }>`
  flex-direction: row;
  align-items: flex-end;
  gap: 4px;
`;

const ProfilePlaceholder = styled(Image)`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background.chat};
`;

const MessageContent = styled(View)<{ isMe: boolean }>`
  background-color: ${({ isMe, theme }) =>
    isMe ? theme.colors.primary.main : theme.colors.background.chat};
  padding: 10px 12px;
  border-radius: 12px;
  ${({ isMe }) => (isMe ? 'border-top-right-radius: 0px;' : 'border-top-left-radius: 0px;')}
`;
