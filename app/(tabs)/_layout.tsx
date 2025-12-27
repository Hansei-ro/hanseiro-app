import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Tabs, useRouter } from 'expo-router';
import { BusFront, Home, Library, MessageCircle, X } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { TouchableOpacity, Image, Modal, View, Pressable, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Gemjung from '@/shared/icons/GeumgungIcon.png';
import MatchIcon from '@/shared/icons/match.svg';
import Sanbon from '@/shared/icons/SanbonIcon.png';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [isMatchingModalOpen, setIsMatchingModalOpen] = useState<boolean>(false);

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
    <>
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
            tabBarIcon: () => (
              <MatchButton isModalOpen={isMatchingModalOpen}>
                {isMatchingModalOpen ? (
                  <X color="#FFFFFF" size={24} strokeWidth={2} />
                ) : (
                  <MatchIcon width={25} height={25} color={theme.colors.primary.white} />
                )}
              </MatchButton>
            ),
            tabBarButton: (props: BottomTabBarButtonProps) => {
              const { ref, children, style, ...otherProps } = props;
              return (
                <Pressable
                  {...otherProps}
                  style={[style as ViewStyle, { justifyContent: 'center', alignItems: 'center' }]}
                  onPress={() => setIsMatchingModalOpen(!isMatchingModalOpen)}
                >
                  {children}
                </Pressable>
              );
            },
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

      <Modal
        transparent
        visible={isMatchingModalOpen}
        animationType="fade"
        onRequestClose={() => setIsMatchingModalOpen(false)}
      >
        <ModalOverlay onPress={() => setIsMatchingModalOpen(false)}>
          <ModalContent>
            <TouchableOpacity
              onPress={() => {
                setIsMatchingModalOpen(false);
                router.push('/match/waiting');
              }}
            >
              <StationImage source={Gemjung} resizeMode="contain" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsMatchingModalOpen(false);
                router.push('/match/waiting');
              }}
            >
              <StationImage source={Sanbon} resizeMode="contain" />
            </TouchableOpacity>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}

const MatchButton = styled(View)<{ isModalOpen: boolean }>`
  position: absolute;
  top: -6px;
  width: 46px;
  height: 46px;
  border-radius: 23px;
  background-color: ${({ theme, isModalOpen }) =>
    isModalOpen ? '#8E94A1' : theme.colors.primary.main};
  justify-content: center;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.primary.main};
`;

const ModalOverlay = styled(Pressable)`
  flex: 1;
  background-color: rgba(33, 37, 40, 0.15);
  justify-content: flex-end;
  padding-bottom: 120px;
`;

const ModalContent = styled(View)`
  flex-direction: row;
  justify-content: center;
  gap: 18px;
`;

const StationImage = styled(Image)`
  width: 108px;
  height: 137px;
`;
