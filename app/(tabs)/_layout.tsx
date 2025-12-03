import styled from '@emotion/native';
import { Tabs } from 'expo-router';
import { BusFront, Home, Library, MessageCircle, X } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MatchIcon from '@/shared/icons/match.svg';
import { theme } from '@/shared/theme';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary.main,
      tabBarInactiveTintColor: theme.colors.semantic.iconNav,
      tabBarStyle: {
        backgroundColor: theme.colors.primary.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.semantic.stroke,
        height: 60 + insets.bottom,
        paddingBottom: insets.bottom + 5,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500' as const,
      },
    }),
    [insets.bottom],
  );

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <Home color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="bus"
        options={{
          title: '버스',
          tabBarIcon: ({ color }) => <BusFront color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="match"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <MatchButton>
              {focused ? (
                <X color={theme.colors.text.main} size={25} />
              ) : (
                <MatchIcon width={25} height={25} />
              )}
            </MatchButton>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: '채팅',
          tabBarIcon: ({ color }) => <MessageCircle color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="profile"
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
  background-color: ${theme.colors.primary.main};
  justify-content: center;
  align-items: center;
  shadow-color: ${theme.colors.primary.main};
`;
