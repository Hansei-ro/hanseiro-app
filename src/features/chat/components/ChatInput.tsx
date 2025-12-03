import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Send } from 'lucide-react-native';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface ChatInputProps {
  onSend: (text: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('');
  const theme = useTheme();

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <Container>
      <InputContainer>
        <StyledInput
          value={text}
          onChangeText={setText}
          placeholder="메세지를 입력해주세요."
          placeholderTextColor={theme.colors.text.secondary}
          multiline
        />
        <SendButton onPress={handleSend} disabled={!text.trim()}>
          <Send
            color={text.trim() ? theme.colors.primary.black : theme.colors.text.secondary}
            size={24}
          />
        </SendButton>
      </InputContainer>
    </Container>
  );
}

const Container = styled(View)`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const InputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.chat};
  border-radius: 24px;
  padding-horizontal: 16px;
  padding-vertical: 8px;
  min-height: 48px;
`;

const StyledInput = styled(TextInput)`
  flex: 1;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary.black};
  max-height: 100px;
  padding-top: 0;
  padding-bottom: 0;
`;

const SendButton = styled(TouchableOpacity)`
  margin-left: 8px;
  padding: 4px;
`;
