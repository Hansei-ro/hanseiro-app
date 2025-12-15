import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface StackHeaderProps {
  title: string;
  titleAlign?: 'left' | 'center';
  onBack?: () => void;
  right?: React.ReactNode;
  style?: ViewStyle;
}

export function StackHeader({
  title,
  titleAlign = 'left',
  onBack,
  right,
  style,
}: StackHeaderProps) {
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

      <RightContainer>{right}</RightContainer>
    </Container>
  );
}

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding-horizontal: 4px;
  background-color: ${({ theme }) => theme.colors.primary.white};
`;

const LeftContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  z-index: 1;
`;

const BackButton = styled(TouchableOpacity)`
  padding: 8px;
  margin-right: 4px;
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

const RightContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-right: 12px;
  z-index: 1;
`;

const Title = styled(Text)<{ align: 'left' | 'center' }>`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.black};
`;
