import styled from '@emotion/native';
import { ChevronLeft } from 'lucide-react-native';
import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { theme } from '../../../shared/theme';

interface ChatHeaderProps {
  title: string;
  onBackPress: () => void;
  rightElement?: ReactNode;
}

export function ChatHeader({ title, onBackPress, rightElement }: ChatHeaderProps) {
  return (
    <Container>
      <LeftButton onPress={onBackPress}>
        <ChevronLeft color={theme.colors.text.primary} size={24} />
      </LeftButton>
      <Title>{title}</Title>
      <RightContainer>{rightElement}</RightContainer>
    </Container>
  );
}

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding-horizontal: 16px;
  background-color: ${theme.colors.background.screen};
`;

const LeftButton = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  text-align: center;
  flex: 1;
`;

const RightContainer = styled(View)`
  width: 40px;
  align-items: flex-end;
`;
