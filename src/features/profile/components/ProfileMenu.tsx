import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { ChevronRight } from 'lucide-react-native';
import { Pressable } from 'react-native';

import { Text } from '@/shared/ui/Text';

interface ProfileMenuProps {
  title: string;
  onPress: () => void;
  hasArrow?: boolean;
}

export function ProfileMenu({ title, onPress, hasArrow = true }: ProfileMenuProps) {
  const theme = useTheme();

  return (
    <MenuButton onPress={onPress}>
      <Text variant="m" weight="medium" color={theme.colors.primary.black}>
        {title}
      </Text>
      {hasArrow && <ChevronRight size={18} color={theme.colors.semantic.iconMore} />}
    </MenuButton>
  );
}

const MenuButton = styled(Pressable)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 26px;
`;
