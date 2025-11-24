import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from '../src/shared/theme';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
