import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';

import { getFontFamily } from '../lib/typography';

interface StackHeaderProps {
  title: string;
  titleAlign?: 'left' | 'center';
  onBack?: () => void;
  style?: ViewStyle;
}

export function StackHeader({ title, titleAlign = 'left', onBack, style }: StackHeaderProps) {
  const theme = useTheme();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <Container style={style}>
      <LeftContainer>
        <BackButton onPress={handleBack}>
          <ChevronLeft color={theme.colors.primary.black} size={28} />
        </BackButton>
        {titleAlign === 'left' && <Title align="left">{title}</Title>}
      </LeftContainer>

      {titleAlign === 'center' && (
        <CenterContainer pointerEvents="none">
          <Title align="center">{title}</Title>
        </CenterContainer>
      )}
    </Container>
  );
}

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 20px;
  padding-vertical: 16px;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const LeftContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  z-index: 1;
`;

const BackButton = styled(Pressable)`
  margin-right: 8px;
`;

const CenterContainer = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 0;
`;

const Title = styled(Text)<{ align: 'left' | 'center' }>`
  font-family: ${getFontFamily('semiBold')};
  font-size: ${({ theme }) => theme.typography.fontSize.l};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.primary.black};
`;
