import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { ChevronLeft } from 'lucide-react-native';
import React, { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { getFontFamily } from '@/shared/utils/typography';

interface ChatHeaderProps {
  title: string;
  onBackPress: () => void;
  rightElement?: ReactNode;
}

export function ChatHeader({ title, onBackPress, rightElement }: ChatHeaderProps) {
  const theme = useTheme();
  return (
    <Container>
      <BackButton onPress={onBackPress}>
        <ChevronLeft color={theme.colors.primary.black} size={24} />
      </BackButton>
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
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const BackButton = styled(Pressable)`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled(Text)`
  font-family: ${getFontFamily('semiBold')};
  font-size: ${({ theme }) => theme.typography.fontSize.l};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.primary.black};
  text-align: center;
  flex: 1;
`;

const RightContainer = styled(View)`
  width: 40px;
  align-items: flex-end;
`;
