import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Send } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { getFontFamily } from '@/shared/utils/typography';

interface ChatInputProps {
  onSend: (text: string) => void;
}

// 채팅방 입력 영역 컴포넌트
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
    <InputContainer>
      {/* 입력 창 */}
      <StyledInput
        value={text}
        onChangeText={setText}
        placeholder="메세지를 입력해주세요."
        placeholderTextColor={theme.colors.text.secondary}
        multiline
        numberOfLines={1}
        textAlignVertical="center"
      />
      {/* 전송 버튼 */}
      <Pressable onPress={handleSend} disabled={!text.trim()}>
        <Send
          color={text.trim() ? theme.colors.primary.black : theme.colors.text.secondary}
          size={24}
        />
      </Pressable>
    </InputContainer>
  );
}

const InputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.chat};
  border-radius: 100px;
  margin: 16px;
  padding: 10px 18px;
  min-height: 44px;
`;

const StyledInput = styled(TextInput)`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.fontSize.m};
  color: ${({ theme }) => theme.colors.primary.black};
  font-family: ${getFontFamily('medium')};
  max-height: 100px;
  line-height: 22px;
  padding: 0;
`;
