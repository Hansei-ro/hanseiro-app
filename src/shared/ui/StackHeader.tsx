import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

import { Text } from '@/shared/ui/Text';

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
        {titleAlign === 'left' && (
          <Text variant="titleM" weight="semiBold" color={theme.colors.primary.black}>
            {title}
          </Text>
        )}
      </LeftContainer>

      {titleAlign === 'center' && (
        <CenterContainer pointerEvents="none">
          <Text variant="titleM" weight="semiBold" color={theme.colors.primary.black}>
            {title}
          </Text>
        </CenterContainer>
      )}
    </Container>
  );
}

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
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
