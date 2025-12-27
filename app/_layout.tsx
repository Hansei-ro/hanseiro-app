import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from '../src/shared/theme';

const queryClient = new QueryClient();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // React Query DevTools (개발 환경에서만 활성화됨)
  useReactQueryDevTools(queryClient);

  const [fontsLoaded] = useFonts({
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }}>
            {/* 루트 인덱스 (홈으로 리다이렉트) */}
            <Stack.Screen name="index" />

            {/* 탭 네비게이터 */}
            <Stack.Screen name="(tabs)" />

            {/* 탭 외부 스택 스크린 (탭바 숨김) */}
            <Stack.Screen name="chat/[roomId]" />
            <Stack.Screen name="match/waiting" />
            <Stack.Screen name="match/history" />

            {/* 404 페이지 */}
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
