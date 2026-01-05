import styled from '@emotion/native';
import { View, TouchableOpacity } from 'react-native';

import { Theme } from '@/shared/theme';
import { Text } from '@/shared/ui/Text';

interface BusListTabBarProps {
  current: '금정역' | '산본역';
  onSelect: (station: '금정역' | '산본역') => void;
}

export const BusListTabBar = ({ current, onSelect }: BusListTabBarProps) => {
  return (
    <TabWrapper>
      <TabContainer>
        <TabButton active={current === '금정역'} onPress={() => onSelect('금정역')}>
          <TabText active={current === '금정역'} weight="semiBold">
            금정역
          </TabText>
        </TabButton>
        <TabButton active={current === '산본역'} onPress={() => onSelect('산본역')}>
          <TabText active={current === '산본역'} weight="semiBold">
            산본역
          </TabText>
        </TabButton>
      </TabContainer>
    </TabWrapper>
  );
};

const TabWrapper = styled(View)`
  padding-bottom: 38px;
`;

const TabContainer = styled(View)`
  flex-direction: row;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background.buttonSecondary};
  border-radius: 12px;
  padding: 3px;
`;

const TabButton = styled(TouchableOpacity)<{ active: boolean }>`
  flex: 1;
  padding-vertical: 10px;
  align-items: center;
  height: 40px;
  border-radius: 12px;
  background-color: ${({ active, theme }) => (active ? theme.colors.primary.white : 'transparent')};
`;

const TabText = styled(Text)<{ active: boolean }>`
  font-size: ${({ theme }: { theme: Theme }) => theme.typography.fontSize.s};
  color: ${({ active, theme }: { active: boolean; theme: Theme }) =>
    active ? theme.colors.primary.black : theme.colors.primary.gray500};
`;
