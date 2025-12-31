import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/shared/ui/Text';

export function MyPageMenuList() {
  const theme = useTheme();

  const menuList = [
    { title: '지난 매칭 내역', onPress: () => router.push('/match/history') },
    { title: '설정', onPress: () => router.push('/list/settings') },
    { title: '회원탈퇴', onPress: () => {} },
    { title: '로그아웃', onPress: () => {}, hasArrow: false },
  ];

  return (
    <MenuContainer>
      {menuList.map((item, index) => (
        <MenuButton key={index} onPress={item.onPress}>
          <Text variant="m" weight="medium" color={theme.colors.primary.black}>
            {item.title}
          </Text>
          {(item.hasArrow ?? true) && (
            <ChevronRight size={18} color={theme.colors.semantic.iconMore} />
          )}
        </MenuButton>
      ))}
    </MenuContainer>
  );
}

const MenuContainer = styled(View)`
  padding: 0 26px;
`;

const MenuButton = styled(Pressable)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;
