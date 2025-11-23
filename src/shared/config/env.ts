import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
});

/**
 * 환경 변수 검증 및 접근
 * 앱 실행 시점에 환경 변수가 올바른지 확인합니다.
 */
export const env = envSchema.parse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
});
