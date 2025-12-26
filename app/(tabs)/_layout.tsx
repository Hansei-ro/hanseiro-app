import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Tabs } from 'expo-router';
import { BusFront, Home, Library, MessageCircle, X } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MatchIcon from '@/shared/icons/match.svg';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary.main,
      tabBarInactiveTintColor: theme.colors.semantic.iconNav,
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: '#F8FAFB',
        height: 60 + insets.bottom,
        paddingBottom: insets.bottom + 5,
      },
      tabBarIconStyle: {
        marginBottom: 2,
      },
      tabBarLabelStyle: {
        fontFamily: 'Pretendard-Medium',
        fontSize: parseInt(theme.typography.fontSize.xs, 10),
      },
    }),
    [insets.bottom, theme],
  );

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <Home color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="bus/index"
        options={{
          title: '버스',
          tabBarIcon: ({ color }) => <BusFront color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="match/index"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <MatchButton>
              {focused ? (
                <X color={theme.colors.text.main} size={25} />
              ) : (
                <MatchIcon width={25} height={25} color={theme.colors.primary.white} />
              )}
            </MatchButton>
          ),
        }}
      />
      <Tabs.Screen
        name="chat/index"
        options={{
          title: '채팅',
          tabBarIcon: ({ color }) => <MessageCircle color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'MY',
          tabBarIcon: ({ color }) => <Library color={color} size={25} />,
        }}
      />
    </Tabs>
  );
}

const MatchButton = styled.View`
  position: absolute;
  top: 0px;
  width: 46px;
  height: 46px;
  border-radius: 23px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  justify-content: center;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.primary.main};
`;
